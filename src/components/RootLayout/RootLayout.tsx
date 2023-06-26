import { Alert, AlertIcon, Box, createStandaloneToast } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { createNewChatbotApiStatusSelector } from "../../store/selectors/chatbots.selector";

const RootLayout: React.FC = () => {
	const { ToastContainer } = createStandaloneToast();
	const isTraining = useSelector(createNewChatbotApiStatusSelector);

	return (
		<Box sx={{ width: "100%", height: "100vh" }}>
			{isTraining === "pending" && (
				<Alert status="loading" variant="subtle">
					<AlertIcon />
					Chatbot training started! It should be available in your
					dashboard in few minutes.
				</Alert>
			)}

			{isTraining === "rejected" && (
				<Alert status="error" variant="subtle">
					<AlertIcon />
					Chatbot training failed! Kindly create a new chatbot
					training process.
				</Alert>
			)}
			<Navbar />
			<Box
				sx={{
					mx: {
						lg: 10,
						md: 6,
						sm: 5,
						base: 2,
					},
				}}
			>
				<Outlet />
			</Box>
			<ToastContainer />
		</Box>
	);
};

export default RootLayout;
