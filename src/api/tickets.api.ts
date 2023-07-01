import { ITicket, ITicketDTO } from "../types/ticket.type";
import { BASE_URL } from "./baseURL";

const ticketsSerializer = (tickets: ITicketDTO[]): ITicket[] => {
	return tickets.map((t) => {
		const temp = {
			ticketId: t.ticket_id,
			chatbotId: t.chatbot_id,
			chatbotHashId: t.chatbot_hash_id,
			email: t.email,
			enquiry: t.enquiry,
			status: t.status,
			note: t?.note,
			creationDate: t?.creation_date,
		};
		return temp;
	});
};

const ticketSerializer = (t: ITicketDTO): ITicket => {
	const temp = {
		ticketId: t.ticket_id,
		chatbotId: t.chatbot_id,
		chatbotHashId: t.chatbot_hash_id,
		email: t.email,
		enquiry: t.enquiry,
		status: t.status,
		note: t?.note,
		creationDate: t?.creation_date,
	};
	return temp;
};

export const getTicketsApi = async (token: string) => {
	const res = await fetch(BASE_URL + "/api/v1/tickets", {
		method: "GET",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return ticketsSerializer(data.message);
};

export const updateTicketStatusApi = async (
	token: string,
	ticketId: number,
	chatbotId: number,
	chatbotHashId: string,
	newStatus: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/ticket/status/update", {
		method: "POST",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			chatbot_hash: chatbotHashId,
			ticket_id: ticketId,
			status: newStatus,
		}),
	});

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return ticketSerializer(data.message);
};

export const updateTicketNoteApi = async (
	token: string,
	ticketId: number,
	chatbotId: number,
	chatbotHashId: string,
	note: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/ticket/note/update", {
		method: "POST",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			chatbot_hash: chatbotHashId,
			ticket_id: ticketId,
			note,
		}),
	});

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return ticketSerializer(data.message);
};
