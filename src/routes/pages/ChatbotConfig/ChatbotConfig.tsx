import {
	Badge,
	Box,
	Button,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Tag,
	Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, CopyIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import ChatbotSettings from "./components/ChatbotSettings";
import { useSelector } from "react-redux";
import {
	currentChatbotSelector,
	getChatbotByIdApiStatusSelector,
} from "../../../store/selectors/chatbots.selector";
import ChatbotPreview from "./components/ChatbotPreview";
import { useAppDispatch } from "../../../store/store";
import { getChatbotById } from "../../../store/thunks/getChatbotById.thunk";
import { useClerk } from "@clerk/clerk-react";
import ChatbotConfigSkeleton from "./components/ChatbotConfigSkeleton";
import QuickReplies from "./components/QuickReplies";
import Links from "./components/Links";
import FineTune from "./components/FineTune";
import usePolling from "../../../hooks/usePolling";
import { getStatusObject } from "../../../utils/trainStatus";
import { chatbotsActions } from "../../../store/reducers/chatbots.reducer";

const ChatbotConfig: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { session } = useClerk();

	const [isCopied, setIsCopied] = useState(false);

	const chatbotId = Number(window.location.pathname.split("/")[3] || -1);

	const getChatbotByIdApiStatus = useSelector(
		getChatbotByIdApiStatusSelector
	);
	const chatbot = useSelector(currentChatbotSelector);

	const { startPolling, data } = usePolling({
		stopFunction: (response: any) => {
			if (
				response.message === "TRAINING_SUCCESS" ||
				response.message === "TRAINING_REJECTED"
			)
				return true;
			return false;
		},
		maxRetries: 5,
		delay: 1000,
	});

	useEffect(() => {
		if (data) {
			dispatch(
				chatbotsActions.updateTrainStatus({
					chatbotId,
					status: data.message,
				})
			);
		}
	}, [data, chatbotId, dispatch]);

	useEffect(() => {
		if (chatbotId && chatbot?.taskId?.length > 0) {
			startPolling(
				`/api/v2/chatbot/${chatbotId}/${chatbot.taskId}/taskstatus`
			);
		}
	}, [startPolling, chatbot?.taskId?.length, chatbotId, chatbot.taskId]);

	useEffect(() => {
		let timeoutId = -1;
		if (isCopied) {
			timeoutId = setTimeout(() => {
				setIsCopied(false);
			}, 1500);
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [isCopied]);

	useEffect(() => {
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}
				dispatch(getChatbotById({ chatbotId, token })).catch(() => {
					navigate("/app");
				});
			})
			.catch(() => {
				navigate("/");
			});
	}, [chatbotId, navigate, session, dispatch]);

	if (getChatbotByIdApiStatus === "pending") {
		return <ChatbotConfigSkeleton />;
	}

	return (
		<Box>
			{/* <Box sx={{ mb: 2 }}>
				<Button
					onClick={() => navigate("/app", { replace: true })}
					size="sm"
					fontWeight="hairline"
					variant="outline"
				>
					<ChevronLeftIcon />
					Go Back
				</Button>
			</Box> */}
			<Box
				sx={{
					mb: 3,
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box sx={{ mb: 1 }}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Heading sx={{ mb: 1, mr: 2 }}>
							{chatbot?.chatbotName}{" "}
						</Heading>

						<Badge
							sx={{
								mr: 1,
								display: "flex",
								alignItems: "center",
							}}
							colorScheme={
								getStatusObject(chatbot.trainStatus).color
							}
						>
							{getStatusObject(chatbot.trainStatus).text}
						</Badge>
					</Box>

					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Text fontSize="sm" sx={{ mr: 5 }}>
							Created At: {chatbot.creationDate}
						</Text>
						<Badge
							colorScheme={
								chatbot.status === "active" ? "green" : "red"
							}
						>
							{chatbot.status}
						</Badge>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
						width: "fit-content",
					}}
					onClick={() => {
						const url = `<script id="stealth-chatbot-widget" data-id="${chatbotId}" data-user="${session?.user.id}" data-bot="${chatbot.chatbotHashId}" src="https://assistdesk.in/assistdesk.min.js"></script>`;
						navigator.clipboard
							.writeText(url)
							.then(() => {
								setIsCopied(true);
							})
							.catch((error) => {
								console.error("Failed to copy text: ", error);
							});
					}}
				>
					<Text fontSize="sm" fontWeight="bold" sx={{ mr: 1 }}>
						Embed URL
					</Text>
					<Tag
						size="md"
						colorScheme="red"
						sx={{
							px: 3,
							width: 300,
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						{`<script id="stealth-chatbot-widget" data-id="${chatbotId}" data-user="${session?.user.id}" data-bot="${chatbot.chatbotHashId}" src="https://assistdesk.in/assistdesk.min.js"></script>`}
					</Tag>
					<CopyIcon sx={{ ml: 2 }} />
					{isCopied && (
						<Text sx={{ ml: 1 }} fontSize="smaller">
							copied!
						</Text>
					)}
				</Box>
			</Box>

			<Box>
				<Tabs>
					<TabList
						sx={{
							position: "sticky",
							top: 0,
							zIndex: 30,
							bgColor: "white",
							backdropFilter: "blur(40px)",
						}}
					>
						<Tab>Settings</Tab>
						<Tab>Links</Tab>
						<Tab>Preview</Tab>
						<Tab>Fine Tune </Tab>
						<Tab>Quick Replies</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<ChatbotSettings
								position={chatbot?.position || ""}
								name={chatbot?.chatbotName || ""}
								domains={chatbot?.domains || []}
								status={chatbot?.status || ""}
								chatbotHashId={chatbot?.chatbotHashId}
								chatbotId={chatbot?.chatbotId}
								primaryBgColor={
									chatbot?.primaryBgColor || "#000000"
								}
							/>
						</TabPanel>
						<TabPanel>
							<Links
								chatbotId={chatbot?.chatbotId}
								chatbotHashId={chatbot?.chatbotHashId}
								trainStatus={chatbot?.trainStatus}
								links={chatbot?.links}
								taskId={chatbot?.taskId}
							/>
						</TabPanel>
						<TabPanel>
							<ChatbotPreview chatbotId={chatbot?.chatbotId} />
						</TabPanel>
						<TabPanel>
							<FineTune
								chatbotId={chatbot?.chatbotId}
								base={chatbot?.fineTune}
							/>
						</TabPanel>

						<TabPanel>
							<QuickReplies
								chatbotId={chatbot?.chatbotId}
								quickReplies={chatbot?.quickReplies}
							/>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Box>
	);
};

export default ChatbotConfig;
