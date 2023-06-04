import { CheckIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

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
				border: "lightgray solid 1px",
				p: 3,
				flexWrap: "wrap",
				height: 180,
				boxShadow: "0 0 2px lightgray",
				borderRadius: 3,
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<CheckIcon fontSize="2xl" sx={{ mr: 2 }} color="green" />
				<Text fontWeight="black" fontSize="xl">
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
