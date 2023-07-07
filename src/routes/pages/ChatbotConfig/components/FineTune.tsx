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
import {
	currentChatbotSelector,
	retrainChatbotApiStatusSelector,
	updateFineTuneApiStatusSelector,
} from "../../../../store/selectors/chatbots.selector";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { updateFineTune } from "../../../../store/thunks/getChatbotById.thunk";

const FineTune: React.FC<{ base: string; chatbotId: number }> = ({
	base,
	chatbotId,
}) => {
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [fineTuneKnowledge, setFineTuneKnowledge] = useState(base);
	const { session } = useClerk();
	const navigate = useNavigate();
	const currentChatbot = useSelector(currentChatbotSelector);

	const textAreaRef = useRef<any>(null);

	const dispatch = useAppDispatch();
	const fineTuneUpdateStatus = useSelector(updateFineTuneApiStatusSelector);

	useEffect(() => {
		if (!isDisabled && textAreaRef.current) {
			textAreaRef.current.focus();
		}
		setFineTuneKnowledge(base);
	}, [isDisabled, base]);

	const handleFineTuneUpdate = () => {
		if (
			window.confirm(
				"Are you sure you want to fine tune your chatbot with latest changes?"
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
						updateFineTune({
							chatbotId,
							chatbotHashId: currentChatbot.chatbotHashId,
							fineTune: fineTuneKnowledge,
							token,
						})
					)
						.then(() => {
							setFineTuneKnowledge(fineTuneKnowledge);
						})
						.catch(() => {
							setFineTuneKnowledge(base);
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
								Fine Tune{" "}
								<Button size="sm" onClick={onToggle}>
									Collapse
								</Button>
							</Text>
							<Text
								fontSize="md"
								fontWeight="normal"
								sx={{ color: "gray" }}
							>
								Fine tune your chatbot by providing extra
								information in natural language, so that your
								bot can shine on topics not seen!
							</Text>
						</Box>
					</ModalHeader>
					<ModalBody overflowY="auto" height="100%" width="100%">
						<Textarea
							ref={textAreaRef}
							value={fineTuneKnowledge}
							placeholder={`Eg: Always be welcoming.`}
							onChange={(e) =>
								setFineTuneKnowledge(e.target.value)
							}
							maxHeight="80vh"
							height="80vh"
							sx={{
								width: "100%",
								borderRadius: 5,
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
						Fine Tune{" "}
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
						Fine tune your chatbot by providing extra information in
						natural language, so that your bot can shine on topics
						not seen!
					</Text>
				</Box>
				<Box>
					<Button
						sx={{ mr: 2 }}
						isLoading={fineTuneUpdateStatus === "pending"}
						loadingText="Saving..."
						onClick={() => {
							setIsDisabled(false);
							if (!isDisabled) {
								handleFineTuneUpdate();
							}
						}}
					>
						{isDisabled ? (
							<EditIcon sx={{ mr: 2 }} />
						) : (
							<RepeatClockIcon sx={{ mr: 2 }} />
						)}
						{isDisabled ? "Edit Fine Tune" : "Fine Tune"}
					</Button>
					{!isDisabled && (
						<Button
							disabled={fineTuneUpdateStatus === "pending"}
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
				placeholder={`Eg: Always be welcoming.`}
				value={fineTuneKnowledge}
				onChange={(e) => setFineTuneKnowledge(e.target.value)}
				style={{
					width: "100%",
					height: "300px",
					borderRadius: 5,
					padding: "10px",
					lineHeight: "25px",
				}}
			/>
		</Box>
	);
};

export default FineTune;
