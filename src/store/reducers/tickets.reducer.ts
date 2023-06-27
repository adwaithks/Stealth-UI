import { createSlice } from "@reduxjs/toolkit";
import { ITicket } from "../../types/ticket.type";
import { getTickets, updateTicketStatus } from "../thunks/tickets.thunk";

const ticketsSlice = createSlice({
	name: "tickets",
	initialState: {
		tickets: [] as ITicket[],
		getTicketsApiStatus: "idle",
		updateTicketStatusApiStatus: "idle",
	},
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getTickets.pending, (state) => {
				state.getTicketsApiStatus = "pending";
			})
			.addCase(getTickets.fulfilled, (state, action) => {
				state.tickets = action.payload;
				state.getTicketsApiStatus = "fulfilled";
			})
			.addCase(getTickets.rejected, (state) => {
				state.getTicketsApiStatus = "rejected";
			})
			.addCase(updateTicketStatus.pending, (state) => {
				state.updateTicketStatusApiStatus = "pending";
			})
			.addCase(updateTicketStatus.fulfilled, (state, action) => {
				state.tickets = state.tickets.map((t) => {
					if (t.ticketId === action.payload.ticketId) {
						return {
							...t,
							status: action.payload.status,
						};
					}
					return t;
				});

				state.updateTicketStatusApiStatus = "fulfilled";
			})
			.addCase(updateTicketStatus.rejected, (state) => {
				state.updateTicketStatusApiStatus = "rejected";
			});
	},
});

export default ticketsSlice.reducer;
