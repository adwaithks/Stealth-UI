import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Image,
	Input,
	Text,
} from "@chakra-ui/react";
import React from "react";
import Home from "./home.png";
import Homemob from "./homemob.png";
import Features from "./components/Features";
import { useMediaQuery } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import HowItWorks from "./components/HowItWorks";
import { useClerk } from "@clerk/clerk-react";

const Landing: React.FC = () => {
	const [isMobile] = useMediaQuery("(max-width: 768px)");
	const { redirectToSignIn } = useClerk();

	return (
		<Box
			sx={{
				borderRadius: 5,
				mx: 2,
				height: "100%",
			}}
		>
			<section
				style={{
					display: "flex",
					height: "100%",
					alignItems: "center",
					flexDirection: "column",
					marginBottom: 150,
				}}
			>
				<Text
					sx={{
						fontSize: {
							base: "6xl",
							md: "7xl",
							lg: "8xl",
						},

						mb: isMobile ? 5 : 0,
						mt: isMobile ? 5 : 0,
					}}
					fontWeight="extrabold"
				>
					Assist Desk
				</Text>

				<Container
					sx={{
						mt: -5,
						textAlign: "center",
						fontSize: {
							base: "xl",
							md: "xl",
							lg: "xl",
						},
					}}
					color="rgba(0, 0, 0, 0.5)"
				>
					Leap into Seamless Support: Introducing Assist Desk - Your
					Trusted Customer Support Chatbot Companion!
				</Container>
				<Box sx={{ mt: 5 }}>
					<Button
						onClick={() => redirectToSignIn()}
						size="lg"
						color="white"
						bgColor="black"
					>
						Create your chatbot now{" "}
						<ArrowForwardIcon sx={{ ml: 1 }} />
					</Button>
				</Box>
				<Box
					sx={{
						mx: 2,
						boxShadow: "2px 2px 10px gray",
						borderRadius: 5,
						mt: 12,
						height: isMobile ? 250 : 400,
						border: "solid 3px",
					}}
				>
					<Image
						aspectRatio={isMobile ? 5 / 4 : 12 / 4.5}
						sx={{ height: "100%" }}
						src={isMobile ? Homemob : Home}
					/>
				</Box>
			</section>

			<Features />
			<HowItWorks />

			<Box
				sx={{
					p: 10,
					boxShadow: "0 0 2px lightgray",
					backgroundColor: "black",
					borderRadius: 5,
					flexDirection: "column",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text color="white" fontWeight="extrabold" fontSize="2xl">
					Train your chatbot now and unlock new heights of customer
					support!
				</Text>
				<Container color="whitesmoke">
					Achieve round-the-clock customer support with our AI chatbot
					platform.
				</Container>

				<Button
					onClick={() => redirectToSignIn()}
					size="lg"
					bg="white"
					color="black"
					sx={{ mt: 5 }}
				>
					Create your chatbot now
					<ArrowForwardIcon sx={{ ml: 1 }} />
				</Button>
			</Box>

			<Box
				sx={{
					borderRadius: 5,
					mt: 10,
					p: 5,
					mx: 2,
					color: "black",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<Text fontSize="3xl" fontWeight="extrabold">
						Let's Connect and Spark a Conversation: Reach Out to Us
						Today!
					</Text>
				</Box>
				<Container sx={{ mt: 5 }}>
					<FormControl>
						<FormLabel>Enter your email address</FormLabel>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							<Input
								sx={{ border: "lightgray solid 2px" }}
								placeholder="lemuurofficial@gmail.com"
								type="email"
							/>
							<Button
								bg="black"
								color="white"
								sx={{ width: "100%", mt: 2 }}
							>
								Let's Go!
							</Button>
						</Box>
					</FormControl>
				</Container>
			</Box>

			<Box
				sx={{
					mt: 50,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text fontSize="sm">All rights reserved Assist Desk.</Text>
			</Box>
		</Box>
	);
};

export default Landing;
