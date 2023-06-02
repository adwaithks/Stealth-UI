export const retrainChatbotApi = async (
	chatbotId: number,
	knowledgeBase: string,
	token: string
) => {
	const res = await fetch("http://localhost:8000/api/v1/chatbot/retrain", {
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
	const data = await res.json();
	return data;
};
