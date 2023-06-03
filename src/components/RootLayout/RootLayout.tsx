import { Box, createStandaloneToast } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const RootLayout: React.FC = () => {
	const { ToastContainer } = createStandaloneToast();

	return (
		<Box sx={{ width: "100%", height: "100vh" }}>
			<Box sx={{ p: 5 }}>
				<Navbar />
			</Box>
			<Box
				sx={{
					mx: 10,
					mt: 5,
					// overflowY: "auto",
					// height: "calc(100vh - 120px)",
				}}
			>
				<Outlet />
			</Box>
			<ToastContainer />
		</Box>
	);
};

export default RootLayout;
