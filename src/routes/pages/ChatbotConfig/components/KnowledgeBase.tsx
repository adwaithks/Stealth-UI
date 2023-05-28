import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const KnowledgeBase: React.FC<{ base: string }> = ({ base }) => {
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const textAreaRef = useRef<any>(null);

	useEffect(() => {
		if (!isDisabled && textAreaRef.current) {
			textAreaRef.current.focus();
		}
	}, [isDisabled]);

	return (
		<Box>
			<textarea
				ref={textAreaRef}
				disabled={isDisabled}
				style={{
					width: "100%",
					height: "300px",
					padding: "10px",
					lineHeight: "25px",
				}}
			>
				{base}
			</textarea>
			<Box
				sx={{
					display: "flex",
					mt: 5,
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box />
				<Box>
					<Button sx={{ mr: 2 }} onClick={() => setIsDisabled(false)}>
						{isDisabled ? "Edit Knowledge Base" : "Retrain Chatbot"}
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
		</Box>
	);
};

export default KnowledgeBase;
