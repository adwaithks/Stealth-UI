/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChatbotByIdApi } from "../../api/getChatbotById.api";
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
