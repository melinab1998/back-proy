import { ProductsModel } from "./models/products.model.js";

export default class ProductsDaoMongoDB {

    async getProducts() {
      try {
       const response = await ProductsModel.find({});
       return response;
      } catch (error) {
        console.log(error);
      }
    }
  
    async getProductsById(id) {
      try {
        const response = await ProductsModel.findById(id);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  
    async addProducts(obj) {
      try {
        const response = await ProductsModel.create(obj);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  
    async updateProducts(id, obj) {
      try {
        await ProductsModel.updateOne({_id: id}, obj);
        return obj;
      } catch (error) {
        console.log(error);
      }
    }
  
    async deleteProducts(id) {
      try {
        const response = await ProductsModel.findByIdAndDelete(id);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
}