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

const AllChatbots = () => {
	const dispatch = useAppDispatch();
	const getMyChatbotsApiStatus = useSelector(getMyChatbotsApiStatusSelector);
	const chatbots = useSelector(myChatbotsSelector);
	const createNewChatbotApiStatus = useSelector(
		createNewChatbotApiStatusSelector
	);

	const [createNewChatbotModalIsOpen, setCreateNewChatbotModalIsOpen] =
		useState(false);
	const [chatbotName, setChatbotName] = useState("");
	const [chatbotKnowledge, setChatbotKnowledge] = useState("");

	const createAndTrainNewChatbot = (name: string, knowledgeBase: string) => {
		dispatch(createNewChatbot({ name, knowledgeBase }));
	};

	useEffect(() => {
		dispatch(getMyChatbots());
	}, [dispatch]);

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
					<Text fontWeight="bold">
						Chatbot Knowledge Base (Optional, You can fill this
						later)
					</Text>
					<Text sx={{ mb: 1 }} color="gray">
						Provide a detailed information about company and product
						related information here (Please do not include anything
						confidential!)
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
				{getMyChatbotsApiStatus === "pending" && <Text>Loading</Text>}
				{getMyChatbotsApiStatus === "fulfilled" &&
					chatbots.map(
						({
							chatbotName,
							creationDate,
							knowledgeBase,
							status,
							chatbotId,
						}) => {
							return (
								<ChatbotCard
									key={chatbotId}
									id={chatbotId}
									name={chatbotName}
									knowledgeBase={knowledgeBase}
									creationDate={creationDate}
									status={status}
								/>
							);
						}
					)}
			</Box>
		</Box>
	);
};

export default AllChatbots;
