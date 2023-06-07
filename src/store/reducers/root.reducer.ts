import { combineReducers } from "@reduxjs/toolkit";
import chatbotsReducer from "./chatbots.reducer";
import chatsReducer from "./chats.reducer";

const rootReducer = combineReducers({
	chatbots: chatbotsReducer,
	chatbotChats: chatsReducer,
});

export default rootReducer;
