import { Box, Text } from "@chakra-ui/react";
import React from "react";
import FeatureCard from "./FeatureCard";

const Features: React.FC = () => {
	return (
		<section
			style={{
				display: "flex",
				height: "100%",
				alignItems: "center",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<Box sx={{ mb: 10 }}>
				<Text fontSize="3xl" fontWeight="bold">
					Unleashing AI-Powered Banter for Maximum Smiles!
				</Text>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexWrap: "wrap",
					gap: 10,
				}}
			>
				<FeatureCard
					title="24x7 Customer Support"
					description="Deliver round-the-clock customer support with the help of our AI chatbots. Our chatbots are available 24 hours a day, 7 days a week, to assist your customers. They provide instant responses, answer frequently asked questions, and guide users through various processes, ensuring seamless support at any time of the day."
				/>
				<FeatureCard
					title="Manual Training Control"
					description="Take complete control over the training process of your chatbots. Our platform empowers you to manually curate and refine the knowledge base of your chatbots. You can easily update and customize the responses to ensure accurate and relevant interactions with your users."
				/>
				<FeatureCard
					title="Unlimited Chatbot Creation"
					description="Unlock unlimited possibilities with our platform. Create as many chatbots as you need to cater to different use cases, products, or services. With our flexible and scalable solution, you can effortlessly deploy multiple chatbots and manage them all from a single, intuitive interface."
				/>
				<FeatureCard
					title="Intelligent Replies"
					description="Harness the power of Open AI to deliver intelligent and contextually relevant replies. Our chatbots utilize advanced natural language processing and machine learning techniques to understand user intent, analyze context, and generate intelligent responses that align with user expectations."
				/>
			</Box>
		</section>
	);
};

export default Features;
