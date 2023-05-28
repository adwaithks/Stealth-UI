import { SettingsIcon } from "@chakra-ui/icons";
import { Badge, Box, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
	name: string;
	creationDate: string;
	status: string;
	id: number;
	knowledgeBase: string;
}

const ChatbotCard: React.FC<IProps> = ({
	id,
	name,
	creationDate,
	knowledgeBase,
	status,
}) => {
	const [chatbotStatus, setChatbotStatus] = useState("active");

	const navigate = useNavigate();

	useEffect(() => {
		setChatbotStatus(status);
	}, [status]);

	return (
		<Box
			sx={{
				display: "flex",
				border: "lightgray solid 0.5px",
				borderLeft: "black solid 5px",
				p: 4,
				borderRadius: 5,
				mb: 1,
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
				{/* <Text sx={{ mr: 1 }}>Status: </Text>
				<Select
					onChange={(e) => setChatbotStatus(e.target.value)}
					value={chatbotStatus}
				>
					<option value="active">Active</option>
					<option value="inactive">Inactive</option>
				</Select> */}
				{knowledgeBase.length === 0 && (
					<Badge colorScheme="red">Add knowledge base !</Badge>
				)}

				<Box sx={{ ml: 5 }}>
					<IconButton
						onClick={() => {
							navigate(`/configure/${id}`);
						}}
						aria-label="goto-chatbot"
						variant="outline"
						icon={<SettingsIcon />}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default ChatbotCard;
