import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Input,
	InputGroup,
	InputRightAddon,
	Text,
} from "@chakra-ui/react";
import { useClerk } from "@clerk/clerk-react";
import React, { useState } from "react";
import { BASE_URL } from "../../../../api/baseURL";
import { useSelector } from "react-redux";
import { currentChatbotSelector } from "../../../../store/selectors/chatbots.selector";

interface Chat {
	message: string;
	timestamp: string;
	origin: string;
}

const ChatbotPreview: React.FC<{ chatbotId: number }> = ({ chatbotId }) => {
	const [chats, setChats] = useState<Chat[]>([]);
	const [question, setQuestion] = useState("");
	const [waitingReply, setWaitingReply] = useState(false);

	const currentChatbot = useSelector(currentChatbotSelector);

	const { session } = useClerk();

	const handleSend = () => {
		if (question.length === 0) {
			alert("Please enter the question!");
			return;
		}
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					alert("Something unexpected happened");
					return;
				}

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
				let context = "";
				if (chats.length > 1) {
					chats.slice(-2).forEach((chat) => {
						context += `${chat.origin}: ${chat.message}`;
					});
				} else if (chats.length > 3) {
					chats.slice(-4).forEach((chat) => {
						context += `${chat.origin}: ${chat.message}`;
					});
				}

				fetch(BASE_URL + "/api/v1/chatbot/message/demo", {
					method: "POST",
					headers: {
						"STEALTH-ACCESS-TOKEN": token,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						question: question,
						chatbot_id: chatbotId,
						context: context,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
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
			<Box sx={{ boxShadow: "0 0 2px lightgray", borderRadius: 5 }}>
				<Box sx={{ bgColor: "black", p: 3 }}>
					<Text
						color="white"
						fontWeight="bold"
						textTransform="capitalize"
					>
						{currentChatbot.chatbotName}
					</Text>
				</Box>
				<Box sx={{ p: 1 }}>
					<Box
						sx={{
							width: "100%",
							p: 5,
							height: "350px",
							borderRadius: 5,
							overflowY: "scroll",
						}}
					>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							{chats.map((chat, idx) => {
								return (
									<Box key={idx}>
										<Box
											sx={{
												whiteSpace: "pre-line",
												backgroundColor:
													chat.origin === "user"
														? "black"
														: "rgba(0,0,0,0.05)",
												color:
													chat.origin === "user"
														? "white"
														: "black",
												borderTopRightRadius: 5,
												borderBottomRightRadius: 5,
												borderBottomLeftRadius: 5,
												p: 3,
												maxWidth: "500px",
												minWidth: "200px",
												mb: 1,
												float:
													chat.origin === "user"
														? "right"
														: "left",
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
					<Box>
						{currentChatbot.quickReplies?.map((qr) => {
							return (
								<Box
									sx={{
										border: "solid 2px",
										width: "fit-content",
										px: 2,
										borderRadius: 20,
										cursor: "pointer",
										_hover: {
											opacity: 0.7,
										},
									}}
									onClick={() => {
										setQuestion(qr.question);
										handleSend();
									}}
								>
									{qr.keyword}
								</Box>
							);
						})}
					</Box>
					<Box sx={{ mt: 1 }}>
						<InputGroup>
							<Input
								disabled={waitingReply}
								value={question}
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										handleSend();
									}
								}}
								onChange={(e) => {
									setQuestion(e.target.value);
								}}
								placeholder="Ask your question..."
							/>
							<InputRightAddon
								p={0}
								children={
									<Button
										isLoading={waitingReply}
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
			</Box>
		</Box>
	);
};

export default ChatbotPreview;
