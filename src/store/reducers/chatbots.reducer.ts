import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyChatbotsApi } from "../../api/getMyChabots.api";
import { Chatbot } from "../../types/chatbot.type";
import { createNewChatbotApi } from "../../api/createNewChatbot.api";
import { retrainChatbotApi } from "../../api/retrainChatbot.api";

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

export const createNewChatbot = createAsyncThunk(
	"chatbots/createNewChatbot",
	async ({ name, knowledgeBase }: { [key: string]: string }) => {
		try {
			const data = await createNewChatbotApi(name, knowledgeBase);
			return data;
		} catch (err) {
			return [];
		}
	}
);

export const retrainChatbot = createAsyncThunk(
	"chatbots/retrainChatbot",
	async ({
		chatbotId,
		knowledgeBase,
	}: {
		chatbotId: number;
		knowledgeBase: string;
	}) => {
		try {
			const data = await retrainChatbotApi(chatbotId, knowledgeBase);
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
		createNewChatbotApiStatus: "idle",
		retrainChatbotApiStatus: "idle",
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
			})
			.addCase(createNewChatbot.pending, (state, action) => {
				state.createNewChatbotApiStatus = "pending";
			})
			.addCase(createNewChatbot.fulfilled, (state, action) => {
				// state.myChatbots.push(action.payload);
				console.log("oi: ", action.payload);
				state.createNewChatbotApiStatus = "fulfilled";
			})
			.addCase(createNewChatbot.rejected, (state, action) => {
				state.createNewChatbotApiStatus = "rejected";
			})
			.addCase(retrainChatbot.pending, (state, action) => {
				state.retrainChatbotApiStatus = "pending";
			})
			.addCase(retrainChatbot.fulfilled, (state, action) => {
				// state.myChatbots.push(action.payload);
				// console.log("oi: ", action.payload);
				state.retrainChatbotApiStatus = "fulfilled";
			})
			.addCase(retrainChatbot.rejected, (state, action) => {
				state.retrainChatbotApiStatus = "rejected";
			});
	},
});

export default chatbotsSlice.reducer;
