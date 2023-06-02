import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
} from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				height: 50,
				px: 10,
				borderRadius: 55,
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
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<>
					<SignedIn>
						<Link sx={{ mr: 2 }} href="/app">
							dashboard
						</Link>
						<Link sx={{ mr: 2 }}>Account</Link>
						<Button size="sm" colorScheme="red">
							<SignOutButton
								signOutCallback={() => navigate("/")}
							>
								Log out
							</SignOutButton>
						</Button>
					</SignedIn>
				</>
				<>
					<SignedOut>
						<Link href="/" sx={{ mr: 5 }}>
							Home
						</Link>
						<Button size="sm" colorScheme="whatsapp">
							<SignInButton
								afterSignInUrl="/app"
								afterSignUpUrl="/app"
							>
								Sign In
							</SignInButton>
						</Button>
					</SignedOut>
				</>
			</Box>
		</Box>
	);
};

export default Navbar;
