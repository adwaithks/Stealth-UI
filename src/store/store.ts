import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers/root.reducer.ts";
import thunkMiddleware from "redux-thunk";
import { useDispatch } from "react-redux";
import { Chatbot } from "../types/chatbot.type.ts";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export interface IAppState {
	chatbots: {
		myChatbots: Chatbot[] | [];
		currentChatbot: Chatbot;
		getMyChatbotsApiStatus: string;
		createNewChatbotApiStatus: string;
		retrainChatbotApiStatus: string;
		deleteChatbotApiStatus: string;
		chatbotStatusChangeApiStatus: string;
		chatbotNameChangeApiStatus: string;
		domainChangeApiStatus: string;
		getChatbotByIdApiStatus: string;
	};
}

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(thunkMiddleware),
});

export default store;
