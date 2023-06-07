/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createStandaloneToast } from "@chakra-ui/react";
import { getChatsByChatbotIdApi } from "../../api/chats.api";

const { toast } = createStandaloneToast();

export const getChatsByChatbotId = createAsyncThunk(
	"chatbots/getChatbotById",
	async ({ chatbotId, token }: { chatbotId: number; token: string }) => {
		try {
			const data = await getChatsByChatbotIdApi(chatbotId, token);
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to get chats!",
				status: "error",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);
