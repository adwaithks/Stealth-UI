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
				borderRadius: 5,
				justifyContent: "center",
				marginBottom: 100,
			}}
		>
			<Box sx={{ mb: 5, textAlign: "center" }}>
				<Text color="black" fontSize="3xl" fontWeight="bold">
					Unleashing AI-Powered Banter for Maximum Smiles!
				</Text>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexWrap: "wrap",
					gap: 5,
					margin: 2,
				}}
			>
				<FeatureCard
					title="24x7 Customer Support"
					description="Deliver round-the-clock customer support with the help of our AI chatbots. Our chatbots are available 24 hours a day, 7 days a week, to assist your customers. They provide instant responses, answer frequently asked questions, ensuring seamless support at any time of the day."
				/>
				<FeatureCard
					title="Manual Training Control"
					description="Take charge of chatbot training. Our platform lets you curate and refine knowledge bases manually. Update and customize responses effortlessly, ensuring accurate and relevant interactions with users. Have complete control over the training process for precise and meaningful engagement."
				/>
				<FeatureCard
					title="Train on website content"
					description="Unlock unlimited possibilities with our platform. Create chatbots on your website content to cater to different use cases, products, or services. With our flexible and scalable solution, you can effortlessly deploy multiple chatbots and manage them all from a single, intuitive interface."
				/>
				<FeatureCard
					title="Intelligent Replies"
					description="Harness the power of Open AI to deliver intelligent and contextually relevant replies. Chatbots utilize advanced NLP and machine learning techniques to understand user intent, analyze context, and generate intelligent responses that align with user expectations."
				/>
			</Box>
		</section>
	);
};

export default Features;
