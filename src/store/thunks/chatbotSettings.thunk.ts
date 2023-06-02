/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	deleteChatbotApi,
	updateChatbotDomainsApi,
	updateChatbotNameApi,
	updateChatbotStatusApi,
} from "../../api/chatbotSettings.api";

export const udpateChatbotStatus = createAsyncThunk(
	"chatbots/udpateChatbotStatus",
	async ({
		chatbotId,
		newStatus,
		token,
	}: {
		chatbotId: number;
		newStatus: string;
		token: string;
	}) => {
		try {
			const data = await updateChatbotStatusApi(
				chatbotId,
				newStatus,
				token
			);
			return data;
		} catch (err) {
			throw err;
		}
	}
);

export const updateChatbotName = createAsyncThunk(
	"chatbots/updateChatbotName",
	async ({
		chatbotId,
		newName,
		token,
	}: {
		chatbotId: number;
		newName: string;
		token: string;
	}) => {
		try {
			const data = await updateChatbotNameApi(chatbotId, newName, token);
			return data;
		} catch (err) {
			throw err;
		}
	}
);

export const updateChatbotDomains = createAsyncThunk(
	"chatbots/updateChatbotDomains",
	async ({
		chatbotId,
		domains,
		token,
	}: {
		chatbotId: number;
		domains: string[];
		token: string;
	}) => {
		try {
			const data = await updateChatbotDomainsApi(
				chatbotId,
				domains,
				token
			);
			return data;
		} catch (err) {
			throw err;
		}
	}
);

export const deleteChatbot = createAsyncThunk(
	"chatbots/deleteChatbot",
	async ({ chatbotId, token }: { chatbotId: number; token: string }) => {
		try {
			const data = await deleteChatbotApi(chatbotId, token);
			return data;
		} catch (err) {
			throw err;
		}
	}
);
