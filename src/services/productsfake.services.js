import { ProductsModel } from "../persistence/dao/mongodb/models/products.model.js";
import { generateProduct } from "../utils/products.utils.js";

export const createProductsMock = async (cant = 100) => {
    const productsArray = []
    for (let i = 0; i < cant; i++) {
      const product = generateProduct();
      productsArray.push(product);
    }
    const products = await ProductsModel.create(productsArray)
    return products
  };
  
