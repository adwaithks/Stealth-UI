import { combineReducers } from "@reduxjs/toolkit";
import chatbotsReducer from "./chatbots.reducer";
import chatsReducer from "./chats.reducer";
import crawlerReducer from "./crawler.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
	chatbots: chatbotsReducer,
	chatbotChats: chatsReducer,
	crawler: crawlerReducer,
	user: userReducer,
});

export default rootReducer;
