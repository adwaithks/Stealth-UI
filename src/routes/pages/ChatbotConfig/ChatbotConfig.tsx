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
	Text,
} from "@chakra-ui/react";
import React from "react";
import KnowledgeBase from "./components/KnowledgeBase";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const ChatbotConfig = () => {
	const navigate = useNavigate();

	const chatbot = {
		chatbotId: 1,
		chatbotName: "stealth-ui",
		creationDate: "10th Apr 2023",
		status: "active",
		lastUpdated: "12th Apr 2023",
		knowledgeBase: `Company Name: XYZ Solutions\nBio: XYZ Solutions is a leading technology company specializing in software development and IT solutions. With a team of experienced professionals, we strive to deliver innovative and customized solutions to meet the unique needs of our clients. Our expertise spans across various industries, including healthcare, finance, and e-commerce. We are committed to delivering high-quality, scalable, and secure software solutions that drive business growth and success.\nPricing: At XYZ Solutions, we offer flexible pricing options tailored to your specific requirements. Our pricing model is transparent and competitive, ensuring that you receive the best value for your investment. Whether you need a one-time project or ongoing support, we work closely with you to provide cost-effective solutions that align with your budget and business goals.\nTimings: We understand the importance of timely delivery and responsive support. Our team operates during regular business hours from Monday to Friday, 9:00 AM to 6:00 PM (local time). We are dedicated to providing prompt communication, timely project updates, and reliable support to ensure a smooth and successful collaboration.\nContact us today to discuss your technology needs and explore how XYZ Solutions can empower your business with cutting-edge software solutions and exceptional service.`,
	};

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
			<Box sx={{ mb: 5 }}>
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

			<Box>
				<Tabs>
					<TabList>
						<Tab>Knowoledge Base</Tab>
						<Tab>User Interface</Tab>
						<Tab>Settings</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<KnowledgeBase base={chatbot.knowledgeBase} />
						</TabPanel>
						<TabPanel>
							<p>two!</p>
						</TabPanel>
						<TabPanel>
							<p>three!</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Box>
	);
};

export default ChatbotConfig;
