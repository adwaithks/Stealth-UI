import { combineReducers } from "@reduxjs/toolkit";
import chatbotsReducer from "./chatbots.reducer";
import chatsReducer from "./chats.reducer";
import crawlerReducer from "./crawler.reducer";
import userReducer from "./user.reducer";
import ticketsReducer from "./tickets.reducer";

const rootReducer = combineReducers({
	chatbots: chatbotsReducer,
	chatbotChats: chatsReducer,
	crawler: crawlerReducer,
	user: userReducer,
	tickets: ticketsReducer,
});

export default rootReducer;
