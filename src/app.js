import express from "express";
import bodyParser from 'body-parser'
import './db/db.js'
import 'dotenv/config';
import config from "./config.js";
import handlebars from "express-handlebars";
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import { __dirname } from "./path.js";
/* import { Server } from 'socket.io'; */
import productR from "./router/product.routes.js";
import viewsRouter from "./router/views.routes.js"
import usersRouter from './router/user.routes.js'
import CartR from "./router/carts.routes.js";
import loggerRouter from './router/logger.routes.js'
import session from 'express-session';
import { errorHandler } from './middlewares/errorHandler.js';
import passport from 'passport';
import './passport/local.js'
import './passport/github.js'
/* import ProductManager from "./dao/filesystem/products.dao.js"; */
/* const product = new ProductManager(); */
import { Command } from 'commander';    
import {logger} from './utils/logger.js'

const app = express();

const command = new Command();
command
    .option('-p <port>', 'port server', 8080) 
command.parse();
 
const PORT = command.opts().p;   

/* const PORT = config.PORT || 8080;  */


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended : true}));


app.use(express.static(__dirname + '/public'));


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");


app.use(cookieParser());

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 300000
    },
    store: new MongoStore({
      mongoUrl: config.MONGO_ATLAS_URL,
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
app.use("/loggerTest", loggerRouter)
app.use(errorHandler);

app.listen(PORT, ()=>{
  logger.info(`Servidor Express Puerto ${PORT}`);
}); 
 

/* const socketServer = new Server(httpServer);  */

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