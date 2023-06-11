/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	deleteChatbotApi,
	updateChatbotDomainsApi,
	updateChatbotNameApi,
	updateChatbotStatusApi,
} from "../../api/chatbotSettings.api";
import { createStandaloneToast } from "@chakra-ui/react";
import { chatbotsActions } from "../reducers/chatbots.reducer";

const { toast } = createStandaloneToast();

export const udpateChatbotStatus = createAsyncThunk(
	"chatbots/udpateChatbotStatus",
	async (
		{
			chatbotId,
			newStatus,
			token,
		}: {
			chatbotId: number;
			newStatus: string;
			token: string;
		},
		{ dispatch }
	) => {
		try {
			const data = await updateChatbotStatusApi(
				chatbotId,
				newStatus,
				token
			);
			dispatch(chatbotsActions.updateCurrentChatbotStatus(newStatus));
			toast({
				title: "Success",
				description: "Status updatation success!",
				status: "success",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Status updation failed!",
				status: "error",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

export const updateChatbotName = createAsyncThunk(
	"chatbots/updateChatbotName",
	async (
		{
			chatbotId,
			newName,
			token,
			oldName,
		}: {
			chatbotId: number;
			newName: string;
			token: string;
			oldName: string;
		},
		{ dispatch }
	) => {
		try {
			const data = await updateChatbotNameApi(chatbotId, newName, token);
			dispatch(chatbotsActions.updateCurrentChatbotName(newName));
			toast({
				title: "Success",
				description: "Name successfully updated!",
				status: "success",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			return data;
		} catch (err: any) {
			dispatch(chatbotsActions.updateCurrentChatbotName(oldName));
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to update chatbot name!",
				status: "error",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

export const updateChatbotDomains = createAsyncThunk(
	"chatbots/updateChatbotDomains",
	async (
		{
			chatbotId,
			domains,
			token,
		}: {
			chatbotId: number;
			domains: string[];
			token: string;
		},
		{ dispatch }
	) => {
		try {
			const data = await updateChatbotDomainsApi(
				chatbotId,
				domains,
				token
			);
			dispatch(chatbotsActions.updateCurrentChatbotDomains(domains));
			toast({
				title: "Success",
				description: "Domains updated successfully!",
				status: "success",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Domain updation failed!",
				status: "error",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

export const deleteChatbot = createAsyncThunk(
	"chatbots/deleteChatbot",
	async ({ chatbotId, token }: { chatbotId: number; token: string }) => {
		try {
			const data = await deleteChatbotApi(chatbotId, token);
			toast({
				title: "Success",
				description: "Chatbot deleted successfully!",
				status: "success",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to delete chatbot",
				status: "error",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);
