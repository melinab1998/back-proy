import { ticketModel } from "./models/ticket.model.js";
import {logger} from '../../../utils/logger.js'

export default class TicketDao{

async createTicket(obj){
    try {
        const ticket = await ticketModel.create(obj);
        return ticket;
      } catch (error){
        logger.error(error.message)
        throw new Error(error.message)
      }
}
}