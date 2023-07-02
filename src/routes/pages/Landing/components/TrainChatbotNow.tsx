import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Text } from "@chakra-ui/react";
import React from "react";
// import { useNavigate } from "react-router-dom";

const TrainChatbotNow: React.FC = () => {
	// const navigate = useNavigate();

	return (
		<Box
			sx={{
				p: 10,
				boxShadow: "0 0 2px lightgray",
				backgroundColor: "black",
				borderRadius: 5,
				flexDirection: "column",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				mb: 50,
			}}
		>
			<Text color="white" fontWeight="extrabold" fontSize="2xl">
				Train your chatbot now and unlock new heights of customer
				support!
			</Text>
			<Container color="whitesmoke">
				Achieve round-the-clock customer support with our AI chatbot
				platform.
			</Container>

			<Button
				// onClick={() => navigate("/signup", { replace: true })}
				size="lg"
				bg="white"
				color="black"
				sx={{ mt: 5 }}
			>
				Create your chatbot now
				<ArrowForwardIcon sx={{ ml: 1 }} />
			</Button>
		</Box>
	);
};

export default TrainChatbotNow;
