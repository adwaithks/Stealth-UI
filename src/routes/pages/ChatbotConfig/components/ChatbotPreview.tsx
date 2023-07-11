import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Container,
	Input,
	InputGroup,
	InputRightAddon,
	Text,
} from "@chakra-ui/react";
import { useClerk } from "@clerk/clerk-react";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../../../api/baseURL";
import { useSelector } from "react-redux";
import { currentChatbotSelector } from "../../../../store/selectors/chatbots.selector";

interface Chat {
	message: string;
	timestamp: string;
	origin: string;
}

const ChatbotPreview: React.FC<{ chatbotId: number }> = ({ chatbotId }) => {
	const [chats, setChats] = useState<Chat[]>([
		{
			message:
				"I am your AI support agent. I can help you with any questions or inquiries you might have.",
			origin: "bot",
			timestamp: "",
		},
	]);
	const [question, setQuestion] = useState("");
	const [waitingReply, setWaitingReply] = useState(false);
	const messageContainer = useRef<any>(null);

	const currentChatbot = useSelector(currentChatbotSelector);

	const { session } = useClerk();

	function scrollToBottom() {
		if (messageContainer.current)
			messageContainer.current.scrollTop =
				messageContainer.current.scrollHeight;
	}

	useEffect(() => {
		scrollToBottom();
	}, [chats]);

	const handleSend = (qn?: string) => {
		let userQn = question;
		if (qn && qn.length > 0) {
			userQn = qn;
		}
		if (userQn.length === 0) {
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
						message: userQn,
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
						question: userQn,
						chatbot_id: chatbotId,
						context: context,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						let reply = data.message;

						if (reply.includes("AI Assistant:")) {
							reply = reply.replace("AI Assistant:", "");
						}

						if (reply.includes("bot:")) {
							reply = reply.replace("bot:", "");
						}

						if (reply.includes("Assist Desk:")) {
							reply = reply.replace("Assist Desk:", "");
						}

						if (reply.includes("Reply:")) {
							reply = reply.replace("Reply:", "");
						}
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
			<Container>
				<Box
					sx={{
						boxShadow: "0 0 5px lightgray",
						borderRadius: 5,
						width: 390,
						height: 500,
					}}
				>
					<Box
						sx={{
							bgColor: currentChatbot.primaryBgColor,
							p: 3,
							px: 5,
							borderTopLeftRadius: 5,
							borderTopRightRadius: 5,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Text
								color="white"
								fontSize={18}
								fontWeight="bold"
								textTransform="capitalize"
							>
								{currentChatbot.chatbotName}
							</Text>
							<Box
								ml={3}
								color="white"
								border="white solid 1px"
								borderRadius={5}
								px={1}
							>
								<Text>Raise Ticket</Text>
							</Box>
						</Box>
						<Box>
							<CloseIcon color="white" />
						</Box>
					</Box>
					<Box sx={{ p: 1 }}>
						<Box
							ref={messageContainer}
							sx={{
								width: "100%",
								p: 1,
								height:
									currentChatbot?.quickReplies?.length > 0
										? "340px"
										: "360px",
								borderRadius: 5,
								overflowY: "auto",
							}}
						>
							<Box
								sx={{
									width: "100%",
									display: "flex",
									flexDirection: "column",
								}}
							>
								{chats.map((chat, idx) => {
									return (
										<Box key={idx}>
											<Box
												sx={{
													whiteSpace: "pre-line",
													backgroundColor:
														chat.origin === "user"
															? currentChatbot.primaryBgColor
															: "rgba(0,0,0,0.05)",
													color:
														chat.origin === "user"
															? "white"
															: "black",
													borderRadius: 5,
													borderTopRightRadius:
														chat.origin === "user"
															? 0
															: 5,
													borderTopLeftRadius:
														chat.origin === "user"
															? 5
															: 0,
													p: 3,
													maxWidth: "300px",
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
						<Box
							overflowX="auto"
							width="98%"
							margin="auto"
							gap={1}
							display="flex"
							alignItems="center"
						>
							{currentChatbot.quickReplies?.map((qr) => {
								return (
									<Box
										sx={{
											whiteSpace: "nowrap",
											border: `${currentChatbot.primaryBgColor} solid 2px`,
											px: 2,
											color: currentChatbot.primaryBgColor,
											borderRadius: 20,
											cursor: "pointer",
											_hover: {
												opacity: 0.7,
											},
											fontSize: 13,
										}}
										onClick={() => {
											handleSend(qr.question);
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
									focusBorderColor={
										currentChatbot.primaryBgColor
									}
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
											color="white"
											bgColor={
												currentChatbot.primaryBgColor
											}
											borderTopLeftRadius={0}
											borderBottomLeftRadius={0}
											isLoading={waitingReply}
											disabled={waitingReply}
											onClick={() => handleSend()}
										>
											Ask
											<ArrowForwardIcon sx={{ mr: 2 }} />
										</Button>
									}
								/>
							</InputGroup>
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								mt: 1,
								justifyContent: "center",
							}}
						>
							<Text
								fontSize={13}
								sx={{
									display: "flex",
									alignItems: "center",
								}}
							>
								Powered by{" "}
								<Text
									fontSize={15}
									color={currentChatbot.primaryBgColor}
									ml={1}
									textDecoration="underline"
									fontWeight="extrabold"
								>
									Assist Desk
								</Text>
							</Text>
						</Box>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default ChatbotPreview;
