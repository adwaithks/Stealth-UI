import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	getTicketsApi,
	updateTicketNoteApi,
	updateTicketStatusApi,
} from "../../api/tickets.api";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const getTickets = createAsyncThunk(
	"tickets/getTickets",
	async ({ token }: { token: string }) => {
		try {
			const data = await getTicketsApi(token);
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to get tickets!",
				status: "error",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

export const updateTicketStatus = createAsyncThunk(
	"tickets/updateTicketStatus",
	async ({
		token,
		ticketId,
		newStatus,
		chatbotId,
		chatbotHashId,
	}: {
		token: string;
		ticketId: number;
		newStatus: string;
		chatbotId: number;
		chatbotHashId: string;
	}) => {
		try {
			const data = await updateTicketStatusApi(
				token,
				ticketId,
				chatbotId,
				chatbotHashId,
				newStatus
			);
			toast({
				title: "Success",
				description: "Status updated successfully!",
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
					: "Failed to get tickets!",
				status: "error",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

export const updateTicketNote = createAsyncThunk(
	"tickets/updateTicketNote",
	async ({
		token,
		ticketId,
		chatbotId,
		chatbotHashId,
		note,
	}: {
		token: string;
		ticketId: number;
		note: string;
		chatbotId: number;
		chatbotHashId: string;
	}) => {
		try {
			const data = await updateTicketNoteApi(
				token,
				ticketId,
				chatbotId,
				chatbotHashId,
				note
			);
			toast({
				title: "Success",
				description: "Note saved successfully!",
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
					: "Failed to get tickets!",
				status: "error",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);
