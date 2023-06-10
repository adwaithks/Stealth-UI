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
				// borderBottom: "lightgray solid 0.5px",
				display: "flex",
				backgroundColor: "rgba(0,0,0,0.05)",
				justifyContent: "space-between",
				alignItems: "center",
				height: 65,
				// backgroundColor: "black",
				// borderRadius: 50,
				// boxShadow: "0 0 1px lightgray",
				px: 10,
				mb: 5,
				color: "white",
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Text
					color="black"
					sx={{ cursor: "pointer" }}
					onClick={() => navigate("/app")}
					fontWeight="white"
				>
					Assist Desk
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
					<Link color="black" sx={{ mr: 4 }} href="/app">
						dashboard
					</Link>
					<Link
						color="black"
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
					<Link color="black" href="/" sx={{ mr: 5 }}>
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
