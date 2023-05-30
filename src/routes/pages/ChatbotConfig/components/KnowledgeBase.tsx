import { EditIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../../store/store";
import { retrainChatbot } from "../../../../store/reducers/chatbots.reducer";
import { useSelector } from "react-redux";
import { retrainChatbotApi } from "../../../../api/retrainChatbot.api";
import { retrainChatbotApiStatusSelector } from "../../../../store/selectors/chatbots.selector";

const KnowledgeBase: React.FC<{ base: string; chatbotId: number }> = ({
	base,
	chatbotId,
}) => {
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [chatbotKnowledge, setChatbotKnowledge] = useState(base);

	const textAreaRef = useRef<any>(null);

	const dispatch = useAppDispatch();
	const retrainChatbotApiStatus = useSelector(
		retrainChatbotApiStatusSelector
	);

	useEffect(() => {
		if (!isDisabled && textAreaRef.current) {
			textAreaRef.current.focus();
		}
		setChatbotKnowledge(base);
	}, [isDisabled, base]);

	const handleRetrainChatbot = () => {
		setIsDisabled(true);
		console.log({ chatbotId, chatbotKnowledge });
		dispatch(
			retrainChatbot({ chatbotId, knowledgeBase: chatbotKnowledge })
		).catch(() => {
			setChatbotKnowledge(base);
		});
	};

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					mb: 5,
					alignItems: "center",
				}}
			>
				<Box>
					<Text fontSize="lg" fontWeight="bold">
						Knowledge Base
					</Text>
					<Text sx={{ color: "gray" }}>
						Provide detailed information to enable precise and
						informative responses from Chatbot
					</Text>
				</Box>
				<Box>
					<Button
						sx={{ mr: 2 }}
						isLoading={retrainChatbotApiStatus === "pending"}
						loadingText="Retraining Chatbot..."
						onClick={() => {
							setIsDisabled(false);
							if (!isDisabled) {
								handleRetrainChatbot();
							}
						}}
					>
						{isDisabled ? (
							<EditIcon sx={{ mr: 2 }} />
						) : (
							<RepeatClockIcon sx={{ mr: 2 }} />
						)}
						{isDisabled
							? "Edit Knowledge Base"
							: base.length === 0
							? "Train Chatbot"
							: "Retrain Chatbot"}
					</Button>
					{!isDisabled && (
						<Button
							disabled={retrainChatbotApiStatus === "pending"}
							colorScheme="red"
							onClick={() => setIsDisabled(true)}
						>
							Cancel
						</Button>
					)}
				</Box>
			</Box>
			<textarea
				ref={textAreaRef}
				disabled={isDisabled}
				value={chatbotKnowledge}
				onChange={(e) => setChatbotKnowledge(e.target.value)}
				style={{
					width: "100%",
					height: "300px",
					padding: "10px",
					lineHeight: "25px",
				}}
			/>
		</Box>
	);
};

export default KnowledgeBase;
