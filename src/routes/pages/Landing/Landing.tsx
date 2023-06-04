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
import Features from "./components/Features";

const Landing: React.FC = () => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
			}}
		>
			<section
				style={{
					display: "flex",
					height: "100vh",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<Text
					fontSize="8xl"
					fontFamily="Libre Baskerville"
					fontWeight="extrabold"
				>
					Lemuur AI
				</Text>
				<Container
					sx={{ mt: -5, textAlign: "center" }}
					color="gray"
					fontSize="2xl"
				>
					Leap into Seamless Support: Introducing Lemuur AI - Your
					Trusted Customer Support Chatbot Companion!
				</Container>
				<Box
					sx={{
						boxShadow: "0 0 3px lightgray",
						borderRadius: 5,
						mt: 12,
					}}
				>
					<Image src={Home} />
				</Box>
			</section>

			<Features />

			<Box
				sx={{
					mt: 55,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<Text fontSize="2xl" fontWeight="extrabold">
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
			<Box
				sx={{
					marginTop: 50,
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
