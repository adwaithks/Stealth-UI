/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/root.reducer.ts";
import thunkMiddleware from "redux-thunk";
import { useDispatch } from "react-redux";
import { Chatbot } from "../types/chatbot.type.ts";
import { Chat } from "../types/chats.type.ts";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export interface IAppState {
	chatbots: {
		myChatbots: Chatbot[] | [];
		currentChatbot: Chatbot;
		quickReplyAddApiStatus: string;
		quickReplyEditApiStatus: string;
		quickReplyDeleteApiStatus: string;
		getMyChatbotsApiStatus: string;
		createNewChatbotApiStatus: string;
		retrainChatbotApiStatus: string;
		deleteChatbotApiStatus: string;
		chatbotStatusChangeApiStatus: string;
		chatbotNameChangeApiStatus: string;
		domainChangeApiStatus: string;
		getChatbotByIdApiStatus: string;
		chatbotPositionChangeApiStatus: string;
	};
	chatbotChats: {
		chats: { [key: string]: Chat[] };
		getChatsByChatbotIdApiStatus: string;
	};
	crawler: {
		urls: string[];
		getAllUrlsApiStatus: string;
	};
	user: {
		userId: string;
		email: string;
		cancelUrl: string;
		updateUrl: string;
		subId: number;
		subPlanId: number;
		getUserApiStatus: string;
	};
}

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(thunkMiddleware),
});

export default store;
