import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Input,
	InputGroup,
	InputRightAddon,
	Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Chat {
	message: string;
	timestamp: string;
	origin: string;
}

const ChatbotPreview: React.FC<{ chatbotId: number }> = ({ chatbotId }) => {
	const [chats, setChats] = useState<Chat[]>([]);
	const [question, setQuestion] = useState("");
	const [waitingReply, setWaitingReply] = useState(false);

	const handleSend = () => {
		setWaitingReply(true);
		setQuestion("");
		setChats((prev) => [
			...prev,
			{
				message: question,
				timestamp: "",
				origin: "user",
			},
		]);
		fetch("http://localhost:8000/api/v1/chatbot/message/demo", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				question: question,
				chatbot_id: chatbotId,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const reply = data.message;
				setChats((prev) => [
					...prev,
					{
						message: reply,
						timestamp: "",
						origin: "bot",
					},
				]);
			})
			.finally(() => {
				setWaitingReply(false);
			});
	};

	return (
		<Box>
			<Box sx={{ mb: 3 }}>
				<Text fontWeight="bold" fontSize="lg">
					Chatbot Preview
				</Text>
				<Text color="gray">
					Chat with your chatbot to see if it&apos;s answering as
					expected. (If not, retrain your chatbot with more meaningful
					knowledge base)
				</Text>
			</Box>
			<Box
				sx={{
					width: "100%",
					p: 5,
					height: "400px",
					border: "lightgray solid 0.5px",
					borderRadius: 5,
					overflowY: "scroll",
				}}
			>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					{chats.map((chat) => {
						return (
							<Box>
								<Box
									sx={{
										backgroundColor: "black",
										color: "white",
										borderTopRightRadius: 5,
										borderBottomRightRadius: 5,
										borderBottomLeftRadius: 5,
										p: 3,
										maxWidth: "500px",
										minWidth: "200px",
										mb: 1,
										float:
											chat.origin === "user"
												? "left"
												: "right",
									}}
								>
									<Text
										colorScheme={
											chat.origin === "user"
												? "blackAlpha"
												: "messenger"
										}
										fontWeight="bold"
									>
										{chat.origin}
									</Text>{" "}
									{chat.message}
								</Box>
							</Box>
						);
					})}
				</Box>
			</Box>
			<Box sx={{ mt: 1 }}>
				<InputGroup>
					<Input
						disabled={waitingReply}
						value={question}
						onChange={(e) => {
							setQuestion(e.target.value);
						}}
						placeholder="Ask your question..."
					/>
					<InputRightAddon
						p={0}
						children={
							<Button
								disabled={waitingReply}
								onClick={handleSend}
							>
								<ArrowForwardIcon sx={{ mr: 2 }} />
								Send
							</Button>
						}
					/>
				</InputGroup>
			</Box>
		</Box>
	);
};

export default ChatbotPreview;
