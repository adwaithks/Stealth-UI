import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const RootLayout: React.FC = () => {
	return (
		<Box sx={{ width: "100%", height: "100vh" }}>
			<Navbar />
			<Box
				sx={{
					mx: {
						lg: 5,
						md: 6,
						sm: 5,
						base: 2,
					},
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default RootLayout;
