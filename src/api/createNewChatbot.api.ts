import { createNewChatbotSerializer } from "./serializers/createNewChatbot.serializer";

export const createNewChatbotApi = async (
	chatbotName: string,
	knowledgeBase: string
) => {
	const res = await fetch("http://localhost:8000/api/v1/chatbot/new", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chatbot_name: chatbotName,
			knowledge_base: knowledgeBase,
		}),
	});
	const data = await res.json();
	return createNewChatbotSerializer(data);
};
