import ProductsRepository from "../persistence/repository/products.repository.js";
import ProductsDaoMongoDB from "../persistence/dao/mongodb/products.dao.js"

const dao = new ProductsDaoMongoDB()
const productsRepository = new ProductsRepository(dao);

export const getAllServices = async(page , limit, category , availability) => {
  const getAll = await productsRepository.getAllProducts(page , limit, category , availability);
  return getAll;
}

export const getByIdService = async(id) => {
  const getId = await productsRepository.getProductsById(id);
  return getId;
}

export const createService = async(obj) => {
  const newProd = await productsRepository.addProducts(obj);
  return newProd;
}

export const updateService = async(id, obj) => {
  const newProd = await productsRepository.updateProducts(id, obj);
  return newProd;
}

export const deleteService = async(id) => {
  const delProd = await productsRepository.deleteProducts(id);
  return delProd;
}

export const getProductByService = async(key, value) => {
  const getBy = await productsRepository.getProductBy(key, value);
  return getBy;
}

export const productSortService = async() => {
  const prodSort = await productsRepository.productSort();
  return prodSort;
}

export const productSort1Service = async() => {
  const prodSort1 = await productsRepository.productSort1();
  return prodSort1;
}
