export interface ChatDTO {
	answer: string;
	question: string;
	timestamp: string;
	user_session_id: string;
	info: string;
}

export interface Chat {
	answer: string;
	question: string;
	timestamp: Date;
	userSessionId: string;
	info: { [key: string]: string };
}
