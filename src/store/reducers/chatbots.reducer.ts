/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyChatbotsApi } from "../../api/getMyChabots.api";
import { Chatbot } from "../../types/chatbot.type";
import { createNewChatbotApi } from "../../api/createNewChatbot.api";
import { retrainChatbotApi } from "../../api/retrainChatbot.api";
import {
	deleteChatbot,
	udpateChatbotStatus,
	updateChatbotDomains,
	updateChatbotName,
} from "../thunks/chatbotSettings.thunk";
import { getChatbotById } from "../thunks/getChatbotById.thunk";

export const getMyChatbots = createAsyncThunk(
	"chatbots/getMyChatbots",
	async (token: string) => {
		try {
			const data = await getMyChatbotsApi(token);
			return data;
		} catch (err) {
			throw err;
		}
	}
);

export const createNewChatbot = createAsyncThunk(
	"chatbots/createNewChatbot",
	async ({ name, knowledgeBase, token }: { [key: string]: string }) => {
		try {
			console.log("qwe token: ", token);
			const data = await createNewChatbotApi(name, knowledgeBase, token);
			return data;
		} catch (err) {
			throw err;
		}
	}
);

export const retrainChatbot = createAsyncThunk(
	"chatbots/retrainChatbot",
	async ({
		chatbotId,
		knowledgeBase,
		token,
	}: {
		chatbotId: number;
		knowledgeBase: string;
		token: string;
	}) => {
		try {
			const data = await retrainChatbotApi(
				chatbotId,
				knowledgeBase,
				token
			);
			return data;
		} catch (err) {
			throw err;
		}
	}
);

const chatbotsSlice = createSlice({
	name: "chatbots",
	initialState: {
		myChatbots: [] as Chatbot[],
		currentChatbot: {} as Chatbot,
		getMyChatbotsApiStatus: "idle",
		createNewChatbotApiStatus: "idle",
		retrainChatbotApiStatus: "idle",
		deleteChatbotApiStatus: "idle",
		chatbotStatusChangeApiStatus: "idle",
		chatbotNameChangeApiStatus: "idle",
		domainChangeApiStatus: "idle",
		getChatbotByIdApiStatus: "idle",
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
				state.myChatbots.push(action.payload);
				state.createNewChatbotApiStatus = "fulfilled";
			})
			.addCase(createNewChatbot.rejected, (state, action) => {
				state.createNewChatbotApiStatus = "rejected";
			})
			.addCase(retrainChatbot.pending, (state, action) => {
				state.retrainChatbotApiStatus = "pending";
			})
			.addCase(retrainChatbot.fulfilled, (state, action) => {
				state.retrainChatbotApiStatus = "fulfilled";
			})
			.addCase(retrainChatbot.rejected, (state, action) => {
				state.retrainChatbotApiStatus = "rejected";
			})
			.addCase(udpateChatbotStatus.pending, (state, action) => {
				state.chatbotStatusChangeApiStatus = "pending";
			})
			.addCase(udpateChatbotStatus.fulfilled, (state, action) => {
				state.chatbotStatusChangeApiStatus = "fulfilled";
			})
			.addCase(udpateChatbotStatus.rejected, (state, action) => {
				state.chatbotStatusChangeApiStatus = "rejected";
			})
			.addCase(updateChatbotName.pending, (state, action) => {
				state.chatbotNameChangeApiStatus = "pending";
			})
			.addCase(updateChatbotName.fulfilled, (state, action) => {
				state.chatbotNameChangeApiStatus = "fulfilled";
			})
			.addCase(updateChatbotName.rejected, (state, action) => {
				state.chatbotNameChangeApiStatus = "rejected";
			})
			.addCase(deleteChatbot.pending, (state, action) => {
				state.deleteChatbotApiStatus = "pending";
			})
			.addCase(deleteChatbot.fulfilled, (state, action) => {
				state.deleteChatbotApiStatus = "fulfilled";
			})
			.addCase(deleteChatbot.rejected, (state, action) => {
				state.deleteChatbotApiStatus = "rejected";
			})
			.addCase(getChatbotById.pending, (state, action) => {
				state.getChatbotByIdApiStatus = "pending";
			})
			.addCase(getChatbotById.fulfilled, (state, action) => {
				state.currentChatbot = action.payload;
				state.getChatbotByIdApiStatus = "fulfilled";
			})
			.addCase(getChatbotById.rejected, (state, action) => {
				state.getChatbotByIdApiStatus = "rejected";
			})
			.addCase(updateChatbotDomains.pending, (state, action) => {
				state.domainChangeApiStatus = "pending";
			})
			.addCase(updateChatbotDomains.fulfilled, (state, action) => {
				state.domainChangeApiStatus = "fulfilled";
			})
			.addCase(updateChatbotDomains.rejected, (state, action) => {
				state.domainChangeApiStatus = "rejected";
			});
	},
});

export default chatbotsSlice.reducer;
