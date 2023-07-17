import { Chat, ChatDTO } from "../../types/chats.type";

const chatSerializer = (chat: ChatDTO): Chat => {
	return {
		info: chat.info,
		question: chat.question,
		answer: chat.answer,
		userSessionId: chat.user_session_id,
		timestamp: new Date(chat.timestamp),
	};
};

export const chatByUserSessionId = (chats: ChatDTO[]) => {
	const chatByUser: { [key: string]: any[] } = {};

	// Iterate over each chat in the array
	for (const chat of chats) {
		// Get the user, message, and timestamp from the chat
		const { question, answer, timestamp, userSessionId, info } =
			chatSerializer(chat);

		// Check if the user already has chats
		if (!chatByUser[userSessionId]) {
			// If the user doesn't have chats, initialize an empty array
			chatByUser[userSessionId] = [];
		}

		let parsedInfo = {};
		try {
			parsedInfo = JSON.parse(info);
		} catch (e) {
			parsedInfo = {};
		}

		// Add the chat message to the user's chats
		chatByUser[userSessionId].push({
			question,
			answer,
			userSessionId,
			timestamp: timestamp.toISOString(),
			info: parsedInfo,
		});
	}

	// Sort the chats of each user by timestamp
	for (const user in chatByUser) {
		chatByUser[user].sort((a: any, b: any) => a.timestamp - b.timestamp);
	}

	return chatByUser;
};
