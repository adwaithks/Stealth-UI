import { Chatbot, ChatbotDTO } from "../../types/chatbot.type";
import { formatDateTime } from "../../utils/formatDate";

export const createNewChatbotSerializer = (chatbot: ChatbotDTO): Chatbot => {
	let trainStatus = chatbot.train_status;
	if (!chatbot.train_status) {
		trainStatus = "TRAINING_SUCCESS";
	}

	return {
		chatbotId: chatbot.chatbot_id,
		chatbotName: chatbot.chatbot_name,
		primaryBgColor: chatbot.primary_bg_color,
		quickReplies: [],
		creationDate: formatDateTime(chatbot.creation_date),
		trainStatus,
		lastUpdated: formatDateTime(chatbot.last_updated),
		fineTune: "",
		domains: [],
		status: chatbot.status,
		position: chatbot.position,
		chatbotHashId: chatbot.chatbot_hash_id,
	};
};
