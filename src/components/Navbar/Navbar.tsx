import {
	Badge,
	Box,
	Button,
	Link,
	Text,
	useMediaQuery,
} from "@chakra-ui/react";
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
	const [isMobile] = useMediaQuery("(max-width: 768px)");

	return (
		<Box
			sx={{
				display: "flex",
				backgroundColor: "rgba(0,0,0,0.05)",
				justifyContent: "space-between",
				alignItems: "center",
				height: 65,
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
					fontWeight="bold"
				>
					Assist Desk{" "}
					<Badge ml={2} variant="subtle" colorScheme="red">
						Beta
					</Badge>
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
					{!isMobile && (
						<>
							<Link
								color="black"
								onClick={() => navigate("/pricing")}
								sx={{ mr: 4 }}
							>
								Pricing
							</Link>
							<Link
								color="black"
								onClick={() => navigate("/contact")}
								sx={{ mr: 4 }}
							>
								Contact Us
							</Link>
						</>
					)}
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
