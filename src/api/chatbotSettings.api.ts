export const deleteChatbotApi = async (chatbotId: number) => {
	const res = await fetch("http://localhost:8000/api/v1/chatbot/delete", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
		}),
	});

	const data = await res.json();
	return data;
};

export const updateChatbotStatusApi = async (
	chatbotId: number,
	newStatus: string
) => {
	const res = await fetch(
		"http://localhost:8000/api/v1/chatbot/status/update",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				chatbot_id: chatbotId,
				status: newStatus,
			}),
		}
	);

	const data = await res.json();
	return data;
};

export const updateChatbotNameApi = async (
	chatbotId: number,
	newName: string
) => {
	const res = await fetch(
		"http://localhost:8000/api/v1/chatbot/name/update",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				chatbot_id: chatbotId,
				chatbot_name: newName,
			}),
		}
	);

	const data = await res.json();
	return data;
};
