import { EditIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const KnowledgeBase: React.FC<{ base: string }> = ({ base }) => {
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [chatbotKnowledge, setChatbotKnowledge] = useState(base);
	const textAreaRef = useRef<any>(null);

	useEffect(() => {
		if (!isDisabled && textAreaRef.current) {
			textAreaRef.current.focus();
		}
		setChatbotKnowledge(base);
	}, [isDisabled, base]);

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
					<Button sx={{ mr: 2 }} onClick={() => setIsDisabled(false)}>
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
