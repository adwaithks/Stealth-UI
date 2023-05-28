import { Box, Button, Divider, Heading, Text } from "@chakra-ui/react";
import React from "react";
import ChatbotCard from "./components/ChatbotCard";
import { AddIcon } from "@chakra-ui/icons";

const AllChatbots = () => {
	const chatbots = [
		{
			chatbotId: 1,
			chatbotName: "stealth-ui-v1",
			knowledgeBase: "",
			creationDate: "23rd June 2023",
			status: "active",
		},
		{
			chatbotId: 2,
			chatbotName: "stealth-ui-v2",
			creationDate: "5th Feb 2023",
			knowledgeBase: `Company Name: XYZ Solutions
			Bio: XYZ Solutions is a leading technology company specializing in software development and IT solutions. With a team of experienced professionals, we strive to deliver innovative and customized solutions to meet the unique needs of our clients. Our expertise spans across various industries, including healthcare, finance, and e-commerce. We are committed to delivering high-quality, scalable, and secure software solutions that drive business growth and success.
			Pricing: At XYZ Solutions, we offer flexible pricing options tailored to your specific requirements. Our pricing model is transparent and competitive, ensuring that you receive the best value for your investment. Whether you need a one-time project or ongoing support, we work closely with you to provide cost-effective solutions that align with your budget and business goals.
			Timings: We understand the importance of timely delivery and responsive support. Our team operates during regular business hours from Monday to Friday, 9:00 AM to 6:00 PM (local time). We are dedicated to providing prompt communication, timely project updates, and reliable support to ensure a smooth and successful collaboration.
			Contact us today to discuss your technology needs and explore how XYZ Solutions can empower your business with cutting-edge software solutions and exceptional service.`,
			status: "active",
		},
	];

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					mb: 5,
					justifyContent: "space-between",
				}}
			>
				<Box>
					<Text sx={{ mb: -0.5 }} fontSize="3xl" fontWeight="bold">
						Your Chatbots
					</Text>
					<Text fontSize="sm" color="gray">
						Explore and manage your created chatbots
					</Text>
				</Box>
				<Button
					sx={{ backgroundColor: "black", color: "white" }}
					variant="solid"
				>
					<AddIcon sx={{ mr: 2 }} />
					Create New Chatbot
				</Button>
			</Box>

			<Divider sx={{ mb: 5 }} orientation="horizontal" />

			<Box>
				{chatbots.map(
					({
						chatbotName,
						creationDate,
						knowledgeBase,
						status,
						chatbotId,
					}) => {
						return (
							<ChatbotCard
								key={chatbotId}
								id={chatbotId}
								name={chatbotName}
								knowledgeBase={knowledgeBase}
								creationDate={creationDate}
								status={status}
							/>
						);
					}
				)}
			</Box>
		</Box>
	);
};

export default AllChatbots;
