/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createStandaloneToast } from "@chakra-ui/react";
import {
	addQuickReplyApi,
	deleteQuickReplyApi,
	editQuickReplyApi,
} from "../../api/quickReplies.api";
import { chatbotsActions } from "../reducers/chatbots.reducer";
import { QuickReply } from "../../types/chatbot.type";

const { toast } = createStandaloneToast();

export const addQuickReply = createAsyncThunk(
	"quickReply/addQuickReply",
	async ({
		chatbotId,
		question,
		keyword,
		token,
	}: {
		chatbotId: number;
		token: string;
		question: string;
		keyword: string;
	}) => {
		try {
			const data = await addQuickReplyApi(
				chatbotId,
				keyword,
				question,
				token
			);
			toast({
				title: "Success",
				description: "New quick reply added successfully!",
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
					: "Failed to add quick reply!",
				status: "error",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

export const deleteQuickReply = createAsyncThunk(
	"quickReply/deleteQuickReply",
	async (
		{
			quickReplies,
			chatbotId,
			quickReplyId,
			token,
		}: {
			quickReplies: QuickReply[];
			chatbotId: number;
			token: string;
			quickReplyId: number;
		},
		{ dispatch }
	) => {
		try {
			const data = await deleteQuickReplyApi(
				chatbotId,
				quickReplyId,
				token
			);
			dispatch(
				chatbotsActions.deleteThisQuickReply({
					quickReplies,
					quickReplyId,
				})
			);
			toast({
				title: "Success",
				description: "Quick reply deleted successfully!",
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
					: "Failed to delete quick reply!",
				status: "error",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

export const editQuickReply = createAsyncThunk(
	"quickReply/editQuickReply",
	async ({
		chatbotId,
		quickReplyId,
		question,
		keyword,
		token,
	}: {
		chatbotId: number;
		quickReplyId: number;
		token: string;
		question: string;
		keyword: string;
	}) => {
		try {
			const data = await editQuickReplyApi(
				chatbotId,
				quickReplyId,
				keyword,
				question,
				token
			);
			toast({
				title: "Success",
				description: "Quick reply edited successfully!",
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
					: "Failed to edit quick reply!",
				status: "error",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);
