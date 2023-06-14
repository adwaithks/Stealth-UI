import { BASE_URL } from "./baseURL";

export const deleteChatbotApi = async (chatbotId: number, token: string) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbot/delete", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"STEALTH-ACCESS-TOKEN": token,
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
		}),
	});

	if (!res.ok) {
		throw res.statusText;
	}

	const data = await res.json();
	return data;
};

export const updateChatbotStatusApi = async (
	chatbotId: number,
	newStatus: string,
	token: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbot/status/update", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"STEALTH-ACCESS-TOKEN": token,
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			status: newStatus,
		}),
	});

	if (!res.ok) {
		throw res.statusText;
	}

	const data = await res.json();
	return data;
};

export const updateChatbotNameApi = async (
	chatbotId: number,
	newName: string,
	token: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbot/name/update", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"STEALTH-ACCESS-TOKEN": token,
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			chatbot_name: newName,
		}),
	});

	if (!res.ok) {
		throw res.statusText;
	}

	const data = await res.json();
	return data;
};

export const updateChatbotPositionApi = async (
	chatbotId: number,
	newPosition: string,
	token: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbot/position/update", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"STEALTH-ACCESS-TOKEN": token,
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			position: newPosition,
		}),
	});

	if (!res.ok) {
		throw res.statusText;
	}

	const data = await res.json();
	return data;
};

export const updateChatbotDomainsApi = async (
	chatbotId: number,
	domains: string[],
	token: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbot/domains/update", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"STEALTH-ACCESS-TOKEN": token,
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			domains: domains,
		}),
	});

	if (!res.ok) {
		throw res.statusText;
	}

	const data = await res.json();
	return data;
};
