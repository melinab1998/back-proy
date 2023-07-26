import TicketRepository from "../persistence/repository/ticket.repository.js";
import TicketDao from "../persistence/dao/mongodb/ticket.dao.js";

const dao = new TicketDao()
const ticketRepository = new TicketRepository(dao)

export const createTicketService = async (obj, userEmail) => {
    const newTicket = await ticketRepository.createTicket(obj, userEmail);
    return newTicket;
}