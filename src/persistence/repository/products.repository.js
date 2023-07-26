export default class ProductsRepository{

    constructor(dao){
        this.dao = dao;
    }

    async getAllProducts(page , limit, category , availability){
        let result =  await this.dao.getAllProducts(page , limit, category , availability);
        return result;
    }

    async getProductsById(id){
        let result = await this.dao.getProductsById(id);
        return result;
    }

    async addProducts(obj){
        let result = await this.dao.addProducts(obj);
        return result;
    }

    async updateProducts(id, obj){
        let result = await this.dao.updateProducts(id, obj);
        return result;
    }

    async deleteProducts(id){
        let result = await this.dao.deleteProducts(id);
        return result;
    }

    async getProductBy(key, value){
        let result = await this.dao.getProductBy(key, value);
        return result;
    }

    async productSort(){
        let result = await this.dao.productSort();
        return result;
    }

    async productSort1(){
        let result = await this.dao.productSort1();
        return result;
    }

}