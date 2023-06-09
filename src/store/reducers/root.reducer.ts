import { combineReducers } from "@reduxjs/toolkit";
import chatbotsReducer from "./chatbots.reducer";
// import chatsReducer from "./chats.reducer";
import crawlerReducer from "./crawler.reducer";

const rootReducer = combineReducers({
	chatbots: chatbotsReducer,
	// chatbotChats: chatsReducer,
	crawler: crawlerReducer,
});

export default rootReducer;
