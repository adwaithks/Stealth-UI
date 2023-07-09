import { Badge, Box, Button, Text } from "@chakra-ui/react";
import { useClerk } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/store";
import {
	chatbotsActions,
	retrainChatbot,
} from "../../../../store/reducers/chatbots.reducer";
import { useSelector } from "react-redux";
import { currentChatbotSelector } from "../../../../store/selectors/chatbots.selector";
import { RepeatIcon } from "@chakra-ui/icons";
import usePolling from "../../../../hooks/usePolling";
import { getStatusObject } from "../../../../utils/trainStatus";

const LinkBox: React.FC<{ link: string; status: string; linkId: number }> = ({
	link,
	status,
	linkId,
}) => {
	const { session } = useClerk();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const currentChatbot = useSelector(currentChatbotSelector);

	const { startPolling, data } = usePolling({
		endpoint: `/api/v2/chatbot/link/status`,
		stopFunction: (response: any) => {
			if (
				response.message === "TRAINING_PENDING" ||
				response.message === "RETRAINING_PENDING"
			) {
				return false;
			}
			return true;
		},
		options: {
			method: "POST",
			body: {
				link_id: linkId,
				link: link,
				chatbot_id: currentChatbot.chatbotId,
				chatbot_hash_id: currentChatbot.chatbotHashId,
			},
		},
		maxRetries: 7,
		delay: 1500,
	});

	useEffect(() => {
		if (data) {
			dispatch(
				chatbotsActions.updateLinkStatus({
					linkId,
					trainStatus: data.message,
				})
			);
		}

		if (!status.includes("PENDING")) {
			setIsLoading(false);
		}
	}, [linkId, status, dispatch, data]);

	useEffect(() => {
		if (status.includes("PENDING")) {
			startPolling();
		}
	}, [status, startPolling]);

	const retrainHandler = (link: string) => {
		session
			?.getToken({ template: "stealth-token-template" })
			.then(async (token) => {
				if (!token) {
					navigate("/");
					return;
				}

				dispatch(
					retrainChatbot({
						chatbotId: currentChatbot.chatbotId,
						chatbotHashId: currentChatbot.chatbotHashId,
						token,
						link,
						linkId,
					})
				);
				setIsLoading(true);
			});
	};

	return (
		<Box
			sx={{
				p: 1,
				borderBottom: "rgba(0,0,0,0.05) solid 1px",
				borderRadius: 5,
				mb: 2,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Text>{link}</Text>
				<Badge
					sx={{
						display: "flex",
						alignItems: "center",
					}}
					colorScheme={getStatusObject(status).color}
					ml={2}
				>
					{getStatusObject(status).text}
				</Badge>
			</Box>
			<Box ml={5}>
				<Button
					onClick={() => {
						retrainHandler(link);
					}}
					isLoading={isLoading}
					loadingText="Retraining"
					size="sm"
				>
					<RepeatIcon mr={1} />
					Retrain
				</Button>
			</Box>
		</Box>
	);
};

export default LinkBox;
