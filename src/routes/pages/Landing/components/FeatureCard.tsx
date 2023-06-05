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
				border: "gray solid 1px",
				p: 3,
				bg: "white",
				flexWrap: "wrap",
				height: "fit-content",
				boxShadow: "0 0 2px lightgray",
				borderRadius: 5,
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Box
					sx={{
						mr: 2,
						p: 2,
						borderRadius: "50%",
						border: "green solid 3px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CheckIcon fontSize="2xl" color="green" />
				</Box>
				<Text fontWeight="black" fontSize="2xl">
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
