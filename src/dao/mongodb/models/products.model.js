import mongoose from "mongoose";


const productsSchema = new mongoose.Schema({
    title:{type: String, required: true},
    description:{type: String, required: true},
    code:{type: String, required: true},
    price:{type: Number, required: true},
    status:{type: Boolean, require: true},
    stock:{type: Number, require: true},
    category:{type: String, required: true},
    thumbnails:{type: Array, required: true}   
});

export const ProductsModel = mongoose.model('products', productsSchema);