/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChatbotByIdApi } from "../../api/getChatbotById.api";

export const getChatbotById = createAsyncThunk(
	"chatbots/getChatbotById",
	async (chatbotId: number) => {
		try {
			const data = await getChatbotByIdApi(chatbotId);
			return data;
		} catch (err) {
			throw err;
		}
	}
);
