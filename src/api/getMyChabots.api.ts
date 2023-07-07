import { BASE_URL } from "./baseURL";
import { getMyChatbotsSerializer } from "./serializers/getMyChatbots.serializer";

export const getMyChatbotsApi = async (token: string) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbots/all", {
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return getMyChatbotsSerializer(data.message);
};

export const updateFineTuneApi = async (
	chatbotId: number,
	fineTune: string,
	token: string,
	chatbotHashId: string
) => {
	const res = await fetch(BASE_URL + "/api/v2/chatbot/finetune/update", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"STEALTH-ACCESS-TOKEN": token,
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			chatbot_hash_id: chatbotHashId,
			fine_tune: fineTune,
		}),
	});

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return data.message;
};
