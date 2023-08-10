import { ProductsModel } from "./models/products.model.js";
import {logger} from '../../../utils/logger.js'

export default class ProductsDaoMongoDB {

//Obtener todos los productos

    async getAllProducts(page = 1, limit = 10, category, availability) {
      
      try {
        const query = {};
    
        if (category) {
          query.category = category;
        }
    
        if (availability) {
          query.availability = availability;
        }
    
        const response = await ProductsModel.paginate(query, { page, limit });
        return response;
      } catch (error){
        logger.error(error.message)
        throw new Error(error.message)
      } 
    }
  
  //Obtener producto por su id

    async getProductsById(id) {
      try {
        const response = await ProductsModel.findById(id);
        return response;
      } catch (error) {
        logger.error(error.message)
        throw new Error(error.message)
      }
    }
  
 //Añadir productos

    async addProducts(obj) {
      try {
        const response = await ProductsModel.create(obj);
        return response;
      } catch (error) {
        logger.error(error.message)
        throw new Error(error.message)
      }
    }

  //Actualizar productos  
  
    async updateProducts(id, obj) {
      try {
        await ProductsModel.updateOne({_id: id}, obj);
        return obj;
      } catch (error) {
        logger.error(error.message)
        throw new Error(error.message)
      }
    }

  //Eliminar productos por su id

    async deleteProducts(id) {
      try {
        const response = await ProductsModel.findByIdAndDelete(id);
        return response;
      } catch (error) {
        logger.error(error.message)
        throw new Error(error.message)
      }
    }

  //Obtener productos por clave-valor  

    async getProductBy(key, value){
      try {
          const query = {};
          query[key] = value;
          const response = await ProductsModel.find(query)
          return response
      } catch (error) {
        logger.error(error.message)
        throw new Error(error.message)
      };
  };


//Obtener productos en orden ascendente según su precio

  async productSort(){ 
    
    try {
      const response = await ProductsModel.aggregate([  
        {
          $sort: {
            price: 1
          }
        }
      ])
      return response;
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message)
    }
  }


//Obtener productos en orden descendente según su precio

  async productSort1(){ 
    
    try {
      const response = await ProductsModel.aggregate([  
        {
          $sort: {
            price: -1
          }
        }
      ])
      return response;
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message)
    }
  }






}


