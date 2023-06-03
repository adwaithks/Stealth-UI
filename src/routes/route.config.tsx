import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllChatbots from "./pages/AllChatbots/AllChatbots";
import RootLayout from "../components/RootLayout/RootLayout";
import ChatbotConfig from "./pages/ChatbotConfig/ChatbotConfig";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Landing from "./pages/Landing/Landing";

const RouteConfig: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RootLayout />}>
					<Route
						index
						element={
							<>
								<SignedIn>
									<Navigate to="/app" replace />
								</SignedIn>
								<SignedOut>
									<Landing />
								</SignedOut>
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
						path="configure/:id"
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
