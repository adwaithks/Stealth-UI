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

	if (!res.ok) {
		throw res.statusText;
	}

	const data = await res.json();
	return ticketsSerializer(data.message);
};

export const updateTicketStatusApi = async (
	token: string,
	ticketId: number,
	chatbotId: number,
	chatbotHashId: string,
	newStatus: string,
	email: string,
	enquiry: string
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
			email: email,
			enquiry: enquiry,
		}),
	});

	if (!res.ok) {
		throw res.statusText;
	}

	const data = await res.json();
	console.log("data: ", data);
	return ticketSerializer(data.message);
};
