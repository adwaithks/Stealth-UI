import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import ChatbotCard from "./components/ChatbotCard";
import { AddIcon } from "@chakra-ui/icons";
import { getMyChatbots } from "../../../store/reducers/chatbots.reducer";
import {
	getMyChatbotsApiStatusSelector,
	myChatbotsSelector,
} from "../../../store/selectors/chatbots.selector";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import AllChatbotsSkeleton from "./components/AllChatbotsSkeleton";
import Tickets from "../Tickets/Tickets";

const AllChatbots = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const getMyChatbotsApiStatus = useSelector(getMyChatbotsApiStatusSelector);
	const chatbots = useSelector(myChatbotsSelector);
	const { session } = useClerk();

	useEffect(() => {
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}

				dispatch(getMyChatbots(token));
			});
	}, [dispatch, navigate, session]);

	return (
		<Box>
			<Box sx={{ overflow: "hidden", height: "calc((100vh - 65px)/2)" }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Box>
						<Text
							sx={{ mb: -0.5 }}
							fontSize="3xl"
							fontWeight="bold"
						>
							Your Chatbots
						</Text>
						<Text fontSize="sm" color="gray">
							Explore and manage your created chatbots
						</Text>
					</Box>
					<Button
						_hover={{
							opacity: 0.6,
						}}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							navigate("/app/createbot");
							// setCreateNewChatbotModalIsOpen(true);
						}}
						sx={{ backgroundColor: "black", color: "white" }}
						variant="solid"
					>
						<AddIcon sx={{ mr: 2 }} />
						Create New Chatbot
					</Button>
				</Box>

				<Divider sx={{ mb: 5 }} orientation="horizontal" />

				<Box
					sx={{
						overflowY: "auto",
						height: "calc((100vh - 270px)/2)",
					}}
				>
					{getMyChatbotsApiStatus === "pending" && (
						<AllChatbotsSkeleton />
					)}
					{getMyChatbotsApiStatus === "fulfilled" &&
						chatbots.length === 0 && (
							<Text fontSize="xl" fontWeight="black" color="gray">
								You don't have any chatbots. Create one 🚀
							</Text>
						)}
					{getMyChatbotsApiStatus === "fulfilled" &&
						chatbots.map(
							({
								chatbotName,
								creationDate,
								status,
								chatbotId,
								domains,
								trainStatus,
								primaryBgColor,
							}) => {
								return (
									<ChatbotCard
										key={chatbotId}
										id={chatbotId}
										trainStatus={trainStatus}
										name={chatbotName}
										creationDate={creationDate}
										status={status}
										primaryBgColor={primaryBgColor}
										domains={domains}
									/>
								);
							}
						)}
				</Box>
			</Box>
			<Tickets />
		</Box>
	);
};

export default AllChatbots;
