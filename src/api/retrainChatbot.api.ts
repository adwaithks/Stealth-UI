import { BASE_URL } from "./baseURL";

export const retrainChatbotApi = async (
	chatbotId: number,
	fineTune: string,
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
			fine_tune: fineTune,
		}),
	});

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return data;
};
