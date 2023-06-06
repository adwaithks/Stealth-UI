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

const Landing: React.FC = () => {
	const [isMobile] = useMediaQuery("(max-width: 768px)");

	return (
		<Box
			sx={{
				backgroundColor: "rgb(235, 255, 61)",
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
					marginBottom: 110,
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
					fontWeight="black"
				>
					Lemuur AI
				</Text>
				<Container
					sx={{
						mt: -5,
						textAlign: "center",
						fontSize: {
							base: "xl",
							md: "1xl",
							lg: "2xl",
						},
					}}
					color="rgba(0, 0, 0, 0.5)"
				>
					Leap into Seamless Support: Introducing Lemuur AI - Your
					Trusted Customer Support Chatbot Companion!
				</Container>
				<Box
					sx={{
						mx: 2,
						boxShadow: "2px 2px 10px gray",
						borderRadius: 5,
						mt: 12,
						height: isMobile ? 250 : 400,
						border: "solid 3px",
						transform: isMobile ? "rotate(-5deg)" : "rotate(0)",
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

			<Box
				sx={{
					borderRadius: 5,
					mt: 55,
					p: 5,
					mx: 2,
					backgroundColor: "black",
					color: "white",
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
								sx={{ border: "white solid 2px" }}
								placeholder="lemuurofficial@gmail.com"
								type="email"
							/>
							<Button
								bg="white"
								color="black"
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
				<Text fontSize="sm">All rights reserved Lemuur AI.</Text>
			</Box>
		</Box>
	);
};

export default Landing;
