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
						Information we collect
					</Heading>
					<Text mb={5}>
						Personal Information: When you use the Platform, we may
						collect certain personal information you provide
						voluntarily, including email address and any other
						information you choose to provide. We utilize{" "}
						<a
							style={{ textDecoration: "underline" }}
							target="_blank"
							href="https://clerk.com"
						>
							Clerk.com
						</a>
						, a third-party user management service, to handle user
						registration and authentication. As part of this
						process, we only store the email addresses and user IDs
						associated with users in our database. We do not store
						other personally identifiable information (PII) or
						sensitive data in our database.{" "}
						<a
							style={{ textDecoration: "underline" }}
							target="_blank"
							href="https://clerk.com"
						>
							Clerk.com
						</a>{" "}
						is responsible for securely managing and storing the
						user account information, including usernames,
						passwords, and other user profile details. We have
						chosen{" "}
						<a
							style={{ textDecoration: "underline" }}
							target="_blank"
							href="https://clerk.com"
						>
							Clerk.com
						</a>{" "}
						for its robust security measures and commitment to
						protecting user data. Please note that we do not have
						access to your passwords or any other sensitive
						information stored by{" "}
						<a
							style={{ textDecoration: "underline" }}
							target="_blank"
							href="https://clerk.com"
						>
							Clerk.com
						</a>
						. We rely on{" "}
						<a
							style={{ textDecoration: "underline" }}
							target="_blank"
							href="https://clerk.com"
						>
							Clerk.com
						</a>
						's infrastructure and protocols to ensure the privacy
						and security of your account details.
					</Text>
					<Text mb={5}>
						Usage of Data: We may collect information about the
						conversations between the AI Bot and the customers,
						which is a feature of our product.
					</Text>
					<Text mb={5}>
						Log Data: Our servers automatically collect certain
						information when you access or use the Platform and this
						may include your IP address, browser type, operating
						system, referring URLs, access times, and other similar
						data.
					</Text>
					<Text mb={5}>
						User tracking: We will attach the following cookie to
						track each of your customers and their chats during the
						session. Cookie Name: ASSISTDESK_CHATBOT. Kindly request
						this permission in your website or product where you are
						embedding the chatbot (if applicable).
					</Text>
				</Box>

				<Box mb={5}>
					<Heading mb={2} fontWeight="bold" fontSize="2xl">
						How we use your information
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
						communicate with you, about using the Platform, respond
						to your inquiries, and send important notices or
						updates.
					</Text>
					<Text mb={5}>
						Analytics and Aggregated Data: We may anonymize and
						aggregate your information with data from other users
						for statistical and analytical purposes to improve the
						Platform and enhance our services.
					</Text>
					<Text mb={5}>
						Open AI: We primarily rely on OpenAI for reply
						generation to customer enquiry via our chatbot and
						knowledge base creation. Therefore, we strongly urge you
						not to put anything confidential in your knowledge base
						(You will be able to edit the knowledge base manually
						from the dashboard).
					</Text>
				</Box>

				<Box mb={5}>
					<Heading mb={2} fontWeight="bold" fontSize="2xl">
						Information sharing and disclosure
					</Heading>
					<Text mb={5}>
						Service Providers: We may share your personal
						information with third-party service providers that help
						us deliver and improve the Platform.
					</Text>
					<Text mb={5}>
						Payment Providers: We use{" "}
						<a
							style={{ textDecoration: "underline" }}
							target="_blank"
							href="https://paddle.com"
						>
							Paddle.com
						</a>{" "}
						to integrate recurring subscriptions to our platform. We
						do not store any confidential payment information like
						card number etc, other than the information related to
						your subscription, which is required for the proper
						functioning of our platform.
					</Text>
					<Text>
						Kindly ensure that you have obtained any required
						consents or permissions for collecting and using
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
						please don't hesitate to get in touch with us at{" "}
						<a
							style={{
								textDecoration: "underline",
							}}
							href="mailto:official@assistdesk.in"
						>
							official@assistdesk.in
						</a>
					</Text>
				</Box>
			</Box>

			<Footer />
		</Box>
	);
};

export default Privacy;
