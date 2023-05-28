import { Chatbot, ChatbotDTO } from "../../types/chatbot.type";
import { formatDateTime } from "../../utils/formatDate";

export const getMyChatbotsSerializer = (
	chatbots: ChatbotDTO[]
): Chatbot[] | [] => {
	const serializedChatbots: Chatbot[] = [];

	chatbots.forEach((chatbot) => {
		const temp = {
			chatbotId: chatbot.chatbot_id,
			chatbotName: chatbot.chatbot_name,
			creationDate: formatDateTime(chatbot.creation_date),
			lastUpdated: formatDateTime(chatbot.last_updated),
			knowledgeBase: chatbot.knowledge_base,
			domains: chatbot?.domains || [],
			status: chatbot.status,
		};
		serializedChatbots.push(temp);
	});

	return serializedChatbots;
};
