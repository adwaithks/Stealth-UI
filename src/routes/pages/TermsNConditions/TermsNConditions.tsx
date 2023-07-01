import {
	Box,
	Button,
	Divider,
	Heading,
	Text,
	useMediaQuery,
} from "@chakra-ui/react";
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

	const [isMobile] = useMediaQuery("(max-width: 768px)");

	const navigate = useNavigate();

	return (
		<Box
			sx={{
				mx: 2,
			}}
		>
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
			<Box
				sx={{
					width: isMobile ? "100%" : "90%",
					mx: {
						md: 10,
						base: 3,
					},
				}}
			>
				<Box mt={5}>
					<Heading mb={2} fontWeight="bold" fontSize="2xl">
						Billing & Refunds
					</Heading>
					<Text mb={5}>
						Subscription Charges: Currently we offer only one
						monthly plan. We are working on new subscription plans
						with access to more features.
					</Text>
					<Text mb={5}>
						Refunds: No refund of subscription charges, whether
						partial or in full.
					</Text>
					<Text mb={5}>
						Subscription Cancellation: You have the freedom to
						cancel your subscription at any time. Once you cancel,
						no refund is possible, even though the subscription is
						cancelled before the expiry of the plan.
					</Text>
					<Text mb={5}>
						Pricing and Policy Changes: We reserve the right to
						modify our pricing, pricing policies, features, and
						access restrictions at any time without further notice.
					</Text>
				</Box>

				<Box mt={5}>
					<Heading mb={2} fontSize="2xl">
						Contact
					</Heading>
					<Text mb={5}>
						Notifications on product updates, important announcement
						and other relevant information will be communicated to
						the email IDs provided by the subscribers.
					</Text>
					<Text mb={5}>
						You have the option to unsubscribe from the
						Notifications at any time by following the instructions
						provided in the emails or by contacting our support
						team.
					</Text>
				</Box>

				<Box mt={5} mb={10}>
					<Heading mb={2} fontSize="2xl">
						Conditions
					</Heading>
					<Text mb={5}>
						Policy Amendments: We reserve the right to change or
						amend the policies at any time without prior notice. Any
						modifications will be effective immediately upon posting
						the updated policy on our website. Please read the
						company policies before subscribing our services.
					</Text>
					<Text mb={5}>
						Agreement to Terms and Conditions: By continuing to use
						our platform, you agree to abide by and be bound by
						these terms and conditions.
					</Text>
				</Box>
			</Box>

			<TrainChatbotNow />
			<Footer />
		</Box>
	);
};

export default TermsNConditions;
