/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	addNewLinksApi,
	getChatbotByIdApi,
} from "../../api/getChatbotById.api";
import { createStandaloneToast } from "@chakra-ui/react";
import { updateFineTuneApi } from "../../api/getMyChabots.api";

const { toast } = createStandaloneToast();

export const getChatbotById = createAsyncThunk(
	"chatbots/getChatbotById",
	async ({ chatbotId, token }: { chatbotId: number; token: string }) => {
		try {
			const data = await getChatbotByIdApi(chatbotId, token);
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to get chatbot information!",
				status: "error",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

export const updateFineTune = createAsyncThunk(
	"chatbots/updateFineTune",
	async ({
		chatbotId,
		token,
		chatbotHashId,
		fineTune,
	}: {
		chatbotId: number;
		token: string;
		chatbotHashId: string;
		fineTune: string;
	}) => {
		try {
			const data = await updateFineTuneApi(
				chatbotId,
				fineTune,
				token,
				chatbotHashId
			);
			toast({
				title: "Success",
				description: "Fine tune updated successfuly!",
				status: "success",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to get chatbot information!",
				status: "error",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

export const addNewLinks = createAsyncThunk(
	"chatbots/addNewLinks",
	async ({
		chatbotId,
		token,
		chatbotHashId,
		links,
	}: {
		chatbotId: number;
		token: string;
		chatbotHashId: string;
		links: string[];
	}) => {
		try {
			const data = await addNewLinksApi(
				links,
				chatbotId,
				chatbotHashId,
				token
			);
			toast({
				title: "Success",
				description: "Training on new links started!",
				status: "success",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to get start training process!",
				status: "error",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);
