import mongoose from "mongoose";
import mPaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, require: true },
    stock: { type: Number, require: true },
    category: { type: String, required: true, index: true },
    thumbnails: { type: Array, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    isPremium: { type: Boolean, default: false }, 
  });

productsSchema.plugin(mPaginate);

export const ProductsModel = mongoose.model('products', productsSchema);