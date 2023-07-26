
export default class TicketRepository{

    constructor(dao){
        this.dao = dao;
    }

   async createTicket(obj){
        let result = await this.dao.createTicket(obj);
        return result;
} 
}
