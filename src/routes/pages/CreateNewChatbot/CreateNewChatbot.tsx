import { Box, Button, Divider, Input, Text } from "@chakra-ui/react";
import { useClerk } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createNewChatbotApiStatusSelector } from "../../../store/selectors/chatbots.selector";
import { useAppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { createNewChatbot } from "../../../store/reducers/chatbots.reducer";
import CrawlUrlSelection from "./components/CrawlUrlSelection";
import { crawlerActions } from "../../../store/reducers/crawler.reducer";

const CreateNewChatbot: React.FC = () => {
	const { session } = useClerk();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const createNewChatbotApiStatus = useSelector(
		createNewChatbotApiStatusSelector
	);
	const [chatbotName, setChatbotName] = useState("");
	const [checkedUrls, setCheckedUrls] = useState<string[]>([]);

	const handleUpdateCheckedUrls = (urls: string[]) => {
		setCheckedUrls(urls);
	};

	useEffect(() => {
		dispatch(crawlerActions.resetCrawlStates());
	}, [dispatch]);

	const createAndTrainNewChatbot = (name: string, checkedUrls: string[]) => {
		if (
			!window.confirm(
				`Are you sure you want to start training your chatbot based of contents in the selected pages ?`
			)
		)
			return;
		if (name.length === 0) {
			alert("Please provide a name for the chatbot!");
			return;
		}

		if (checkedUrls.length === 0) {
			alert("Select atleast one url to train");
			return;
		}
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}
				dispatch(
					createNewChatbot({ name, urls: checkedUrls, token })
				).then(() => {
					navigate("/app", { replace: true });
				});
			})
			.catch(() => {
				navigate("/");
			});
	};
	return (
		<Box>
			<Box sx={{ mb: 6 }}>
				<Box>
					<Text fontSize="2xl" fontWeight="bold">
						Create New Chatbot
					</Text>
					<Text color="gray">
						Train a whole new chatbot on your data
					</Text>
				</Box>
			</Box>

			<Box>
				<Text fontWeight="bold">Chatbot Name</Text>
				<Text sx={{ mb: 1 }} color="gray">
					Name of your Chatbot (You can change this later)
				</Text>
				<Input
					width={400}
					required
					value={chatbotName}
					onChange={(e) => setChatbotName(e.target.value)}
					placeholder="Eg: stealth bot"
				/>
			</Box>
			<Divider sx={{ my: 3 }} orientation="horizontal" />

			<CrawlUrlSelection
				checkedUrls={checkedUrls}
				handleUpdateCheckedUrls={handleUpdateCheckedUrls}
			/>

			<Box
				sx={{
					backgroundColor: "white",
					py: 4,
					width: "100%",
					position: "fixed",
					bottom: 0,
					zIndex: 2,
				}}
			>
				<Button
					color="white"
					onClick={() =>
						createAndTrainNewChatbot(chatbotName, checkedUrls)
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
