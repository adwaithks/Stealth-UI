/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	deleteChatbotApi,
	updateChatbotNameApi,
	updateChatbotStatusApi,
} from "../../api/chatbotSettings.api";

export const udpateChatbotStatus = createAsyncThunk(
	"chatbots/udpateChatbotStatus",
	async ({
		chatbotId,
		newStatus,
	}: {
		chatbotId: number;
		newStatus: string;
	}) => {
		try {
			const data = await updateChatbotStatusApi(chatbotId, newStatus);
			return data;
		} catch (err) {
			throw err;
		}
	}
);

export const updateChatbotName = createAsyncThunk(
	"chatbots/updateChatbotName",
	async ({ chatbotId, newName }: { chatbotId: number; newName: string }) => {
		try {
			const data = await updateChatbotNameApi(chatbotId, newName);
			return data;
		} catch (err) {
			throw err;
		}
	}
);

export const deleteChatbot = createAsyncThunk(
	"chatbots/deleteChatbot",
	async (chatbotId: number) => {
		try {
			const data = await deleteChatbotApi(chatbotId);
			return data;
		} catch (err) {
			throw err;
		}
	}
);

// export const updateChatbotDomains = createAsyncThunk(
// 	"chatbots/updateChatbotDomains",
// 	async ({ chatbotId }: { chatbotId: number }) => {
// 		try {
// 			const data = await update(chatbotId);
// 			return data;
// 		} catch (err) {
// 			return "failed";
// 		}
// 	}
// );
