import { BASE_URL } from "./baseURL";
import { quickReplySerializer } from "./serializers/getChatbotById.sertializer";

export const addQuickReplyApi = async (
	chatbotId: number,
	keyword: string,
	question: string,
	token: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbot/quickreply/add", {
		method: "POST",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			keyword,
			question,
		}),
	});
	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return quickReplySerializer(data.message);
};

export const editQuickReplyApi = async (
	chatbotId: number,
	quickreplyId: number,
	keyword: string,
	question: string,
	token: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbot/quickreply/edit", {
		method: "POST",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			keyword,
			qr_id: quickreplyId,
			question,
		}),
	});

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return quickReplySerializer(data.message);
};

export const deleteQuickReplyApi = async (
	chatbotId: number,
	quickReplyId: number,
	token: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbot/quickreply/delete", {
		method: "POST",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			qr_id: quickReplyId,
		}),
	});
	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return data.message;
};
