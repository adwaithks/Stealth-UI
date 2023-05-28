import { combineReducers } from "@reduxjs/toolkit";
import chatbotsReducer from "./chatbots.reducer";

const rootReducer = combineReducers({
	chatbots: chatbotsReducer,
});

export default rootReducer;
