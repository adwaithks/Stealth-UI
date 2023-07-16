import { BASE_URL } from "./baseURL";
import {
	getChatbotByIdSerializer,
	linkSerializer,
} from "./serializers/getChatbotById.sertializer";

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

export const getChatbotLinksApi = async ({
	token,
	chatbotId,
}: {
	token: string;
	chatbotId: number;
}) => {
	try {
		const res = await fetch(
			BASE_URL + `/api/v2/chatbot/${chatbotId}/links`,
			{
				headers: {
					"STEALTH-ACCESS-TOKEN": token,
				},
			}
		);
		const data = await res.json();

		const links = linkSerializer(data.message);
		return links;
	} catch (err) {
		return null;
	}
};

export const deleteChatbotLinkApi = async ({
	token,
	chatbotId,
	linkId,
	link,
	chatbotHashId,
}: {
	token: string;
	chatbotId: number;
	linkId: number;
	link: string;
	chatbotHashId: string;
}) => {
	try {
		const res = await fetch(BASE_URL + "/api/v2/chatbot/link/delete", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"STEALTH-ACCESS-TOKEN": token,
			},
			body: JSON.stringify({
				chatbot_id: chatbotId,
				chatbot_hash_id: chatbotHashId,
				link_id: linkId,
				link: link,
			}),
		});
		const data = await res.json();

		const links = linkSerializer(data.message);
		return links;
	} catch (err) {
		return null;
	}
};
