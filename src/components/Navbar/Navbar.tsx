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
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				height: 50,
				borderRadius: 55,
				backgroundColor: "black",
				color: "white",
			}}
		>
			<Box>
				<Text
					sx={{ cursor: "pointer", pl: 10 }}
					onClick={() => navigate("/app")}
					fontWeight="bold"
				>
					Stealth Bot
				</Text>
			</Box>
			<Box
				sx={{
					pr: 10,
					width: 350,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-evenly",
				}}
			>
				<SignedIn>
					<Link href="/app">dashboard</Link>
					<Link>Billing</Link>
					<Link>Account</Link>
					<Button size="sm" colorScheme="red">
						<SignOutButton signOutCallback={() => navigate("/")}>
							Log out
						</SignOutButton>
					</Button>
				</SignedIn>
				<SignedOut>
					<SignInButton afterSignInUrl="/app" afterSignUpUrl="/app">
						Sign In
					</SignInButton>
				</SignedOut>
			</Box>
		</Box>
	);
};

export default Navbar;
