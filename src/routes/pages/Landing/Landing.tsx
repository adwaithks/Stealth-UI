import { Box, Button, Container, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import Home from "./home2.png";
import Features from "./components/Features";
import { useMediaQuery } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import HowItWorks from "./components/HowItWorks";
import TrainChatbotNow from "./components/TrainChatbotNow";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
	const [isMobile] = useMediaQuery("(max-width: 768px)");
	const navigate = useNavigate();

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
					marginBottom: 100,
				}}
			>
				<Text
					sx={{
						fontSize: {
							base: "4xl",
							md: "4xl",
							lg: "6xl",
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
							base: "lg",
							md: "xl",
							lg: "xl",
						},
					}}
					color="rgba(0, 0, 0, 0.5)"
				>
					Leap into Seamless Support: Your Customer Support Chatbot
					Companion!
					<span style={{ color: "black", fontWeight: "bold" }}>
						{" "}
						Sign up for free, No credit card required !
					</span>
				</Container>
				<Box sx={{ mt: 5 }}>
					<Button
						onClick={() => navigate("/", { replace: true })}
						size="lg"
						color="white"
						_hover={{
							opacity: 0.8,
						}}
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
					<Image
						loading="lazy"
						aspectRatio={isMobile ? 6 / 4 : 10 / 6}
						src={Home}
					/>
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
					<Text textAlign="center" fontSize="xl" fontWeight="bold">
						Knock, knock! Who's there? Opportunity! Email us for
						custom solutions.
					</Text>
				</Box>
				<Container sx={{ mt: 0, mb: 5 }}>
					<Link
						href="mailto:official@assistdesk.in"
						sx={{
							textDecoration: "none",
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<Button
							bg="black"
							_hover={{
								opacity: 0.6,
							}}
							size="md"
							px={5}
							color="white"
							sx={{ mt: 2 }}
						>
							Email Us for Custom Solutions
							<ArrowForwardIcon sx={{ ml: 1 }} />
						</Button>
					</Link>
				</Container>
			</Box>

			<Footer />
		</Box>
	);
};

export default Landing;
