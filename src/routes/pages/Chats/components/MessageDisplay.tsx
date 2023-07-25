import { Box, Divider, Skeleton, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Chat } from "../../../../types/chats.type";
import {
	convertToUserLocationDateTime,
	isTimeDifferenceAtLeastNHours,
} from "../../../../utils/formatDate";
import { useSelector } from "react-redux";
import { getChatsByChatbotIdApiStatusSelector } from "../../../../store/selectors/chats.selector";
import { ArrowUpIcon } from "@chakra-ui/icons";

const MessageDisplay: React.FC<{ currentChat: Chat[] }> = ({ currentChat }) => {
	const chatsApiSelector = useSelector(getChatsByChatbotIdApiStatusSelector);
	const messageContainerRef = useRef<any>(null);

	return (
		<Box
			ref={messageContainerRef}
			sx={{
				width: "100%",
				height: "calc(100vh - 90px)",
				overflowY: "auto",
				position: "relative",
				scrollBehavior: "smooth",
			}}
		>
			<Box
				onClick={() => {
					console.log(messageContainerRef.current);
					if (messageContainerRef.current)
						messageContainerRef.current.scrollTo({
							top: 0,
							behaviour: "smooth",
						});
				}}
				sx={{
					zIndex: 2,
					border: "white solid 2px",
					height: 10,
					width: 10,
					position: "fixed",
					left: "27%",
					borderRadius: "50%",
					bgColor: "black",
					bottom: 10,
					display: "flex",
					boxShadow: "0 0 5px black",
					cursor: "pointer",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<ArrowUpIcon color="white" fontSize={25} />
			</Box>
			<Box
				sx={{
					backgroundColor: "white",
					color: "black",
					p: 2,
					position: "sticky",
					top: 0,
				}}
			>
				<Text fontWeight="bold" fontSize="xl">
					Chat History
				</Text>
			</Box>
			<Skeleton
				ml={2}
				height={"calc(100vh - 150px)"}
				isLoaded={chatsApiSelector !== "pending"}
			>
				<Box>
					{currentChat.length === 0 && (
						<Text color="gray">No messages</Text>
					)}
					{currentChat.map((chat: Chat, index) => {
						const linkRegex = /\[(.*?)\]\((.*?)\)/g;

						const replacedAns = chat.answer.replace(
							linkRegex,
							(_, text, link) => {
								return `<a style="text-decoration: underline; font-weight: bold;" href="${link}" target="_blank">${text}</a>`;
							}
						);
						let email = "";
						currentChat?.forEach((ch: Chat) => {
							if (ch.info?.email) {
								email = ch.info.email;
							}
						});
						return (
							<Box
								sx={{
									p: 4,
									display: "flex",
									flexDirection: "column",
								}}
							>
								{currentChat[index - 1] &&
									isTimeDifferenceAtLeastNHours(
										chat.timestamp,
										currentChat[index - 1].timestamp,
										1
									) && (
										<Box display="flex" alignItems="center">
											<Divider my={5} />
											<Box
												sx={{
													whiteSpace: "nowrap",
													color: "gray",
													display: "flex",
													alignItems: "center",
													mx: 5,
												}}
											>
												<Box>
													{
														convertToUserLocationDateTime(
															chat.timestamp
														).date
													}
												</Box>
												<Box ml={1}>
													{
														convertToUserLocationDateTime(
															chat.timestamp
														).time
													}
												</Box>
											</Box>
											<Divider my={5} />
										</Box>
									)}
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
											maxWidth: 500,
											backgroundColor:
												"rgba(0, 0, 0, 0.8)",
											boxShadow: "0 0 2px lightgray",
											color: "white",
											minWidth: 400,
										}}
									>
										<Text fontWeight="bold">
											{email?.length > 0
												? email
												: "Anonymous"}
										</Text>
										<Text
											fontSize={13}
											color="gray"
											sx={{
												mt: -1,
												display: "flex",
												alignItems: "center",
												mb: 3,
												fontWeight: 400,
											}}
										>
											<Box>
												{
													convertToUserLocationDateTime(
														chat.timestamp
													).date
												}
											</Box>
											<Box ml={1}>
												{
													convertToUserLocationDateTime(
														chat.timestamp
													).time
												}
											</Box>
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
											maxWidth: 500,
											backgroundColor: "rgba(0,0,0,0.1)",
											boxShadow: "0 0 2px lightgray",
											color: "black",
											minWidth: 400,
										}}
									>
										<Text fontWeight="bold">Bot</Text>
										<Text
											fontSize={13}
											sx={{
												mt: -1,
												mb: 3,
												color: "gray",
												display: "flex",
												alignItems: "center",
												fontWeight: 400,
											}}
										>
											<Box>
												{
													convertToUserLocationDateTime(
														chat.timestamp
													).date
												}
											</Box>
											<Box ml={1}>
												{
													convertToUserLocationDateTime(
														chat.timestamp
													).time
												}
											</Box>
										</Text>
										<Text
											sx={{ whiteSpace: "pre-line" }}
											dangerouslySetInnerHTML={{
												__html: replacedAns,
											}}
										></Text>
									</Box>
								</Box>
							</Box>
						);
					})}
				</Box>
			</Skeleton>
		</Box>
	);
};

export default MessageDisplay;
