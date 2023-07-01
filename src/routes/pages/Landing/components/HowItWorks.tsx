import { Box, Container, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import WorkCard from "./WorkCard";

const HowItWorks: React.FC = () => {
	const [isMobile] = useMediaQuery("(max-width: 768px)");

	return (
		<section
			style={{
				display: "flex",
				flexDirection: "column",
				borderRadius: 5,
				height: "100%",
				width: "100%",
				alignItems: "center",
				justifyContent: "center",
				marginBottom: 100,
			}}
		>
			<Container
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					mb: 10,
				}}
			>
				<Text textAlign="center" fontSize="3xl" fontWeight="bold">
					Crafting Chatbot Brilliance
				</Text>
				<Text
					textAlign="center"
					fontSize={isMobile ? "lg" : "xl"}
					color="gray"
				>
					{" "}
					A Step-by-Step Guide to Building Exceptional Conversational
					Experiences
				</Text>
			</Container>
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
				<WorkCard
					title="Step 1"
					description="Of course, you have to log in first 😄. Once you are logged in, click on the Create New Chatbot icon on the dashboard page"
				/>
				<WorkCard
					title="Step 2"
					description="Fill in the chatbot name and your website name. We will fetch all the links on your website and provide you with the option to choose from which links you want to fetch content from to train your bot."
				/>
				<WorkCard
					title="Step 3"
					description="Well that's it! But we understand that getting the content from your website might not be enough. That's why we give you the flexibility to add your personal touch. You can edit the data on which your chatbot was trained!"
				/>
				<WorkCard
					title="Step 4"
					description="You can retrain your chatbot anytime you want. As your website evolves and your content grows, you can easily update your chatbot to stay up - to - date."
				/>
			</Box>
		</section>
	);
};

export default HowItWorks;
