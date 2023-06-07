import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Chat } from "../../../../types/chats.type";

const MessageDisplay: React.FC<{ currentChat: Chat[] }> = ({ currentChat }) => {
	function formatDate(date: Date) {
		return new Intl.DateTimeFormat("en-US", {
			day: "numeric",
			month: "long",
			year: "2-digit",
		}).format(date);
	}

	return (
		<Box
			sx={{
				width: "100%",
				height: "calc(100vh - 200px)",
				overflowY: "auto",
			}}
		>
			{currentChat.map((chat: Chat) => {
				return (
					<Box
						sx={{
							p: 4,
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Box
							sx={{
								display: "flex",
								width: "100%",
								justifyContent: "flex-end",
							}}
						>
							<Box
								sx={{
									mb: 2,
									borderTopLeftRadius: 5,
									borderBottomLeftRadius: 5,
									borderBottomRightRadius: 5,
									p: 3,
									maxWidth: 300,
									backgroundColor: "black",
									color: "white",
									width: "fit-content",
								}}
							>
								<Text fontWeight="bold">
									User
									<span
										style={{
											marginLeft: "5px",
											fontWeight: 400,
										}}
									>
										({formatDate(chat.timestamp)})
									</span>
								</Text>
								<Text>{chat.question}</Text>
							</Box>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "flex-start",
							}}
						>
							<Box
								sx={{
									borderTopRightRadius: 5,
									borderBottomLeftRadius: 5,
									borderBottomRightRadius: 5,
									p: 3,
									maxWidth: 300,
									backgroundColor: "lightgray",
									color: "black",
									width: "fit-content",
								}}
							>
								<Text>Bot</Text>
								<Text>{chat.answer}</Text>
							</Box>
						</Box>
					</Box>
				);
			})}
		</Box>
	);
};

export default MessageDisplay;
