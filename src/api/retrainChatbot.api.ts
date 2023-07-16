import { BASE_URL } from "./baseURL";

export const retrainChatbotApi = async (
	chatbotId: number,
	link: string,
	token: string,
	chatbotHashId: string,
	linkId: number
) => {
	const res = await fetch(BASE_URL + "/api/v2/chatbot/retrain", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"STEALTH-ACCESS-TOKEN": token,
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			chatbot_hash_id: chatbotHashId,
			link: link,
			link_id: linkId,
		}),
	});

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return data;
};
