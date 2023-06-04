import { Box, Button, Image, Link, Text } from "@chakra-ui/react";
import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
	useClerk,
} from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./logo.svg";

const Navbar: React.FC = () => {
	const navigate = useNavigate();
	const { redirectToUserProfile } = useClerk();

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
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Image sx={{ borderRadius: "50%" }} height={10} src={Logo} />
				<Text
					sx={{ cursor: "pointer" }}
					onClick={() => navigate("/app")}
					fontWeight="black"
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
					<Link sx={{ mr: 4 }} href="/app">
						dashboard
					</Link>
					<Link
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
			</Box>
		</Box>
	);
};

export default Navbar;
