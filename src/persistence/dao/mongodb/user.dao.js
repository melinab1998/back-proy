import { userModel } from "./models/user.model.js"; 
import { createHash, isValidPassword } from '../../../path.js';
import { cartModel } from "./models/carts.model.js";
import {logger} from '../../../utils/logger.js'
import bcrypt from 'bcrypt';


export default class UserDao {

  async createUser(user) {
    try {
      const { email, password } = user;
      const existUser = await userModel.findOne({email});
      if(!existUser){
        if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
          const newCart = await cartModel.create({ products: [] });
          const newUser = await userModel.create({...user, password: createHash(password), role: 'admin', cart: newCart._id})
          return newUser;
        } else {
          const newCart = await cartModel.create({ products: [] });
          const newUser = await userModel.create({...user, password: createHash(password), cart: newCart._id})
          return newUser;
        }
      } else {
        return false;
      }
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message)
    }
  }

  async loginUser(user){
    try {
      const { email, password } = user;
      const userExist = await userModel.findOne({email}); 
      if(userExist){
        const passValid = isValidPassword(password, userExist);
        if(!passValid) return false
        else return userExist;
      } return false
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message)
    }
  } 

  async getById(id){
    try {
      const userExist = await userModel.findById(id)
      // console.log(userExist);
      if(userExist){
       return userExist
      } return false
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message)
    }
  }

  async getByEmail(email){
    try {
      const userExist = await userModel.findOne({email}); 
      console.log(userExist);
      if(userExist){
       return userExist
      } return false
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message)
    }
  }

  async getAllUsers() {
    try {
        const users = await userModel.find().populate('cart')
        return users;
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message)
    }
}

async updateUserPasswordAndEncrypt(email, newPassword) {
  
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    const passwordsMatch = await bcrypt.compare(newPassword, user.password);
    if (passwordsMatch) {
      throw new Error('La nueva contraseña no puede ser igual a la contraseña anterior.');
    }

    user.password = createHash(newPassword);
    await user.save();
    logger.info(`Contraseña actualizada con éxito para el usuario: ${email}`);

  } catch (error) {
    throw error;
  }
}
}

