import UserRepository from "../persistence/repository/user.repository.js";
import UserDao from "../persistence/dao/mongodb/user.dao.js";

const dao = new UserDao();
const userRepository = new UserRepository(dao);


export const createUserService = async(obj) => {
    const newUser = await userRepository.createUser(obj);
    return newUser;
}

export const loginUserService = async(obj) => {
    const newLogin = await userRepository.loginUser(obj);
    return newLogin;
}

export const getByIdService = async(id) => {
    const getNew = await userRepository.getById(id);
    return getNew;
}

export const getByEmailService = async(email) => {
    const getNewEmail = await userRepository.getByEmail(email);
    return getNewEmail;
}

export const getAllUsersService = async() => {
    const getAll = await userRepository.getAllUsers();
    return getAll;
}

