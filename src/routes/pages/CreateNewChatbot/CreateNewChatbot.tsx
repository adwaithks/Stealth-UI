import { Box, Button, Divider, Input, Text } from "@chakra-ui/react";
import { useClerk } from "@clerk/clerk-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createNewChatbotApiStatusSelector } from "../../../store/selectors/chatbots.selector";
import { useAppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { createNewChatbot } from "../../../store/reducers/chatbots.reducer";

const CreateNewChatbot: React.FC = () => {
	const { session } = useClerk();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const createNewChatbotApiStatus = useSelector(
		createNewChatbotApiStatusSelector
	);
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
						navigate("/app");
					}
				);
			})
			.catch(() => {
				navigate("/signin");
			});
	};
	return (
		<Box>
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
					onChange={(e) => {
						e.stopPropagation();
						setChatbotKnowledge(e.target.value);
					}}
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
			<Box>
				<Button
					color="white"
					onClick={() =>
						createAndTrainNewChatbot(chatbotName, chatbotKnowledge)
					}
					isLoading={createNewChatbotApiStatus === "pending"}
					loadingText="Training Chatbot..."
					backgroundColor="black"
					mr={3}
				>
					Train new chatbot
				</Button>
				<Button
					disabled={createNewChatbotApiStatus === "pending"}
					onClick={() => navigate("/app")}
					variant="outline"
				>
					Cancel
				</Button>
			</Box>
		</Box>
	);
};

export default CreateNewChatbot;
