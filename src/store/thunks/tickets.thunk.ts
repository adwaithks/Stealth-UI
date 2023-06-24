import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTicketsApi, updateTicketStatusApi } from "../../api/tickets.api";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const getTickets = createAsyncThunk(
	"tickets/getTickets",
	async ({ token }: { token: string }) => {
		try {
			const data = await getTicketsApi(token);
			console.log(data);
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to get tickets!",
				status: "error",
				duration: 2000,
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
		email,
		enquiry,
	}: {
		token: string;
		ticketId: number;
		newStatus: string;
		chatbotId: number;
		chatbotHashId: string;
		email: string;
		enquiry: string;
	}) => {
		try {
			const data = await updateTicketStatusApi(
				token,
				ticketId,
				chatbotId,
				chatbotHashId,
				newStatus,
				email,
				enquiry
			);
			toast({
				title: "Success",
				description: "Status updated successfully!",
				status: "success",
				duration: 2000,
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
				duration: 2000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);
