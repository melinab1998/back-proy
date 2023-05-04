import express from "express";
import productR from "./router/product.routes.js";
import CartR from "./router/carts.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.use("/api/products", productR)
app.use("/api/cart", CartR)

app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
});