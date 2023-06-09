import { Box, createStandaloneToast } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const RootLayout: React.FC = () => {
	const { ToastContainer } = createStandaloneToast();

	return (
		<Box sx={{ width: "100%", height: "100vh" }}>
			<Box sx={{ pt: 5, px: 5 }}>
				<Navbar />
			</Box>
			<Box
				sx={{
					mx: {
						lg: 10,
						sm: 5,
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
