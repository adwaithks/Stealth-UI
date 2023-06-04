import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Text,
} from "@chakra-ui/react";
import React from "react";

const Landing: React.FC = () => {
	return (
		<Box
			sx={{
				width: "100%",
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
					"Leap into Seamless Support: Introducing Lemuur AI - Your
					Trusted Customer Support Chatbot Companion!"
				</Container>
			</Box>
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
					Kindly join our waiting list. We'll notify you once we are
					live 🎉
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
							Join Waiting List
						</Button>
					</Box>
				</FormControl>
			</Container>
			<footer
				style={{
					fontSize: "12px",
					position: "absolute",
					bottom: 0,
					left: "50%",
					transform: "translateX(-50%) ",
				}}
			>
				All rights reserved Lemuur AI.
			</footer>
		</Box>
	);
};

export default Landing;
