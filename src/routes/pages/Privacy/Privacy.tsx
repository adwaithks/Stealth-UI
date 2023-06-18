import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Privacy: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

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
					Privacy Policy
				</Heading>
				<Text color="gray">
					By continuing to use our platform, you agree to these terms
					and conditions.
				</Text>
			</Box>
			<Divider />
			<Box
				sx={{
					mt: 5,
					mx: {
						md: 10,
						base: 3,
					},
				}}
			>
				<Box mb={5}>
					<Heading mb={2} fontWeight="bold" fontSize="2xl">
						Information We Collect
					</Heading>
					<Text mb={5}>
						Personal Information: When you use the Platform, we may
						collect certain personal information that you provide
						voluntarily, email address and any other information you
						choose to provide.We utilize Clerk, a third-party user
						management service, to handle user registration and
						authentication. As part of this process, we only store
						the email addresses and user id associated with our
						users in our database. We do not store any other
						personally identifiable information (PII) or sensitive
						data in our database. Clerk is responsible for securely
						managing and storing the user account information,
						including usernames, passwords, and other user profile
						details. We have chosen Clerk for their robust security
						measures and commitment to protecting user data. Please
						note that we do not have access to your passwords or any
						other sensitive information stored by Clerk. We rely on
						Clerk's infrastructure and protocols to ensure the
						privacy and security of your account details.
					</Text>
					<Text mb={5}>
						Usage Data: We may collect information about the
						conversations happening between the bot and the
						customers, which is a feature of our product.
					</Text>
					<Text mb={5}>
						Log Data: Our servers automatically collect certain
						information when you access or use the Platform. This
						may include your IP address, browser type, operating
						system, referring URLs, access times, and other similar
						data.
					</Text>
					<Text mb={5}>
						User tracking: We will attach the following cookie to
						track each of your customer and their chats during the
						session. Cookie Name: ASSISTDESK_CHATBOT Kindly request
						this permission in your website or product where you are
						embedding the chatbot.
					</Text>
				</Box>

				<Box mb={5}>
					<Heading mb={2} fontWeight="bold" fontSize="2xl">
						How We Use Your Information
					</Heading>
					<Text mb={5}>
						To Provide and Improve the Platform: We use your
						personal information to operate, maintain, and enhance
						the Platform, including providing customer support,
						personalizing your experience, and developing new
						features.
					</Text>
					<Text mb={5}>
						Communication: We may use your personal information to
						communicate with you about your use of the Platform,
						respond to your inquiries, and send important notices or
						updates.
					</Text>
					<Text mb={5}>
						Analytics and Aggregated Data: We may anonymize and
						aggregate your information with data from other users
						for statistical and analytical purposes to improve the
						Platform and enhance our services.
					</Text>
					<Text mb={5}>
						Open AI: We are primarily relying on OpenAI for reply
						generation to customer enquiries via our chatbot and
						knowledge base creation. Therefore, we strongly urge you
						to not put anything confidential in your knowledge base
						(You will be able to manually edit the knowledge base).
					</Text>
				</Box>

				<Box mb={5}>
					<Heading mb={2} fontWeight="bold" fontSize="2xl">
						Information Sharing and Disclosure
					</Heading>
					<Text mb={5}>
						Service Providers: We may share your personal
						information with third-party service providers that help
						us deliver and improve the Platform.
					</Text>
					<Text mb={5}>
						Payment Providers: We use paddle to integrate recurring
						subscriptions on our platforms. We do not store any
						confidential payment information like card number etc,
						other than information related to your subscription
						which is required for the proper functioning of our
						platform.
					</Text>
					<Text>
						Kindly ensure that you have obtained any required
						consents or permissions for the collection and usage of
						customer chat data through the chatbot (if necessary).
					</Text>
				</Box>

				<Box mb={5}>
					<Heading mb={2} fontWeight="bold" fontSize="2xl">
						Data Security
					</Heading>
					<Text mb={5}>
						We implement reasonable security measures to protect
						your personal information from unauthorized access,
						alteration, disclosure, or destruction. However, please
						note that no method of transmission over the internet or
						electronic storage is 100% secure, and we cannot
						guarantee absolute security.
					</Text>
				</Box>

				<Box mb={5}>
					<Heading mb={2} fontWeight="bold" fontSize="2xl">
						Changes to this Privacy Policy
					</Heading>
					<Text mb={5}>
						We reserve the right to modify this Privacy Policy at
						any time. Any changes will be effective immediately upon
						posting the updated policy on the Platform. Your
						continued use of the Platform after any changes to this
						Privacy Policy constitutes your acceptance of such
						changes.
					</Text>
				</Box>

				<Box mb={5}>
					<Heading mb={2} fontWeight="bold" fontSize="2xl">
						Contact Us
					</Heading>
					<Text mb={5}>
						If you have any questions, concerns, or requests
						regarding this Privacy Policy or our privacy practices,
						please contact us at official@assistdesk.in
					</Text>
				</Box>
			</Box>

			<Footer />
		</Box>
	);
};

export default Privacy;
