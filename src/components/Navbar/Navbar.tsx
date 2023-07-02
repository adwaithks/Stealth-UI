import {
	Badge,
	Box,
	Button,
	Image,
	Link,
	Text,
	useMediaQuery,
} from "@chakra-ui/react";
import {
	SignOutButton,
	SignedIn,
	SignedOut,
	useClerk,
} from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./logoblack.png";

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
				px: isMobile ? 2 : 10,
				mb: 5,
				color: "white",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Text
					color="white"
					sx={{
						cursor: "pointer",
						borderRadius: 5,
						p: 1,
						px: 2,
						display: "flex",
						alignItems: "center",
						bgColor: "black",
						boxShadow: "0 0 2px black",
					}}
					onClick={() => navigate("/app")}
					fontWeight="bold"
					fontSize={20}
				>
					<Image mr={1} height={8} width={9} src={Logo} /> Assist Desk{" "}
				</Text>
				<Badge ml={2} variant="subtle" colorScheme="red">
					Beta
				</Badge>
			</Box>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<SignedIn>
					<Link
						color="black"
						sx={{ mr: 4 }}
						onClick={() => navigate("/app")}
					>
						dashboard
					</Link>
					<Link
						color="black"
						sx={{ mr: 4 }}
						onClick={() => navigate("/billing")}
					>
						billing
					</Link>
					<Link
						color="black"
						onClick={() => redirectToUserProfile()}
						sx={{ mr: 4 }}
					>
						account
					</Link>
					<Button size="sm" colorScheme="red">
						<SignOutButton> Log out</SignOutButton>
					</Button>
				</SignedIn>

				<SignedOut>
					<Link
						color="black"
						onClick={() => navigate("/", { replace: true })}
						sx={{ mr: 5 }}
					>
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
				</SignedOut>
			</Box>
		</Box>
	);
};

export default Navbar;
