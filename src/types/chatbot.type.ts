export interface Chatbot {
	chatbotId: number;
	chatbotName: string;
	knowledgeBase: string;
	creationDate: string;
	lastUpdated: string;
	domains: string[];
	status: string;
	position?: string;
	chatbotHashId?: string;
}

export interface ChatbotDTO {
	chatbot_id: number;
	chatbot_name: string;
	knowledge_base: string;
	creation_date: string;
	last_updated: string;
	domains: string;
	status: string;
	position?: string;
	chatbot_hash_id?: string;
}
