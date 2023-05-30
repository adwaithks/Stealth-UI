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
	useClipboard,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import KnowledgeBase from "./components/KnowledgeBase";
import { ChevronLeftIcon, CopyIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import ChatbotSettings from "./components/ChatbotSettings";
import { useSelector } from "react-redux";
import { myChatbotsSelector } from "../../../store/selectors/chatbots.selector";
import ChatbotPreview from "./components/ChatbotPreview";

const ChatbotConfig = () => {
	const navigate = useNavigate();
	const { onCopy, value, setValue, hasCopied } = useClipboard("");

	const myChatbots = useSelector(myChatbotsSelector);
	const chatbotId = window.location.pathname.split("/")[2] || -1;

	const chatbot = useMemo(() => {
		let currentChatbot;
		for (const chatbot of myChatbots) {
			if (chatbot.chatbotId == chatbotId) {
				currentChatbot = chatbot;
				break;
			}
		}
		return currentChatbot;
	}, [chatbotId, myChatbots]);

	// const chatbot = {
	// 	chatbotId: 1,
	// 	chatbotName: "stealth-ui",
	// 	creationDate: "10th Apr 2023",
	// 	domains: ["adwaithks.com"],
	// 	status: "active",
	// 	lastUpdated: "12th Apr 2023",
	// 	knowledgeBase: `Company Name: XYZ Solutions\nBio: XYZ Solutions is a leading technology company specializing in software development and IT solutions. With a team of experienced professionals, we strive to deliver innovative and customized solutions to meet the unique needs of our clients. Our expertise spans across various industries, including healthcare, finance, and e-commerce. We are committed to delivering high-quality, scalable, and secure software solutions that drive business growth and success.\nPricing: At XYZ Solutions, we offer flexible pricing options tailored to your specific requirements. Our pricing model is transparent and competitive, ensuring that you receive the best value for your investment. Whether you need a one-time project or ongoing support, we work closely with you to provide cost-effective solutions that align with your budget and business goals.\nTimings: We understand the importance of timely delivery and responsive support. Our team operates during regular business hours from Monday to Friday, 9:00 AM to 6:00 PM (local time). We are dedicated to providing prompt communication, timely project updates, and reliable support to ensure a smooth and successful collaboration.\nContact us today to discuss your technology needs and explore how XYZ Solutions can empower your business with cutting-edge software solutions and exceptional service.`,
	// };

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
					mb: 5,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box>
					<Heading sx={{ mb: 1 }}>{chatbot.chatbotName}</Heading>
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
				<Box sx={{ display: "flex", cursor: "pointer" }}>
					<Text fontSize="sm" fontWeight="bold" sx={{ mr: 1 }}>
						Embed URL
					</Text>
					<Tag
						size="xl"
						colorScheme="orange"
						sx={{ px: 3 }}
						onClick={() => {
							setValue("https://www.jsdelivr.com/chatbot/5");
							onCopy();
						}}
					>
						https://www.jsdelivr.com/chatbot/5
						<CopyIcon sx={{ ml: 2 }} />
					</Tag>
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
