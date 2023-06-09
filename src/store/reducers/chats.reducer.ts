import { createSlice } from "@reduxjs/toolkit";
import { getChatsByChatbotId } from "../thunks/chats.thunk";

const chatSlice = createSlice({
	name: "chatbotChats",
	initialState: {
		chats: {},
		getChatsByChatbotIdApiStatus: "idle",
	},
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getChatsByChatbotId.pending, (state) => {
				state.getChatsByChatbotIdApiStatus = "pending";
			})
			.addCase(getChatsByChatbotId.fulfilled, (state, action) => {
				state.chats = action.payload;
				state.getChatsByChatbotIdApiStatus = "fulfilled";
			})
			.addCase(getChatsByChatbotId.rejected, (state) => {
				state.getChatsByChatbotIdApiStatus = "rejected";
			});
	},
});

export default chatSlice.reducer;
