import { BASE_URL } from "./baseURL";

const serializeColors = (colors: { primary_bg_color: string }) => {
	return {
		primaryBgColor: colors.primary_bg_color,
	};
};

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

	const data = await res.json();

	if (!res.ok) {
		throw data.message;
	}
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

	const data = await res.json();

	if (!res.ok) {
		throw data.message;
	}
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

	const data = await res.json();

	if (!res.ok) {
		throw data.message;
	}
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

	const data = await res.json();

	if (!res.ok) {
		throw data.message;
	}
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

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return data;
};

export const updateChatbotColorsApi = async (
	chatbotId: number,
	primaryBgColor: string,
	chatbotHashId: string,
	token: string
) => {
	const res = await fetch(BASE_URL + "/api/v1/chatbot/colors/update", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"STEALTH-ACCESS-TOKEN": token,
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			chatbot_hash: chatbotHashId,
			primary_bg_color: primaryBgColor,
		}),
	});

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return serializeColors(data.message);
};
