import ProductsRepository from "../persistence/repository/products.repository.js";
import ProductsDaoMongoDB from "../persistence/dao/mongodb/products.dao.js"

const dao = new ProductsDaoMongoDB()
const productsRepository = new ProductsRepository(dao);

export const getAllServices = async (page, limit, category, availability) => {
  try {
    const getAll = await productsRepository.getAllProducts(page, limit, category, availability);
    return getAll;
  } catch (error) {
    throw new Error(error.message);
  } 
};

export const getByIdService = async (id) => {
  try {
    const getId = await productsRepository.getProductsById(id);
    return getId;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Repite el bloque try-catch para los demás servicios...

export const createService = async (obj) => {
  try {
    const newProd = await productsRepository.addProducts(obj);
    return newProd;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateService = async (id, obj) => {
  try {
    const newProd = await productsRepository.updateProducts(id, obj);
    return newProd;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteService = async (id) => {
  try {
    const delProd = await productsRepository.deleteProducts(id);
    return delProd;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductByService = async (key, value) => {
  try {
    const getBy = await productsRepository.getProductBy(key, value);
    return getBy;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const productSortService = async () => {
  try {
    const prodSort = await productsRepository.productSort();
    return prodSort;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const productSort1Service = async () => {
  try {
    const prodSort1 = await productsRepository.productSort1();
    return prodSort1;
  } catch (error) {
    throw new Error(error.message);
  }
};