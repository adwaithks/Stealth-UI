import { Box, Button, Divider, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import TrainChatbotNow from "../Landing/components/TrainChatbotNow";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const TermsNConditions: React.FC = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	const navigate = useNavigate();

	return (
		<Box sx={{ mx: 2 }}>
			<Box sx={{ ml: 2 }}>
				<Button
					onClick={() => navigate("/", { replace: true })}
					size="sm"
					fontWeight="hairline"
					variant="outline"
				>
					<ChevronLeftIcon />
					Go Back
				</Button>
			</Box>
			<Box textAlign="center">
				<Heading fontSize="5xl" fontWeight="bold">
					Terms and Conditions
				</Heading>
				<Text color="gray">
					By continuing to use our platform, you agree to these terms
					and conditions.
				</Text>
			</Box>
			<Divider />
			<Box mt={5}>
				<Heading fontWeight="bold" fontSize="2xl">
					Billing & Refunds
				</Heading>
				<Text>
					- We charge you for access to the product in monthly and
					yearly plans.
				</Text>
				<Text>
					- Due to the nature of our product, we currently do not
					offer refunds, either partial or in full.
				</Text>
				<Text>
					- You can easily cancel your subscription at any time you
					like. We will no longer charge you anything once you cancel
					your subscription.
				</Text>
				<Text>
					- We may change our pricing, pricing policies, features and
					access restrictions at any time.
				</Text>
			</Box>

			<Box mt={5}>
				<Heading fontSize="2xl">Emails</Heading>
				<Text>
					- We may use your email to contact you about your account,
					product updates, and other marketing activities. You can
					unsubscribe from these emails at any time you like.
				</Text>
			</Box>

			<Box mt={5} mb={10}>
				<Heading fontSize="2xl">Conditions</Heading>
				<Text>
					- We reserve the right to change / amend the policy at any
					time.
				</Text>
				<Text>
					- By continuing to use our platform, you agree to these
					terms and conditions.
				</Text>
			</Box>

			<TrainChatbotNow />
			<Footer />
		</Box>
	);
};

export default TermsNConditions;
