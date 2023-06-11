import { ChatIcon, CheckIcon, EditIcon, TimeIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const titleToIcon: { [key: string]: React.ReactNode } = {
	"24x7 Customer Support": <TimeIcon color="white" fontSize="2xl" />,
	"Manual Training Control": <EditIcon color="white" fontSize="2xl" />,
	"Unlimited Chatbot Creation": <CheckIcon color="white" fontSize="2xl" />,
	"Intelligent Replies": <ChatIcon color="white" fontSize="2xl" />,
};

const FeatureCard: React.FC<{ title: string; description: string }> = ({
	title,
	description,
}) => {
	return (
		<Box
			sx={{
				width: {
					md: "45%",
				},
				p: 3,
				bg: "white",
				flexWrap: "wrap",
				height: "fit-content",
				boxShadow: "0 0 5px lightgray",
				borderRadius: 5,
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						mr: 2,
						p: 3,
						borderRadius: "50%",
						display: "flex",
						backgroundColor: "green",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{titleToIcon[title]}
				</Box>
				<Text fontWeight="bold" fontSize="2xl">
					{title}
				</Text>
			</Box>
			<Box sx={{ mt: 2 }}>
				<Text>{description}</Text>
			</Box>
		</Box>
	);
};

export default FeatureCard;
