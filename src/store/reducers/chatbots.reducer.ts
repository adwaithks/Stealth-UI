import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyChatbotsApi } from "../../api/getMyChabots.api";
import { Chatbot } from "../../types/chatbot.type";

export const getMyChatbots = createAsyncThunk(
	"chatbots/getMyChatbots",
	async () => {
		try {
			const data = await getMyChatbotsApi();
			return data;
		} catch (err) {
			return [];
		}
	}
);

const chatbotsSlice = createSlice({
	name: "chatbots",
	initialState: {
		myChatbots: [] as Chatbot[] | [],
		getMyChatbotsApiStatus: "idle",
	},
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getMyChatbots.pending, (state, action) => {
				state.getMyChatbotsApiStatus = "pending";
			})
			.addCase(getMyChatbots.fulfilled, (state, action) => {
				state.myChatbots = action.payload;
				state.getMyChatbotsApiStatus = "fulfilled";
			})
			.addCase(getMyChatbots.rejected, (state, action) => {
				state.getMyChatbotsApiStatus = "rejected";
			});
	},
});

export default chatbotsSlice.reducer;
