export interface ITicket {
	chatbotId: number;
	ticketId: number;
	chatbotHashId: string;
	email: string;
	enquiry: string;
	status: string;
	creationDate?: string;
	note?: string;
}

export interface ITicketDTO {
	chatbot_id: number;
	ticket_id: number;
	chatbot_hash_id: string;
	email: string;
	enquiry: string;
	status: string;
	creation_date?: string;
	note?: string;
}
