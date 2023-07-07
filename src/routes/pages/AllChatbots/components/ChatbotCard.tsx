import { ChatIcon, SettingsIcon } from "@chakra-ui/icons";
import {
	Badge,
	Box,
	IconButton,
	Spinner,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../api/baseURL";
import { useClerk } from "@clerk/clerk-react";

interface IProps {
	name: string;
	creationDate: string;
	status: string;
	id: number;
	fineTune: string;
	primaryBgColor: string;
	trainStatus: string;
	domains: string[];
}

const ChatbotCard: React.FC<IProps> = ({
	id,
	name,
	creationDate,
	fineTune,
	primaryBgColor,
	status,
	trainStatus,
	domains,
}) => {
	const [stopRetry, setStopRetry] = useState(false);
	const navigate = useNavigate();
	const { session } = useClerk();
	const [trainingStatus, setTrainingStatus] = useState(trainStatus);

	useEffect(() => {
		setTrainingStatus(trainStatus);
	}, [trainStatus]);

	const getLinksForChatbot = useCallback(async () => {
		session
			?.getToken({ template: "stealth-token-template" })
			.then(async (token) => {
				if (!token) {
					navigate("/");
					return;
				}
				// eslint-disable-next-line no-useless-catch
				try {
					const res = await fetch(
						BASE_URL + `/api/v2/chatbot/${id}/trainstatus`,
						{
							headers: {
								"Content-Type": "application/json",
								"STEALTH-ACCESS-TOKEN": token,
							},
						}
					);
					const data = await res.json();
					console.log({ data });
					let counter = true;
					if (
						data?.message !== "TRAINING_PENDING" &&
						data?.message !== "RETRAINING_PENDING"
					) {
						counter = false;
					}

					if (!counter) {
						setStopRetry(true);
					}
					setTrainingStatus(data.message);
				} catch (err) {
					throw err;
				}
			});
	}, [id, navigate, session]);

	useEffect(() => {
		let timer: number;

		if (!stopRetry) {
			timer = setTimeout(() => {
				getLinksForChatbot();
			}, 3000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [getLinksForChatbot, stopRetry]);

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
				{trainingStatus === "TRAINING_PENDING" && (
					<Badge
						sx={{ mr: 1, display: "flex", alignItems: "center" }}
						colorScheme="orange"
					>
						training <Spinner ml={1} size="sm" />
					</Badge>
				)}
				{trainingStatus === "RETRAINING_PENDING" && (
					<Badge
						sx={{ mr: 1, display: "flex", alignItems: "center" }}
						colorScheme="orange"
					>
						retraining <Spinner ml={1} size="sm" />
					</Badge>
				)}
				{fineTune?.length === 0 && (
					<Badge sx={{ mr: 1 }} colorScheme="red">
						Add knowledge base !
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
