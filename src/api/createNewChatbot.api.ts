import { BASE_URL } from "./baseURL";
import { createNewChatbotSerializer } from "./serializers/createNewChatbot.serializer";

export const createNewChatbotApi = async (
	chatbotName: string,
	urls: string[],
	token: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbot/train", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"STEALTH-ACCESS-TOKEN": token,
		},
		body: JSON.stringify({
			chatbot_name: chatbotName,
			urls: urls,
		}),
	});
	const data = await res.json();

	if (!res.ok) {
		throw data;
	}

	return createNewChatbotSerializer(data);
};
