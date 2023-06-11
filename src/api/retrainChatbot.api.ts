import { BASE_URL } from "./baseURL";

export const retrainChatbotApi = async (
	chatbotId: number,
	knowledgeBase: string,
	token: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbot/retrain", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"STEALTH-ACCESS-TOKEN": token,
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			knowledge_base: knowledgeBase,
		}),
	});

	if (!res.ok) {
		throw res.statusText;
	}

	const data = await res.json();
	return data;
};
