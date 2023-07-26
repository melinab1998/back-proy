export default class CartRepository{

    constructor(dao){
        this.dao = dao;
    }

    async getCarts(){
        let result = await this.dao.getCarts();
        return result;
    }

    async getCartById(id){
        let result = await this.dao.getCartById(id);
        return result;
    }

    async addCart(){
        let result = await this.dao.addCart();
        return result;
    }

    async addProductToCart(cid, pid){
        let result = await this.dao.addProductToCart(cid, pid);
        return result;
    }

    async deleteProductFromCart(cid, pid){
        let result = await this.dao.deleteProductFromCart(cid, pid);
        return result;
    }

    async deleteAllProductsFromCart(cid){
        let result = await this.dao.deleteAllProductsFromCart(cid);
        return result;
    }

    async updateProductQty(cid, pid, quantity){
        let result = await this.dao.updateProductQty(cid, pid, quantity);
        return result;
    }

}