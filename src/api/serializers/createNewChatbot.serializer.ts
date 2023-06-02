import { Chatbot, ChatbotDTO } from "../../types/chatbot.type";
import { formatDateTime } from "../../utils/formatDate";

export const createNewChatbotSerializer = (chatbot: ChatbotDTO): Chatbot => {
	let domains = chatbot.domains ? chatbot.domains.split(",") : [];
	if (domains.length === 1 && domains[0].length === 0) {
		domains = [];
	}
	return {
		chatbotId: chatbot.chatbot_id,
		chatbotName: chatbot.chatbot_name,
		creationDate: formatDateTime(chatbot.creation_date),
		lastUpdated: formatDateTime(chatbot.last_updated),
		knowledgeBase: chatbot.knowledge_base,
		domains: domains || [],
		status: chatbot.status,
	};
};
