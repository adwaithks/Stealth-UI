import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllChatbots from "./pages/AllChatbots/AllChatbots";
import RootLayout from "../components/RootLayout/RootLayout";
import ChatbotConfig from "./pages/ChatbotConfig/ChatbotConfig";
import { SignedIn, useClerk } from "@clerk/clerk-react";
import SignIn from "./pages/Auth/SignUp";
import Landing from "./pages/Landing/Landing";

const RouteConfig: React.FC = () => {
	const { session } = useClerk();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RootLayout />}>
					{session ? (
						<Route index element={<Navigate to="/app" />} />
					) : (
						<Route index element={<Landing />} />
					)}
					<Route
						path="app"
						element={
							<SignedIn>
								<AllChatbots />
							</SignedIn>
						}
					/>
					<Route
						path="configure/:id"
						element={
							<SignedIn>
								<ChatbotConfig />
							</SignedIn>
						}
					/>
					<Route path="/signin" element={<SignIn />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RouteConfig;
