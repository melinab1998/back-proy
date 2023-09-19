import UserRepository from "../persistence/repository/user.repository.js";
import UserDao from "../persistence/dao/mongodb/user.dao.js";
import {logger} from '../utils/logger.js'

const dao = new UserDao();
const userRepository = new UserRepository(dao);


export const createUserService = async (obj) => {
    try {
      const newUser = await userRepository.createUser(obj);
      return newUser;
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message);
    }
  };
  
  export const loginUserService = async (obj) => {
    try {
      const newLogin = await userRepository.loginUser(obj);
      return newLogin;
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message);
    }
  };
  
  export const getByIdService = async (id) => {
    try {
      const getNew = await userRepository.getById(id);
      return getNew;
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message);
    }
  };
  
  export const getByEmailService = async (email) => {
    try {
      const getNewEmail = await userRepository.getByEmail(email);
      return getNewEmail;
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message);
    }
  };
  
  export const getAllUsersService = async () => {
    try {
      const getAll = await userRepository.getAllUsers();
      return getAll;
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message);
    }
  };

  export const deleteUsersService = async () => {
    try {
      const deleteUs = await userRepository.deleteUsers();
      return deleteUs;
    } catch (error) {
      logger.error(error.message)
      throw new Error(error.message);
    }
  };