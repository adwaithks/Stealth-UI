import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllChatbots from "./pages/AllChatbots/AllChatbots";
import RootLayout from "../components/RootLayout/RootLayout";
import ChatbotConfig from "./pages/ChatbotConfig/ChatbotConfig";
import { SignedIn } from "@clerk/clerk-react";
import SignIn from "./pages/Auth/SignUp";

const RouteConfig: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RootLayout />}>
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
