import {
	Badge,
	Box,
	Button,
	Heading,
	Skeleton,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Tag,
	Text,
	useClipboard,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import KnowledgeBase from "./components/KnowledgeBase";
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

const ChatbotConfig = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { onCopy, value, setValue, hasCopied } = useClipboard("");
	const { session } = useClerk();

	const chatbotId = Number(window.location.pathname.split("/")[2] || -1);

	const getChatbotByIdApiStatus = useSelector(
		getChatbotByIdApiStatusSelector
	);
	const chatbot = useSelector(currentChatbotSelector);

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
	}, [chatbotId, dispatch, navigate, session]);

	if (getChatbotByIdApiStatus === "pending") {
		return <ChatbotConfigSkeleton />;
	}

	return (
		<Box>
			<Box sx={{ mb: 2 }}>
				<Button
					onClick={() => navigate("/app")}
					size="sm"
					fontWeight="hairline"
					variant="outline"
				>
					<ChevronLeftIcon />
					Go Back
				</Button>
			</Box>
			<Box
				sx={{
					mb: 3,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box>
					<Heading sx={{ mb: 1 }}>{chatbot?.chatbotName}</Heading>
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
						onClick={() => {
							setValue(`<script
							id="stealth-chatbot-widget"
							data-id=${chatbotId}
							src="http://localhost:5173/stealth.js"
						></script>`);
							onCopy();
						}}
					>
						{`<script
							id="stealth-chatbot-widget"
							data-id=${chatbotId}
							src="http://localhost:5173/stealth.js"
						></script>`}
					</Tag>
					<CopyIcon sx={{ ml: 2 }} />
					{hasCopied && (
						<Text sx={{ ml: 1 }} fontSize="smaller">
							copied!
						</Text>
					)}
				</Box>
			</Box>

			<Box>
				<Tabs>
					<TabList>
						<Tab>Knowledge Base</Tab>
						<Tab>Settings</Tab>
						<Tab>Preview</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<KnowledgeBase
								chatbotId={chatbot?.chatbotId}
								base={chatbot?.knowledgeBase}
							/>
						</TabPanel>
						<TabPanel>
							<ChatbotSettings
								name={chatbot?.chatbotName || ""}
								domains={chatbot?.domains || []}
								status={chatbot?.status || ""}
							/>
						</TabPanel>
						<TabPanel>
							<ChatbotPreview chatbotId={chatbot?.chatbotId} />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Box>
	);
};

export default ChatbotConfig;
