import { BASE_URL } from "./baseURL";
import { chatByUserSessionId } from "./serializers/chats.serializer";

export const getChatsByChatbotIdApi = async (
	chatbotId: number,
	token: string
) => {
	const res = await fetch(BASE_URL + `/api/v1/chats/chatbot/${chatbotId}`, {
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});
	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return chatByUserSessionId(data.message);
};
