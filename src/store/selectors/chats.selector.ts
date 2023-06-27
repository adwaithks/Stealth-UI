import { IAppState } from "../store";

export const chatbotChatsSelector = (state: IAppState) => {
	return state.chatbotChats.chats;
};

export const getChatsByChatbotIdApiStatusSelector = (state: IAppState) => {
	return state.chatbotChats.getChatsByChatbotIdApiStatus;
};
