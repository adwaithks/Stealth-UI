import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Chat } from "../../../../types/chats.type";

const MessageDisplay: React.FC<{ currentChat: Chat[] }> = ({ currentChat }) => {
	function formatDate(date: Date) {
		const dateTimeString = date.toLocaleString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: true,
		});
		return dateTimeString;
	}

	return (
		<Box
			sx={{
				p: 1,
				width: "100%",
				height: "calc(100vh - 220px)",
				overflowY: "auto",
			}}
		>
			<Box
				sx={{
					backgroundColor: "black",
					color: "white",
					p: 2,
					mb: 2,
					borderRadius: 5,
				}}
			>
				<Text fontWeight="black" fontSize="xl">
					Chats
				</Text>
			</Box>
			<Box>
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
									justifyContent: "flex-start",
								}}
							>
								<Box
									sx={{
										mb: 2,
										borderTopRightRadius: 5,
										borderBottomLeftRadius: 5,
										borderBottomRightRadius: 5,

										p: 3,
										maxWidth: 300,
										backgroundColor: "black",
										color: "white",
										width: "fit-content",
									}}
								>
									<Text fontWeight="bold">User</Text>
									<Text
										sx={{
											mt: -1,
											mb: 3,
											fontWeight: 400,
										}}
									>
										{formatDate(chat.timestamp)}
									</Text>
									<Text>{chat.question}</Text>
								</Box>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "flex-end",
								}}
							>
								<Box
									sx={{
										borderTopLeftRadius: 5,
										borderBottomLeftRadius: 5,
										borderBottomRightRadius: 5,
										p: 3,
										maxWidth: 300,
										backgroundColor: "lightgray",
										color: "black",
										width: "fit-content",
									}}
								>
									<Text fontWeight="bold">Bot</Text>
									<Text
										sx={{
											mt: -1,
											mb: 3,
											fontWeight: 400,
										}}
									>
										{formatDate(chat.timestamp)}
									</Text>
									<Text>{chat.answer}</Text>
								</Box>
							</Box>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default MessageDisplay;
