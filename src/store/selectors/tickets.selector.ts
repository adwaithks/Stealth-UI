import { IAppState } from "../store";

export const getTicketsApiStatusSelector = (state: IAppState) => {
	return state.tickets.getTicketsApiStatus;
};

export const ticketsSelector = (state: IAppState) => {
	return state.tickets.tickets;
};

export const updateTicketStatusApiStatusSelector = (state: IAppState) => {
	return state.tickets.updateTicketStatusApiStatus;
};

export const updateTicketNoteApiStatusSelector = (state: IAppState) => {
	return state.tickets.updateTicketNoteApiStatus;
};
