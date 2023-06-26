import { ChatIcon, SettingsIcon } from "@chakra-ui/icons";
import { Badge, Box, IconButton, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
	name: string;
	creationDate: string;
	status: string;
	id: number;
	knowledgeBase: string;
	domains: string[];
}

const ChatbotCard: React.FC<IProps> = ({
	id,
	name,
	creationDate,
	knowledgeBase,
	status,
	domains,
}) => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: "flex",
				p: 4,
				borderBottom: "rgba(0,0,0,0.05) solid 1px",
				borderLeft: "solid 4px",
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
				{knowledgeBase?.length === 0 && (
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
