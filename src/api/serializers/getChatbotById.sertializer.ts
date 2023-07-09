import {
	Chatbot,
	ChatbotDTO,
	ILink,
	ILinkDTO,
	QuickReplyDTO,
} from "../../types/chatbot.type";
import { formatDateTime } from "../../utils/formatDate";

export const quickReplySerializer = (quickReply: QuickReplyDTO) => {
	return {
		quickReplyId: quickReply.qr_id,
		question: quickReply.question,
		keyword: quickReply.keyword,
		chatbotId: quickReply.chatbot_id,
	};
};

export const linkSerializer = (links: ILinkDTO[]): ILink[] => {
	return links.map((link) => {
		return {
			linkId: link.link_id,
			trainStatus: link.train_status,
			link: link.link,
		};
	});
};

export const getChatbotByIdSerializer = (chatbot: ChatbotDTO): Chatbot => {
	let domains = chatbot.domains ? chatbot.domains.split(",") : [];
	if (domains.length === 1 && domains[0].length === 0) {
		domains = [];
	}

	let trainStatus = chatbot.train_status;
	if (!chatbot.train_status) {
		trainStatus = "TRAINING_SUCCESS";
	}

	return {
		chatbotId: chatbot.chatbot_id,
		chatbotName: chatbot.chatbot_name,
		creationDate: formatDateTime(chatbot.creation_date),
		lastUpdated: formatDateTime(chatbot.last_updated),
		fineTune: chatbot.fine_tune?.length ? chatbot.fine_tune : "",
		domains: domains || [],
		links: linkSerializer(chatbot.links),
		status: chatbot.status,
		trainStatus,
		primaryBgColor: chatbot.primary_bg_color,
		position: chatbot.position,
		chatbotHashId: chatbot.chatbot_hash_id,
		quickReplies:
			chatbot?.quick_replies && chatbot?.quick_replies?.length > 0
				? chatbot?.quick_replies?.map((qr) => quickReplySerializer(qr))
				: [],
	};
};
