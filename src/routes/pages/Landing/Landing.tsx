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
import React, { useState } from "react";
import Home from "./home2.png";
import Features from "./components/Features";
import { useMediaQuery } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import HowItWorks from "./components/HowItWorks";
import { useClerk } from "@clerk/clerk-react";
import TrainChatbotNow from "./components/TrainChatbotNow";
import Footer from "../Footer/Footer";
import WarnModal from "../../../components/WarnModal/WarnModal";

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
			<WarnModal
				title={title}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			>
				<Text>test</Text>
			</WarnModal>
			<section
				style={{
					display: "flex",
					height: "100%",
					alignItems: "center",
					flexDirection: "column",
					marginBottom: 100,
				}}
			>
				<Text
					sx={{
						fontSize: {
							base: "5xl",
							md: "6xl",
							lg: "7xl",
						},
						mb: 5,
						mt: isMobile ? 5 : 0,
						textAlign: "center",
						textDecoration: "underline",
						textDecorationColor: "yellow",
					}}
					fontWeight="extrabold"
				>
					Always On. Always Helpful.
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
					Trusted Customer Support Chatbot Companion for small scale
					businesses!
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
						borderRadius: 5,
						mt: 12,
					}}
				>
					<Image aspectRatio={isMobile ? 6 / 4 : 10 / 6} src={Home} />
				</Box>
			</section>

			<Features />
			<HowItWorks />

			<TrainChatbotNow />

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
				<Container sx={{ mt: 5, mb: 5 }}>
					<FormControl>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							<Button
								bg="black"
								color="white"
								sx={{ width: "80%" }}
							>
								Let's Go!
							</Button>
						</Box>
					</FormControl>
				</Container>
			</Box>

			<Footer />
		</Box>
	);
};

export default Landing;
