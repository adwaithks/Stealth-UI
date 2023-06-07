import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MessageDisplay from "./MessageDisplay";
import UserDisplay from "./UserDisplay";
import { Chat } from "../../../../types/chats.type";

const ChatWidget: React.FC<{ chats: { [key: string]: Chat[] } }> = ({
	chats,
}) => {
	const [currentChat, setCurrentChat] = useState<Chat[]>([]);
	const [currentUser, setCurrentUser] = useState("");

	useEffect(() => {
		const key = Object.keys(chats)[0];
		if (key) {
			setCurrentChat(chats[key]);
			setCurrentUser(key);
		}
	}, [chats]);

	const handleChangeUser = (userId: string) => {
		for (const key in chats) {
			if (key == userId) {
				setCurrentChat(chats[key]);
				setCurrentUser(key);
			}
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				border: "lightgray solid 1px",
				borderRadius: 5,
			}}
		>
			<Box sx={{ width: "30%", borderRight: "lightgray solid 1px" }}>
				<UserDisplay
					users={Object.keys(chats)}
					handleChangeUser={handleChangeUser}
					currentUser={currentUser}
				/>
			</Box>
			<Box sx={{ width: "70%" }}>
				<MessageDisplay currentChat={currentChat} />
			</Box>
		</Box>
	);
};

export default ChatWidget;
