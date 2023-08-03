import { ticketModel } from "./models/ticket.model.js";

export default class TicketDao{

async createTicket(obj){
    try {
        const ticket = await ticketModel.create(obj);
        return ticket;
      } catch (error){
        throw new Error(error.message)
      }
}
}