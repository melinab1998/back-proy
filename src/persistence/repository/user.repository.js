
export default class UserRepository{

    constructor(dao){
        this.dao = dao;
    }

    async createUser(user){
        let result = await this.dao.createUser(user)
        return result;
    }

    async loginUser(user){
        let result = await this.dao.loginUser(user)
        return result;
    }

    async getById(id){
        let result = await this.dao.getById(id)
        return result;
    }

    async getByEmail(email){
        let result = await this.dao.getByEmail(email)
        return result;
    }

    async getAllUsers(){
        let result = await this.dao.getAllUsers()
        return result;
    } 
}