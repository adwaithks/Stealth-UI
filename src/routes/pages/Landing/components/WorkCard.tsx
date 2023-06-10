import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const WorkCard: React.FC<{ title: string; description: string }> = ({
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
				borderRadius: 5,
			}}
		>
			<Box>
				<Text
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						mb: 3,
					}}
					fontSize="3xl"
					fontWeight="black"
				>
					<CheckCircleIcon color="green" fontSize="3xl" mr={1} />
					{title}
				</Text>
			</Box>
			<Box>
				<Text>{description}</Text>
			</Box>
		</Box>
	);
};

export default WorkCard;
