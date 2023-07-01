import { Chatbot, ChatbotDTO } from "../../types/chatbot.type";
import { formatDateTime } from "../../utils/formatDate";
import { quickReplySerializer } from "./getChatbotById.sertializer";

export const getMyChatbotsSerializer = (
	chatbots: ChatbotDTO[]
): Chatbot[] | [] => {
	const serializedChatbots: Chatbot[] = [];

	chatbots.forEach((chatbot) => {
		let domains = chatbot.domains ? chatbot.domains.split(",") : [];
		if (domains.length === 1 && domains[0].length === 0) {
			domains = [];
		}
		const temp = {
			chatbotId: chatbot.chatbot_id,
			chatbotName: chatbot.chatbot_name,
			creationDate: formatDateTime(chatbot.creation_date),
			lastUpdated: formatDateTime(chatbot.last_updated),
			knowledgeBase: chatbot.knowledge_base,
			domains: domains || [],
			primaryBgColor: chatbot.primary_bg_color,
			status: chatbot.status,
			position: chatbot.position,
			chatbotHashId: chatbot.chatbot_hash_id,
			quickReplies:
				chatbot?.quick_replies && chatbot?.quick_replies?.length > 0
					? chatbot?.quick_replies?.map((qr) =>
							quickReplySerializer(qr)
					  )
					: [],
		};
		serializedChatbots.push(temp);
	});

	return serializedChatbots;
};
