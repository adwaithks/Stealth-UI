import { Chatbot } from "../../types/chatbot.type";

export const getMyChatbotsApiStatusSelector = (state: any) => {
	return state.chatbots.getMyChatbotsApiStatus;
};

export const myChatbotsSelector = (state: any): Chatbot[] => {
	return state.chatbots.myChatbots;
};

export const createNewChatbotApiStatusSelector = (state: any) => {
	return state.chatbots.createNewChatbotApiStatus;
};

export const retrainChatbotApiStatusSelector = (state: any) => {
	return state.chatbots.retrainChatbotApiStatus;
};
