import { Chat, ChatDTO } from "../../types/chats.type";

const chatSerializer = (chat: ChatDTO): Chat => {
	return {
		userSessionId: chat.user_session_id,
		question: chat.question,
		answer: chat.answer,
		channel: chat.channel,
		timestamp: new Date(chat.timestamp),
	};
};

export const chatByUserSessionId = (chats: ChatDTO[]) => {
	const chatByUser: { [key: string]: Chat[] } = {};

	// Iterate over each chat in the array
	for (const chat of chats) {
		// Get the user, message, and timestamp from the chat
		const { question, answer, userSessionId, timestamp, channel } =
			chatSerializer(chat);

		// Check if the user already has chats
		if (!chatByUser[userSessionId]) {
			// If the user doesn't have chats, initialize an empty array
			chatByUser[userSessionId] = [];
		}

		// Add the chat message to the user's chats
		chatByUser[userSessionId].push({
			question,
			answer,
			userSessionId,
			timestamp,
			channel,
		});
	}

	// Sort the chats of each user by timestamp
	for (const user in chatByUser) {
		chatByUser[user].sort((a: any, b: any) => a.timestamp - b.timestamp);
	}

	console.log("yo: ", chatByUser);
	return chatByUser;
};
