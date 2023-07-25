import { Avatar, Box, Skeleton, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { getTimeAgo } from "../../../../utils/formatDate";
import { Chat } from "../../../../types/chats.type";
import { RepeatIcon } from "@chakra-ui/icons";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/store";
import { getChatsByChatbotId } from "../../../../store/thunks/chats.thunk";
import { useSelector } from "react-redux";
import { getChatsByChatbotIdApiStatusSelector } from "../../../../store/selectors/chats.selector";

const UserDisplay: React.FC<{
	users: string[];
	chats: { [key: string]: Chat[] };
	currentUser: string;
	handleChangeUser: (userId: string) => void;
}> = ({ users, currentUser, handleChangeUser, chats }) => {
	const { session } = useClerk();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const paths = window.location.pathname.split("/");
	const chatbotId = +window.location.pathname.split("/")[paths.length - 1];
	const chatsApiSelector = useSelector(getChatsByChatbotIdApiStatusSelector);

	return (
		<Box
			sx={{
				p: 2,
				height: "calc(100vh - 90px)",
				overflowY: "auto",
			}}
		>
			<Box
				sx={{
					p: 2,
					position: "sticky",
					top: 0,
				}}
			>
				<Text color="black" fontWeight="bold" fontSize="xl">
					Visitors{" "}
					<Tooltip label="refresh">
						<RepeatIcon
							onClick={() => {
								session
									?.getToken({
										template: "stealth-token-template",
									})
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
							}}
							cursor="pointer"
							color="gray"
						/>
					</Tooltip>
				</Text>
			</Box>
			<Skeleton
				mr={2}
				height={"calc(100vh - 150px)"}
				isLoaded={chatsApiSelector !== "pending"}
			>
				<Box
					sx={{
						mr: 3,

						display: "flex",
						flexDirection: "column",
					}}
				>
					{users.length === 0 && (
						<Text color="gray">
							No visitor has interacted with the chatbot
						</Text>
					)}
					{users.map((user: string) => {
						let email = "";
						chats[user]?.forEach((ch: Chat) => {
							if (ch.info?.email) {
								email = ch.info.email;
							}
						});
						return (
							<Box
								onClick={() => handleChangeUser(user)}
								sx={{
									p: 2,
									cursor: "pointer",
									backgroundColor:
										currentUser === user
											? "rgba(0,0,0,0.05)"
											: "white",
									color: "black",
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<Avatar size="sm" mr={2} />
									<Text fontWeight="bold">
										{email?.length > 0
											? email
											: "Anonymous"}
									</Text>
									<Text
										sx={{
											fontSize: 13,
											ml: 2,
											color: "gray",
										}}
									>
										{getTimeAgo(
											chats[user]?.[0]?.timestamp
										)}
									</Text>
								</Box>
								<Text
									sx={{
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}
								>
									{chats[user]?.[0]?.answer}
								</Text>
							</Box>
						);
					})}
				</Box>
			</Skeleton>
		</Box>
	);
};

export default UserDisplay;
