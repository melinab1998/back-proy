import express from "express";
import productR from "./router/product.routes.js";
import { __dirname } from "./path.js";
import { Server } from 'socket.io';
import CartR from "./router/carts.routes.js";
import handlebars from "express-handlebars";
import viewsRouter from "./router/views.routes.js"
import ProductManager from "./dao/filesystem/products.dao.js";
import './db/db.js'
import { errorHandler } from './middlewares/errorHandler.js';


const app = express();
const PORT = 8080;
const product = new ProductManager();


app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.use(express.static(__dirname + '/public'));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");

app.use("/api/products", productR)
app.use("/api/cart", CartR)
app.use("/", viewsRouter)

app.use(errorHandler);



const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
});


const socketServer = new Server(httpServer);

socketServer.on("connection", async(socket) => {
    console.log("Usuario Conectado", socket.id);
    socket.on('disconnect', ()=>{
        console.log("Usuario Desconectado");
    });

    const allProducts = await product.getProducts()

    socketServer.emit("productos", allProducts)

    //Agregar productos

    socket.on("newProduct", (obj) => {
        allProducts.push(obj);
        socketServer.emit("productos", allProducts);  
    });

    //Eliminar productos por su nombre

    socket.on("newProducts", (deleteProd) => {
        let filter = allProducts.filter(prod => prod.title != deleteProd)
        socketServer.emit("productos", filter);
    });
});

