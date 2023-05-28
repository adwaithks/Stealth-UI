import { Box, Button, Divider, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ChatbotCard from "./components/ChatbotCard";
import { AddIcon } from "@chakra-ui/icons";
import { getMyChatbots } from "../../../store/reducers/chatbots.reducer";
import {
	getMyChatbotsApiStatusSelector,
	myChatbotsSelector,
} from "../../../store/selectors/myChatbots.selector";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";

const AllChatbots = () => {
	const dispatch = useAppDispatch();
	const getMyChatbotsApiStatus = useSelector(getMyChatbotsApiStatusSelector);
	const chatbots = useSelector(myChatbotsSelector);

	useEffect(() => {
		dispatch(getMyChatbots());
	}, [dispatch]);

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					mb: 5,
					justifyContent: "space-between",
				}}
			>
				<Box>
					<Text sx={{ mb: -0.5 }} fontSize="3xl" fontWeight="bold">
						Your Chatbots
					</Text>
					<Text fontSize="sm" color="gray">
						Explore and manage your created chatbots
					</Text>
				</Box>
				<Button
					sx={{ backgroundColor: "black", color: "white" }}
					variant="solid"
				>
					<AddIcon sx={{ mr: 2 }} />
					Create New Chatbot
				</Button>
			</Box>

			<Divider sx={{ mb: 5 }} orientation="horizontal" />

			<Box>
				{getMyChatbotsApiStatus === "pending" && <Text>Loading</Text>}
				{getMyChatbotsApiStatus === "fulfilled" &&
					chatbots.map(
						({
							chatbotName,
							creationDate,
							knowledgeBase,
							status,
							chatbotId,
						}) => {
							return (
								<ChatbotCard
									key={chatbotId}
									id={chatbotId}
									name={chatbotName}
									knowledgeBase={knowledgeBase}
									creationDate={creationDate}
									status={status}
								/>
							);
						}
					)}
			</Box>
		</Box>
	);
};

export default AllChatbots;
