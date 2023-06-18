import { Chatbot } from "../../types/chatbot.type";
import { IAppState } from "../store";

export const getMyChatbotsApiStatusSelector = (state: IAppState) => {
	return state.chatbots.getMyChatbotsApiStatus;
};

export const addQuickReplyApiStatusSelector = (state: IAppState) => {
	return state.chatbots.quickReplyAddApiStatus;
};

export const editQuickReplyApiStatusSelector = (state: IAppState) => {
	return state.chatbots.quickReplyEditApiStatus;
};

export const deleteQuickReplyApiStatusSelector = (state: IAppState) => {
	return state.chatbots.quickReplyDeleteApiStatus;
};

export const myChatbotsSelector = (state: IAppState): Chatbot[] => {
	return state.chatbots.myChatbots;
};

export const createNewChatbotApiStatusSelector = (state: IAppState) => {
	return state.chatbots.createNewChatbotApiStatus;
};

export const retrainChatbotApiStatusSelector = (state: IAppState) => {
	return state.chatbots.retrainChatbotApiStatus;
};

export const deleteChatbotApiStatusSelector = (state: IAppState) => {
	return state.chatbots.deleteChatbotApiStatus;
};

export const udpateChatbotStatusApiSelector = (state: IAppState) => {
	return state.chatbots.chatbotStatusChangeApiStatus;
};

export const updateChatbotNameApiStatusSelector = (state: IAppState) => {
	return state.chatbots.chatbotNameChangeApiStatus;
};

export const currentChatbotSelector = (state: IAppState) => {
	return state.chatbots.currentChatbot;
};

export const getChatbotByIdApiStatusSelector = (state: IAppState) => {
	return state.chatbots.getChatbotByIdApiStatus;
};

export const updateChatbotDomainsApiStatusSelector = (state: IAppState) => {
	return state.chatbots.domainChangeApiStatus;
};
