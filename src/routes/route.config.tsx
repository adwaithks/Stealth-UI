import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllChatbots from "./pages/AllChatbots/AllChatbots";
import RootLayout from "../components/RootLayout/RootLayout";
import ChatbotConfig from "./pages/ChatbotConfig/ChatbotConfig";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Landing from "./pages/Landing/Landing";
import CreateNewChatbot from "./pages/CreateNewChatbot/CreateNewChatbot";
import Chats from "./pages/Chats/Chats";
import TermsNConditions from "./pages/TermsNConditions/TermsNConditions";
import Pricing from "./pages/Pricing/Pricing";
import CSignIn from "./pages/Auth/SignIn";
import Contact from "./pages/Contact/Contact";
import Privacy from "./pages/Privacy/Privacy";
import Billing from "./pages/Billing/Billing";
import Tickets from "./pages/Tickets/Tickets";
import CSignUp from "./pages/Auth/SignUp";

const RouteConfig: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RootLayout />}>
					<Route index element={<Landing />} />

					<Route path="/terms" element={<TermsNConditions />} />

					<Route path="/pricing" element={<Pricing />} />

					<Route path="/contact" element={<Contact />} />

					<Route path="/privacy" element={<Privacy />} />

					<Route path="/signin" element={<CSignIn />} />

					<Route path="/signup*" element={<CSignUp />} />

					<Route
						path="app"
						element={
							<>
								<SignedIn>
									<AllChatbots />
								</SignedIn>
								<SignedOut>
									<Navigate to="/" replace />
								</SignedOut>
							</>
						}
					/>

					<Route
						path="tickets"
						element={
							<>
								<SignedIn>
									<Tickets />
								</SignedIn>
								<SignedOut>
									<Navigate to="/" replace />
								</SignedOut>
							</>
						}
					/>

					<Route
						path="billing"
						element={
							<>
								<SignedIn>
									<Billing />
								</SignedIn>
								<SignedOut>
									<Navigate to="/" replace />
								</SignedOut>
							</>
						}
					/>

					<Route
						path="/app/createbot"
						element={
							<>
								<SignedIn>
									<CreateNewChatbot />
								</SignedIn>
								<SignedOut>
									<Navigate to="/" replace />
								</SignedOut>
							</>
						}
					/>
					<Route
						path="/app/billing"
						element={
							<>
								<SignedIn>
									<Billing />
								</SignedIn>
								<SignedOut>
									<Navigate to="/" replace />
								</SignedOut>
							</>
						}
					/>
					<Route
						path="app/configure/:id"
						element={
							<>
								<SignedIn>
									<ChatbotConfig />
								</SignedIn>
								<SignedOut>
									<Navigate to="/" replace />
								</SignedOut>
							</>
						}
					/>

					<Route
						path="app/chats/:id"
						element={
							<>
								<SignedIn>
									<Chats />
								</SignedIn>
								<SignedOut>
									<Navigate to="/" replace />
								</SignedOut>
							</>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RouteConfig;
