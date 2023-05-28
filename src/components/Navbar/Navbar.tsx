import { Box, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<Box
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "20px",
				backgroundColor: "black",
				color: "white",
			}}
		>
			<Box>
				<Text
					sx={{ cursor: "pointer" }}
					onClick={() => navigate("/app")}
					fontWeight="bold"
				>
					Stealth Bot
				</Text>
			</Box>
			<Box
				sx={{
					p: 2,
					width: 350,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-evenly",
				}}
			>
				<Link href="/app">dashboard</Link>
				<Link>Billing</Link>
				<Link>Account</Link>
			</Box>
		</Box>
	);
};

export default Navbar;
