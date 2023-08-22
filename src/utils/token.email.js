import jwt from 'jsonwebtoken';
import config from '../config.js';

export const generateResetToken = (email) => {
  const expirationTime = Math.floor(Date.now() / 1000) + 3600; 
  return jwt.sign({ email, exp: expirationTime }, config.JWT_SECRET);
};

export const verifyResetToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    return decoded.email;
  } catch (error) {
    throw new Error('Token inválido o expirado.');
  }
};