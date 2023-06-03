import { Box, Button, Divider, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ChatbotCard from "./components/ChatbotCard";
import { AddIcon } from "@chakra-ui/icons";
import {
	createNewChatbot,
	getMyChatbots,
} from "../../../store/reducers/chatbots.reducer";
import {
	createNewChatbotApiStatusSelector,
	getMyChatbotsApiStatusSelector,
	myChatbotsSelector,
} from "../../../store/selectors/chatbots.selector";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import CreateNewChatbotModal from "./components/CreateNewChatbotModal";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import AllChatbotsSkeleton from "./components/AllChatbotsSkeleton";

const AllChatbots = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const getMyChatbotsApiStatus = useSelector(getMyChatbotsApiStatusSelector);
	const chatbots = useSelector(myChatbotsSelector);
	const { session } = useClerk();

	const createNewChatbotApiStatus = useSelector(
		createNewChatbotApiStatusSelector
	);

	const [createNewChatbotModalIsOpen, setCreateNewChatbotModalIsOpen] =
		useState(false);
	const [chatbotName, setChatbotName] = useState("");
	const [chatbotKnowledge, setChatbotKnowledge] = useState("");

	const createAndTrainNewChatbot = (name: string, knowledgeBase: string) => {
		if (name.length === 0) {
			alert("Please provide a name for the chatbot!");
			return;
		}
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/signin");
					return;
				}
				dispatch(createNewChatbot({ name, knowledgeBase, token })).then(
					() => {
						setCreateNewChatbotModalIsOpen(false);
						navigate("/app");
					}
				);
			})
			.catch(() => {
				navigate("/signin");
			});
	};

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
			<CreateNewChatbotModal
				isOpen={createNewChatbotModalIsOpen}
				isLoading={createNewChatbotApiStatus === "pending"}
				onClose={() => setCreateNewChatbotModalIsOpen(false)}
				onSuccess={() =>
					createAndTrainNewChatbot(chatbotName, chatbotKnowledge)
				}
				title="Create New Chatbot"
				primaryActionText="Create & Train New Chatbot"
				secondaryActionText="Cancel"
			>
				<Box sx={{ mb: 5 }}>
					<Text fontWeight="bold">Chatbot Name</Text>
					<Text sx={{ mb: 1 }} color="gray">
						Name of your Chatbot (You can change this later)
					</Text>
					<Input
						required
						value={chatbotName}
						onChange={(e) => setChatbotName(e.target.value)}
						placeholder="Eg: stealth bot"
					/>
				</Box>
				<Divider sx={{ my: 5 }} orientation="horizontal" />
				<Box>
					<Text fontWeight="bold">Chatbot Knowledge Base</Text>
					<Text sx={{ mb: 1 }} color="gray">
						Provide a detailed information about company and product
						related information here. (You can edit later on)
						<span>
							<Text color="red" fontWeight="bold">
								(Please do not include anything confidential!)
							</Text>
						</span>
					</Text>

					<textarea
						required
						value={chatbotKnowledge}
						placeholder={`Example:
Company Name: Stealth Bot
Bio: ...
Products: ...
Services: ...
Pricing: ...
Timings: ...`}
						onChange={(e) => setChatbotKnowledge(e.target.value)}
						style={{
							border: "#CBD5E0 solid 1px",
							width: "100%",
							borderRadius: 5,
							height: "300px",
							padding: "10px",
							lineHeight: "25px",
						}}
					/>
				</Box>
			</CreateNewChatbotModal>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					mb: 5,
					justifyContent: "space-between",
				}}
			>
				<Box>
					<Text sx={{ mb: -0.5 }} fontSize="3xl" fontWeight="bold">
						Your Chatbots
					</Text>
					<Text fontSize="sm" color="gray">
						Explore and manage your created chatbots
					</Text>
				</Box>
				<Button
					onClick={() => setCreateNewChatbotModalIsOpen(true)}
					sx={{ backgroundColor: "black", color: "white" }}
					variant="solid"
				>
					<AddIcon sx={{ mr: 2 }} />
					Create New Chatbot
				</Button>
			</Box>

			<Divider sx={{ mb: 5 }} orientation="horizontal" />

			<Box>
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
							knowledgeBase,
							status,
							chatbotId,
							domains,
						}) => {
							return (
								<ChatbotCard
									key={chatbotId}
									id={chatbotId}
									name={chatbotName}
									knowledgeBase={knowledgeBase}
									creationDate={creationDate}
									status={status}
									domains={domains}
								/>
							);
						}
					)}
			</Box>
		</Box>
	);
};

export default AllChatbots;
