import express from "express";
import bodyParser from 'body-parser'
import './db/db.js'
import handlebars from "express-handlebars";
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import { __dirname } from "./path.js";
import { Server } from 'socket.io';
import productR from "./router/product.routes.js";
import viewsRouter from "./router/views.routes.js"
import usersRouter from './router/user.routes.js'
import CartR from "./router/carts.routes.js";
import session from 'express-session';
import { errorHandler } from './middlewares/errorHandler.js';
import passport from 'passport';
import './passport/local.js'
import './passport/github.js'
/* import ProductManager from "./dao/filesystem/products.dao.js"; */

const app = express();
const PORT = 8080;
/* const product = new ProductManager(); */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.use(errorHandler);
app.use(express.static(__dirname + '/public'));


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");


app.use(cookieParser());

app.use(
  session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000
    },
    store: new MongoStore({
      mongoUrl: 'mongodb+srv://admin:ylUI7FZmXovEDizv@cluster0.bocmmvr.mongodb.net/ecommerce',
      ttl: 60,
    }),
  })
)

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productR)
app.use("/api/cart", CartR)
app.use('/users', usersRouter)
app.use("/views", viewsRouter)


const httpServer = app.listen(PORT, ()=>{
  console.log(`Servidor Express Puerto ${PORT}`);
});


const socketServer = new Server(httpServer); 

/* socketServer.on("connection", async(socket) => {
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

 */