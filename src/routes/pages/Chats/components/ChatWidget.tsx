import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MessageDisplay from "./MessageDisplay";
import UserDisplay from "./UserDisplay";
import { useSelector } from "react-redux";
import { getMyChatbotsApiStatusSelector } from "../../../../store/selectors/chatbots.selector";
import { Chat } from "../../../../types/chats.type";

const ChatWidget: React.FC<{ chats: { [key: string]: Chat[] } }> = ({
	chats,
}) => {
	const [currentChat, setCurrentChat] = useState<Chat[]>([]);
	const [currentUser, setCurrentUser] = useState("");
	const chatsApiStatus = useSelector(getMyChatbotsApiStatusSelector);

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
				borderRadius: 5,
			}}
		>
			{chatsApiStatus !== "pending" && (
				<>
					<Box
						sx={{
							width: "25%",
							borderRight: "lightgray solid 1px",
						}}
					>
						<UserDisplay
							chats={chats}
							users={Object.keys(chats)}
							handleChangeUser={handleChangeUser}
							currentUser={currentUser}
						/>
					</Box>
					<Box sx={{ width: "75%" }}>
						<MessageDisplay currentChat={currentChat} />
					</Box>
				</>
			)}
		</Box>
	);
};

export default ChatWidget;
