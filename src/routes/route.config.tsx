import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllChatbots from "./pages/AllChatbots/AllChatbots";
import RootLayout from "../components/RootLayout/RootLayout";
import ChatbotConfig from "./pages/ChatbotConfig/ChatbotConfig";

const RouteConfig: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RootLayout />}>
					<Route path="app" element={<AllChatbots />} />
					<Route path="configure/:id" element={<ChatbotConfig />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RouteConfig;
