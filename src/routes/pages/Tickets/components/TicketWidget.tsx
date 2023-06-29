import React, { useState } from "react";
import { Badge, Box, Text, Select, Spinner } from "@chakra-ui/react";
import { ITicket } from "../../../../types/ticket.type";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/store";
import { updateTicketStatus } from "../../../../store/thunks/tickets.thunk";
import { getTimeAgo } from "../../../../utils/formatDate";

const TicketWidget: React.FC<{ ticket: ITicket }> = (ticket) => {
	const { ticket: t } = ticket;

	const { session } = useClerk();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isUpdating, setIsUpdating] = useState(false);

	const statuses = [
		{
			label: "Open",
			value: "open",
		},
		{
			label: "Pending",
			value: "pending",
		},
		{
			label: "Resolved",
			value: "resolved",
		},
		{
			label: "Spam",
			value: "spam",
		},
		{
			label: "Closed",
			value: "closed",
		},
	];

	const getColor = (status: string) => {
		switch (status) {
			case "open":
				return "green";
			case "resolved":
				return "blue";
			case "spam":
				return "black";
			case "closed":
				return "red";
			case "pending":
				return "orange";
		}
	};

	const updateStatus:
		| React.ChangeEventHandler<HTMLSelectElement>
		| undefined = (e) => {
		setIsUpdating(true);
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}
				dispatch(
					updateTicketStatus({
						token,
						email: t.email,
						enquiry: t.enquiry,
						ticketId: t.ticketId,
						chatbotHashId: t.chatbotHashId,
						chatbotId: t.chatbotId,
						newStatus: e.target.value,
					})
				);
			})
			.catch(() => {
				navigate("/");
			})
			.finally(() => {
				setIsUpdating(false);
			});
	};

	return (
		<Box
			sx={{
				display: "flex",
				p: 4,
				borderBottom: "rgba(0,0,0,0.05) solid 1px",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Box>
				<Text fontWeight="bold">
					{t.email}
					<Badge ml={2} colorScheme={getColor(t.status)}>
						{t.status}
					</Badge>
				</Text>
				<Text color="gray" fontSize="sm">
					{getTimeAgo(t?.creationDate)}
				</Text>
				<Text>{t.enquiry}</Text>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Select
					mr={2}
					disabled={isUpdating}
					onChange={updateStatus}
					size="sm"
					colorScheme="green"
				>
					{statuses.map((s) => {
						return (
							<option
								selected={t.status === s.value}
								value={s.value}
							>
								{s.label}
							</option>
						);
					})}
				</Select>
				{isUpdating && <Spinner />}
			</Box>
		</Box>
	);
};

export default TicketWidget;
