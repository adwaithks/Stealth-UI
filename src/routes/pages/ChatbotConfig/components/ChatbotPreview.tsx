import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Input,
	InputGroup,
	InputRightAddon,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Chat {
	message: string;
	timestamp: string;
	origin: string;
}

const ChatbotPreview = () => {
	const [chats, setChats] = useState<Chat[]>([]);
	const [question, setQuestion] = useState("");

	const handleSend = () => {
		setQuestion("");
		setChats((prev) => [
			...prev,
			{
				message: question,
				timestamp: "",
				origin: "user",
			},
		]);
	};

	return (
		<Box>
			<Box
				sx={{
					width: "100%",
					p: 5,
					height: "400px",
					border: "lightgray solid 0.5px",
					borderRadius: 5,
				}}
			>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					{chats.map((chat) => {
						return (
							<Box
								sx={{
									mb: 1,
									float:
										chat.origin === "user"
											? "left"
											: "right",
								}}
							>
								<Box
									sx={{
										backgroundColor: "black",
										color: "white",
										borderTopRightRadius: 5,
										borderBottomRightRadius: 5,
										borderBottomLeftRadius: 5,
										p: 3,
										width: "fit-content",
									}}
								>
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
						value={question}
						onChange={(e) => {
							setQuestion(e.target.value);
						}}
						placeholder="Ask your question..."
					/>
					<InputRightAddon
						p={0}
						children={
							<Button onClick={handleSend}>
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
