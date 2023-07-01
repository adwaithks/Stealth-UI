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
					AI-Powered Intelligence for Exceptional Customer Support!
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
					description="Deliver round-the-clock customer support with the help of our AI chatbots. Our chatbots are available 24 hours a day, 7 days a week, to assist your customers. They provide instant responses and answer frequently asked questions, ensuring seamless daily support."
				/>
				<FeatureCard
					title="Manual Training Control"
					description="Take charge of chatbot training. Our platform lets you curate and refine knowledge bases manually. Update and customize responses effortlessly, ensuring accurate and relevant interactions with users. Have complete control over the training process for precise and meaningful engagement."
				/>
				<FeatureCard
					title="Train on website content"
					description="Unlock unlimited possibilities with our platform. Create chatbots on your website content to cater to different use cases, products, or services. With our flexible and scalable solution, you can effortlessly deploy multiple chatbots and manage them from a single, intuitive interface."
				/>
				<FeatureCard
					title="Raise Tickets"
					description="Streamline your customer support process by enabling users to raise tickets directly through our AI chatbots. When users encounter complex or specific issues that require further assistance, they can easily submit a ticket for a support agent to address. "
				/>
			</Box>
		</section>
	);
};

export default Features;
