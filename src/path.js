import {dirname} from 'path'
import { fileURLToPath } from 'url'
export const __dirname = dirname(fileURLToPath(import.meta.url))
import { ProductsModel } from './persistence/dao/mongodb/models/products.model.js'

//bcrypt

import bcrypt from 'bcrypt'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)

//

export const isAuthenticated = (req, res, next) =>{

    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
    
};

//

export const roleMiddleware = (requiredRoles) => (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (requiredRoles.includes(req.user.role)) {
    return next();
  } else {
    return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
  }
};

//

export const checkOwnership = async (req, res, next) => {
  const productId = req.params.id; 
  const userId = req.user._id; 

  try {
    const product = await ProductsModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

  
    if (product.owner.toString() === userId.toString()) {
      req.product = product; 
      next();
    } else {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Ocurrió un error al verificar el propietario.' });
  }
};

//

export const checkOwnershipOrAdmin = async (req, res, next) => {
  const productId = req.params.id; 
  const userId = req.user._id; 

  try {
    const product = await ProductsModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

   
    if (product.owner.toString() === userId.toString() || req.user.role === 'admin') {
      req.product = product; 
      next();
    } else {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Ocurrió un error al verificar el propietario.' });
  }
};