export interface ChatDTO {
	answer: string;
	question: string;
	timestamp: string;
	user_session_id: string;
	channel: string;
}

export interface Chat {
	answer: string;
	question: string;
	timestamp: Date;
	userSessionId: string;
	channel: string;
}
