import { Chatbot, ChatbotDTO } from "../../types/chatbot.type";
import { formatDateTime } from "../../utils/formatDate";

export const getMyChatbotsSerializer = (
	chatbots: ChatbotDTO[]
): Chatbot[] | [] => {
	const serializedChatbots: Chatbot[] = [];

	chatbots.forEach((chatbot) => {
		let domains = chatbot.domains ? chatbot.domains.split(",") : [];
		if (domains.length === 1 && domains[0].length === 0) {
			domains = [];
		}
		const temp: Chatbot = {
			chatbotId: chatbot.chatbot_id,
			chatbotName: chatbot.chatbot_name,
			creationDate: formatDateTime(chatbot.creation_date),
			lastUpdated: formatDateTime(chatbot.last_updated),
			fineTune: chatbot.fine_tune?.length ? chatbot.fine_tune : "",
			domains: domains || [],
			trainStatus: chatbot.train_status,
			primaryBgColor: chatbot.primary_bg_color,
			status: chatbot.status,
			position: chatbot.position,
			chatbotHashId: chatbot.chatbot_hash_id,
			quickReplies: [],
		};
		serializedChatbots.push(temp);
	});

	return serializedChatbots;
};
