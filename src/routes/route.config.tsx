import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllChatbots from "./pages/AllChatbots/AllChatbots";
import RootLayout from "../components/RootLayout/RootLayout";
import ChatbotConfig from "./pages/ChatbotConfig/ChatbotConfig";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Landing from "./pages/Landing/Landing";
import CreateNewChatbot from "./pages/CreateNewChatbot/CreateNewChatbot";

const RouteConfig: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RootLayout />}>
					<Route
						index
						element={
							<>
								<Landing />
							</>
						}
					/>

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
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RouteConfig;
