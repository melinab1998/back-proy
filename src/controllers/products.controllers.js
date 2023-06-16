import {
    getAllServices,
    getByIdService,
    createService,
    updateService,
    deleteService,
    getProductByService, 
    productSortService,
    productSort1Service
  } from "../services/products.services.js";

  
  export const getAllController = async (req, res, next) => {
    try {
      const { page , limit, category , availability  } = req.query
     const docs = await getAllServices(page , limit, category, availability);
     
     const status = "succes"
     const payload = docs.docs
     const totalPages = docs.totalPages
     const prevPage = docs.prevPage
     const nextPage = docs.nextPage
     const currentpage = docs.page
     const hasPrevPage = docs.hasPrevPage
     const hasNextPage = docs.hasNextPage
     const prevLink = hasPrevPage ? `http://localhost:8080/products?page=${docs.hasPrevPage}` : null
     const nextLink = hasNextPage ? `http://localhost:8080/products?page=${docs.hasNextPage}` : null
     res.json({
      status,
      payload,
      totalPages,
      prevPage,
      nextPage,
      currentpage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
     })
    } catch (error) {
      next(error);
    }
  };
 
  export const getByIdController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const doc = await getByIdService(id);
      res.json(doc);
    } catch (error) {
      next(error);
    }
  };
  
  export const createController = async (req, res, next) => {
    try {
      const { title, description, code, price, status, stock, category, thumbnails } = req.body;
      const newDoc = await createService({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
      });
      res.json(newDoc);
    } catch (error) {
      next(error);
    }
  };
  
  export const updateController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, code, price, status, stock, category, thumbnails } = req.body;
      await getByIdService(id);
      const docUpd = await updateService(id, {
        title, description, code, price, status, stock, category, thumbnails
      });
      res.json(docUpd);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteController = async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteService(id);
      res.json({message: 'Producto Eliminado'})
    } catch (error) {
      next(error);
    }
};

export const getProductByController = async (req, res, next) => {
  try {
    const {key} = req.params;
    const {value} = req.params;
    const response = await getProductByService(key, value)
    res.json(response)
  } catch (error) {
    next(error);
  }
};

export const productSortController = async(req, res, next)=>{
  try {
    const response = await productSortService();
    res.json(response);
  } catch (error) {
    next(error)
  }
}

export const productSort1Controller = async(req, res, next)=>{
  try {
    const response = await productSort1Service();
    res.json(response);
  } catch (error) {
    next(error)
  }
}