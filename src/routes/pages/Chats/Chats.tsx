import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import {
	chatbotChatsSelector,
	getChatsByChatbotIdApiStatusSelector,
} from "../../../store/selectors/chats.selector";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { getChatsByChatbotId } from "../../../store/thunks/chats.thunk";
import ChatWidget from "./components/ChatWidget";
import ChatsSkeleton from "./components/ChatsSkeleton";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const Chats: React.FC = () => {
	const chatbotId = Number(window.location.pathname.split("/")[3]);
	const dispatch = useAppDispatch();
	const chatsApiSelector = useSelector(getChatsByChatbotIdApiStatusSelector);
	const chats = useSelector(chatbotChatsSelector);
	const { session, loaded } = useClerk();
	const navigate = useNavigate();

	useEffect(() => {
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}
				dispatch(
					getChatsByChatbotId({
						chatbotId,
						token,
					})
				);
			});
	}, [chatbotId, dispatch, navigate, session]);

	if (chatsApiSelector === "pending" || !loaded) return <ChatsSkeleton />;

	return (
		<Box>
			<Box sx={{ mb: 2 }}>
				<Button
					onClick={() => navigate("/app")}
					size="sm"
					fontWeight="hairline"
					variant="outline"
				>
					<ChevronLeftIcon />
					Go Back
				</Button>
			</Box>
			<Box>
				<Text fontSize="xl" fontWeight="bold">
					Customer Chats
				</Text>
				<Text color="gray" mb={3}>
					Conversations between customers and chatbot
				</Text>
			</Box>
			<ChatWidget chats={chats} />
		</Box>
	);
};

export default Chats;
