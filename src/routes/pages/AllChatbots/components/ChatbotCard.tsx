import { ChatIcon, SettingsIcon } from "@chakra-ui/icons";
import {
	Badge,
	Box,
	IconButton,
	Spinner,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import usePolling from "../../../../hooks/usePolling";
import { useAppDispatch } from "../../../../store/store";
import { chatbotsActions } from "../../../../store/reducers/chatbots.reducer";

interface IProps {
	name: string;
	creationDate: string;
	status: string;
	id: number;
	primaryBgColor: string;
	trainStatus: string;
	taskId: string;
	domains: string[];
}

const ChatbotCard: React.FC<IProps> = ({
	id,
	name,
	creationDate,
	primaryBgColor,
	status,
	trainStatus,
	domains,
	taskId,
}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { startPolling, data } = usePolling({
		stopFunction: (response: any) => {
			if (
				response.message === "TRAINING_SUCCESS" ||
				response.message === "TRAINING_REJECTED"
			)
				return true;

			return false;
		},
		maxRetries: 10,
		delay: 5000,
	});

	useEffect(() => {
		if (data) {
			dispatch(
				chatbotsActions.updateTrainStatus({
					chatbotId: id,
					status: data.message,
				})
			);
		}
	}, [dispatch, id, data]);

	useEffect(() => {
		startPolling(`/api/v2/chatbot/${id}/${taskId}/taskstatus`);
	}, [startPolling, id, taskId]);

	return (
		<Box
			sx={{
				display: "flex",
				p: 4,
				borderBottom: "rgba(0,0,0,0.05) solid 1px",
				borderLeft: `${primaryBgColor} solid 4px`,
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Text sx={{ mr: 3 }} fontSize="xl" fontWeight="bold">
						{name}
					</Text>
					<Badge colorScheme={status === "active" ? "green" : "red"}>
						{status}
					</Badge>
				</Box>
				<Badge
					fontWeight="light"
					sx={{ textTransform: "lowercase", borderRadius: 10 }}
					fontSize="small"
					colorScheme="blackAlpha"
				>
					<Text sx={{ mx: 1 }}>created on: {creationDate}</Text>
				</Badge>
			</Box>

			<Box sx={{ display: "flex", alignItems: "center" }}>
				{trainStatus === "TRAINING_PENDING" && (
					<Badge
						sx={{ mr: 1, display: "flex", alignItems: "center" }}
						colorScheme="orange"
					>
						training <Spinner ml={1} size="sm" />
					</Badge>
				)}
				{trainStatus === "RETRAINING_PENDING" && (
					<Badge
						sx={{ mr: 1, display: "flex", alignItems: "center" }}
						colorScheme="orange"
					>
						retraining <Spinner ml={1} size="sm" />
					</Badge>
				)}
				{trainStatus === "RETRAINING_REJECTED" && (
					<Badge
						sx={{ mr: 1, display: "flex", alignItems: "center" }}
						colorScheme="orange"
					>
						retraining failed
					</Badge>
				)}
				{trainStatus === "TRAINING_REJECTED" && (
					<Badge
						sx={{ mr: 1, display: "flex", alignItems: "center" }}
						colorScheme="orange"
					>
						retraining failed
					</Badge>
				)}
				{domains?.length === 0 && (
					<Badge colorScheme="red">Add domains !</Badge>
				)}

				<Box sx={{ ml: 5 }}>
					<Tooltip label="Chats">
						<IconButton
							onClick={() => {
								navigate(`/app/chats/${id}`);
							}}
							aria-label="goto-chatbot"
							variant="outline"
							icon={<ChatIcon />}
						/>
					</Tooltip>
				</Box>

				<Box sx={{ ml: 2 }}>
					<Tooltip label="Configure Chatbot">
						<IconButton
							onClick={() => {
								navigate(`/app/configure/${id}`);
							}}
							aria-label="goto-chatbot"
							variant="outline"
							icon={<SettingsIcon />}
						/>
					</Tooltip>
				</Box>
			</Box>
		</Box>
	);
};

export default ChatbotCard;
