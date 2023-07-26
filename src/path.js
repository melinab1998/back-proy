import {dirname} from 'path'
import { fileURLToPath } from 'url'
export const __dirname = dirname(fileURLToPath(import.meta.url))

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

export const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: 'Unauthorized'});
  }
  if (req.user.role === requiredRole) {
    return next();
  } else {
    return res.status(403).json({ message: 'No tienes permiso para realizar esta acción'});
  }
};