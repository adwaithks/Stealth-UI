import { IAppState } from "../store";

export const chatbotChatsSelector = (state: IAppState) => {
	return state.chatbotChats.chats;
};

export const getChatsByChatbotIdApiStatusSelector = (state: IAppState) => {
	console.log(state);
	return state.chatbotChats.getChatsByChatbotIdApiStatus;
};
