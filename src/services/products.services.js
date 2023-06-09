import ProductsDaoMongoDB from "../dao/mongodb/products.dao.js";

const prodDao = new ProductsDaoMongoDB(); 

/* Para usar FileSystem
import ProductManager from "../dao/filesystem/products.dao.js";
import { __dirname } from "../path.js";
const prodDao = new ProductManager(__dirname+'/daos/filesystem/products.json');  */

export const getAllServices = async (page , limit, category , availability) => {
  try {
      const docs = await prodDao.getAllProducts(page , limit, category, availability)
      return docs;
  } catch (error) {
      console.error(error);
  }
};

export const getByIdService = async (id) => {
    try {
      const doc = await prodDao.getProductsById(id);
      if(!doc) throw new Error('Producto no encontrado')
      else return doc;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createService = async (obj) => {
    try {
      const newProd = await prodDao.addProducts(obj);
      if(!newProd) throw new Error('Error de Validación')
      else return newProd;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateService = async (id, obj) => {
    try {
      const doc = await prodDao.getProductsById(id);
      if(!doc){
         throw new Error('Producto no encontrado')
      } else {
        const prodUpd = await prodDao.updateProducts(id, obj)
        return prodUpd;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteService = async (id) => {
    try {
       const prodDel = await prodDao.deleteProducts(id);
       return prodDel;
    } catch (error) {
      console.log(error);
    }
  };

  export const getProductByService = async (key, value) => {
    try {
       const prod = await prodDao.getProductBy(key, value);
       return prod;
    } catch (error) {
      console.log(error);
    }
  };

  export const productSortService = async () => {
    try {
      const aggregation = await prodDao.productSort();
      return aggregation
    } catch (error) {
      console.log(error);
    }
  };

  export const productSort1Service = async () => {
    try {
      const aggregation = await prodDao.productSort1();
      return aggregation
    } catch (error) {
      console.log(error);
    }
  };
 
