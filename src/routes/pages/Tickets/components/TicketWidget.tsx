import React, { useEffect, useRef, useState } from "react";
import {
	Badge,
	Box,
	Text,
	Select,
	Spinner,
	Popover,
	PopoverTrigger,
	IconButton,
	PopoverContent,
	PopoverArrow,
	Stack,
	ButtonGroup,
	Button,
	Textarea,
	useDisclosure,
	PopoverHeader,
} from "@chakra-ui/react";
import { ITicket } from "../../../../types/ticket.type";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/store";
import {
	updateTicketNote,
	updateTicketStatus,
} from "../../../../store/thunks/tickets.thunk";
import { getTimeAgo } from "../../../../utils/formatDate";
import { AttachmentIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import {
	updateTicketNoteApiStatusSelector,
	updateTicketStatusApiStatusSelector,
} from "../../../../store/selectors/tickets.selector";

const TicketWidget: React.FC<{ ticket: ITicket }> = (ticket) => {
	const { ticket: t } = ticket;

	const { session } = useClerk();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isStatusUpdating, setIsStatusUpdating] = useState(false);
	const [newNote, setNewNote] = useState(t.note);
	const noteRef = useRef<any>();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [isNoteUpdating, setIsNoteUpdating] = useState(false);

	const statusUpdateApiStatus = useSelector(
		updateTicketStatusApiStatusSelector
	);
	const noteUpdateApiStatus = useSelector(updateTicketNoteApiStatusSelector);

	useEffect(() => {
		setNewNote(t.note || "");
	}, [t.note]);

	useEffect(() => {
		if (statusUpdateApiStatus === "fulfilled" && isStatusUpdating)
			setIsStatusUpdating(false);

		if (noteUpdateApiStatus === "fulfilled" && isNoteUpdating)
			setIsNoteUpdating(false);
	}, [
		isNoteUpdating,
		isStatusUpdating,
		noteUpdateApiStatus,
		statusUpdateApiStatus,
	]);

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

	const handleSaveNote = () => {
		setIsNoteUpdating(true);
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}
				dispatch(
					updateTicketNote({
						token,
						ticketId: t.ticketId,
						chatbotHashId: t.chatbotHashId,
						chatbotId: t.chatbotId,
						note: newNote || "",
					})
				);
			})
			.catch(() => {
				navigate("/");
			});
	};

	const updateStatus:
		| React.ChangeEventHandler<HTMLSelectElement>
		| undefined = (e) => {
		setIsStatusUpdating(true);
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
						ticketId: t.ticketId,
						chatbotHashId: t.chatbotHashId,
						chatbotId: t.chatbotId,
						newStatus: e.target.value,
					})
				);
			})
			.catch(() => {
				navigate("/");
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
				<Box sx={{ zIndex: 30 }}>
					<Popover
						size="lg"
						isOpen={isOpen}
						initialFocusRef={noteRef}
						onOpen={onOpen}
						onClose={onClose}
						placement="left"
						closeOnBlur
						closeOnEsc
					>
						<PopoverTrigger>
							<IconButton
								aria-label="notes"
								size="sm"
								mr={2}
								icon={<AttachmentIcon />}
							/>
						</PopoverTrigger>
						<PopoverContent p={2}>
							<PopoverArrow />
							<PopoverHeader padding={0}>
								<Text fontWeight="bold">Add Note</Text>
								<Text fontSize="sm" color="gray">
									So that You can take it up later :)
								</Text>
							</PopoverHeader>
							<Stack mt={2} spacing={3}>
								<Textarea
									placeholder="Eg: Ticket on hold!"
									ref={noteRef}
									value={newNote}
									onChange={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setNewNote(e.target.value);
									}}
								/>
								<ButtonGroup
									display="flex"
									justifyContent="flex-end"
								>
									<Button
										size="sm"
										variant="outline"
										onClick={onClose}
									>
										Cancel
									</Button>
									<Button
										onClick={handleSaveNote}
										size="sm"
										isLoading={isNoteUpdating}
										loadingText="Saving note"
										bgColor="black"
										color="white"
									>
										Save
									</Button>
								</ButtonGroup>
							</Stack>
						</PopoverContent>
					</Popover>
				</Box>
				<Box>
					<Select
						mr={2}
						disabled={isStatusUpdating}
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

					{isStatusUpdating && <Spinner />}
				</Box>
			</Box>
		</Box>
	);
};

export default TicketWidget;
