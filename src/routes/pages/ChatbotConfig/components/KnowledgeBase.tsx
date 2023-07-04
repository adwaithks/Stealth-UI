import { EditIcon, ExternalLinkIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Text,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../../store/store";
import { retrainChatbot } from "../../../../store/reducers/chatbots.reducer";
import { useSelector } from "react-redux";
import { retrainChatbotApiStatusSelector } from "../../../../store/selectors/chatbots.selector";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const KnowledgeBase: React.FC<{ base: string; chatbotId: number }> = ({
	base,
	chatbotId,
}) => {
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [chatbotKnowledge, setChatbotKnowledge] = useState(base);
	const { session } = useClerk();
	const navigate = useNavigate();

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
		if (
			window.confirm(
				"Are you sure you want to retrain the chatbot with latest changes in your knowledge base?"
			)
		)
			session
				?.getToken({ template: "stealth-token-template" })
				.then((token) => {
					if (!token) {
						navigate("/");
						return;
					}
					setIsDisabled(true);
					dispatch(
						retrainChatbot({
							chatbotId,
							knowledgeBase: chatbotKnowledge,
							token,
						})
					)
						.then(() => {
							setChatbotKnowledge(chatbotKnowledge);
						})
						.catch(() => {
							setChatbotKnowledge(base);
						});
				})
				.catch(() => {
					navigate("/");
				});
	};

	const { isOpen, onClose, onToggle } = useDisclosure();

	return (
		<Box>
			<Modal isCentered size="full" isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					<ModalHeader>
						<Box>
							<Text fontSize="lg" fontWeight="bold">
								Knowledge Base{" "}
								<Button size="sm" onClick={onToggle}>
									Collapse
								</Button>
							</Text>
							<Text
								fontSize="md"
								fontWeight="normal"
								sx={{ color: "gray" }}
							>
								Provide detailed information to enable precise
								and informative responses from Chatbot
							</Text>
						</Box>
					</ModalHeader>
					<ModalBody overflowY="auto" height="100%" width="100%">
						<Textarea
							ref={textAreaRef}
							value={chatbotKnowledge}
							onChange={(e) =>
								setChatbotKnowledge(e.target.value)
							}
							maxHeight="80vh"
							height="80vh"
							sx={{
								width: "100%",
								padding: "10px",
								lineHeight: "25px",
							}}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					mb: 5,
					alignItems: "center",
				}}
			>
				<Box>
					<Text
						sx={{ display: "flex", alignItems: "center" }}
						fontSize="lg"
						fontWeight="bold"
					>
						Knowledge Base{" "}
						<Button
							ml={2}
							size="sm"
							onClick={() => {
								setIsDisabled(false);
								onToggle();
							}}
						>
							Edit in full screen <ExternalLinkIcon ml={1} />
						</Button>
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
