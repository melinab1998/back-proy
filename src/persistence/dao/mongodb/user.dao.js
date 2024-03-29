import { userModel } from "./models/user.model.js"; 
import { createHash, isValidPassword } from '../../../path.js';
import { sendAccountDeletionEmail } from '../../../controllers/email.controller.js'
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

  async loginUser(user) {
    try {
      const { email, password } = user;
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        const passValid = isValidPassword(password, userExist);
        if (!passValid) return false;
        else {
          const currentDate = new Date();
          userExist.last_connection = currentDate;
          await userExist.save();
          return userExist;
        }
      }
      return false;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  async getById(id){
    try {
      const userExist = await userModel.findById(id)
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

async updateUser(uid, updateData){
  try {
      return await userModel.updateOne({ _id: uid }, { $set: updateData })
  } catch (error) {
      logger.error(error)
  }
}

 async deleteUsers() {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const deletedUsers = await userModel.find({
      last_connection: { $lt: twoDaysAgo },
    }).select('email');

    const result = await userModel.deleteMany({
      last_connection: { $lt: twoDaysAgo },
    });

    for (const deletedUser of deletedUsers) {
      await sendAccountDeletionEmail(deletedUser.email);
    }

    return result.deletedCount;
  } catch (error) {
    logger.error(error);
  }
}    

}

