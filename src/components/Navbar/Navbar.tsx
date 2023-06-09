import { Box, Button, Link, Text } from "@chakra-ui/react";
import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
	useClerk,
} from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
	const navigate = useNavigate();
	const { redirectToUserProfile } = useClerk();

	return (
		<Box
			sx={{
				borderBottom: "lightgray solid 1px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				height: 65,
				backgroundColor: "black",
				borderRadius: 50,
				boxShadow: "0 0 2px lightgray",
				px: 10,
				mb: 5,
				color: "white",
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Text
					color="white"
					sx={{ cursor: "pointer" }}
					onClick={() => navigate("/app")}
					fontWeight="white"
				>
					Lemuur AI
				</Text>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<SignedIn>
					<Link color="white" sx={{ mr: 4 }} href="/app">
						dashboard
					</Link>
					<Link
						color="white"
						onClick={() => redirectToUserProfile()}
						sx={{ mr: 4 }}
					>
						Account
					</Link>
					<Button size="sm" colorScheme="red">
						<SignOutButton> Log out</SignOutButton>
					</Button>
				</SignedIn>
				<SignedOut>
					<Link color="white" href="/" sx={{ mr: 5 }}>
						Home
					</Link>
					<Button size="sm" bgColor="whatsapp.500">
						<SignInButton
							afterSignInUrl="/app"
							afterSignUpUrl="/app"
						>
							Sign In
						</SignInButton>
					</Button>
				</SignedOut>
			</Box>
		</Box>
	);
};

export default Navbar;
