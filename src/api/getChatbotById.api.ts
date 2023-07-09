import { BASE_URL } from "./baseURL";
import { getChatbotByIdSerializer } from "./serializers/getChatbotById.sertializer";

export const getChatbotByIdApi = async (chatbotId: number, token: string) => {
	const res = await fetch(BASE_URL + `/api/v1/chatbots/${chatbotId}`, {
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});
	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return getChatbotByIdSerializer(data.message);
};

export const addNewLinksApi = async (
	links: string[],
	chatbotId: number,
	chatbotHashId: string,
	token: string
) => {
	const res = await fetch(BASE_URL + `/api/v2/chatbot/train/new`, {
		method: "POST",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			links,
			chatbot_id: chatbotId,
			chatbot_hash_id: chatbotHashId,
		}),
	});
	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return data.message;
};
