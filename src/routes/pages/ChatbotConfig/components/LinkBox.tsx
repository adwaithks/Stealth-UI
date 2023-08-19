import {
	Badge,
	Box,
	Button,
	IconButton,
	Text,
	createStandaloneToast,
} from "@chakra-ui/react";
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
import { CloseIcon, RepeatIcon } from "@chakra-ui/icons";
import usePolling from "../../../../hooks/usePolling";
import { getStatusObject } from "../../../../utils/trainStatus";
import { deleteChatbotLinkApi } from "../../../../api/getChatbotById.api";

const LinkBox: React.FC<{
	link: string;
	status: string;
	linkId: number;
	taskId: string;
}> = ({ link, status, linkId, taskId }) => {
	const { session } = useClerk();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isMouseOver, setIsMouseOver] = useState(false);
	const currentChatbot = useSelector(currentChatbotSelector);
	const [isDeleting, setIsDeleting] = useState(false);

	const { toast } = createStandaloneToast();

	const { startPolling, stopPolling, data } = usePolling({
		stopFunction: (response: any) => {
			if (response.message === "RETRAINING_PENDING") {
				return false;
			}
			return true;
		},
		maxRetries: 10,
		delay: 3000,
	});

	useEffect(() => {
		if (status && status === "RETRAINING_REJECTED") {
			setIsLoading(false);
		}
		if (data) {
			dispatch(
				chatbotsActions.updateLinkStatus({
					linkId,
					trainStatus: data.message,
				})
			);
			if (
				data.message === "RETRAINING_REJECTED" ||
				data.message === "RETRAINING_SUCCESS"
			) {
				setIsLoading(false);
			}
		}
	}, [data, dispatch, linkId, status]);

	useEffect(() => {
		if (status === "RETRAINING_PENDING") {
			startPolling(`/api/v2/link/${linkId}/${taskId}/status`);
		}
	}, [status, startPolling, linkId, taskId]);

	const retrainHandler = (link: string) => {
		if (
			window.confirm(
				"Are you sure you want to retrain the chatbot on this link ?"
			)
		)
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

	const forgetLinkHandler = () => {
		if (
			window.confirm(
				"Are you sure you want to delete this link ? Your chatbot will forget all the contents trained from this link."
			)
		)
			session
				?.getToken({ template: "stealth-token-template" })
				.then(async (token) => {
					if (!token) {
						navigate("/");
						return;
					}
					setIsDeleting(true);
					deleteChatbotLinkApi({
						token,
						linkId,
						chatbotId: currentChatbot.chatbotId,
						chatbotHashId: currentChatbot.chatbotHashId,
						link,
					})
						.then(() => {
							dispatch(
								chatbotsActions.removeChatbotLink({
									linkId,
								})
							);
							toast({
								title: "Success",
								description: "Link deleted successfully!",
								status: "success",
								duration: 4000,
								isClosable: true,
								variant: "left-accent",
							});
						})
						.catch(() => {
							toast({
								title: "Something went wrong",
								description: "Failed to delete link!",
								status: "error",
								duration: 4000,
								isClosable: true,
								variant: "left-accent",
							});
						})
						.finally(() => {
							setIsDeleting(false);
						});
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
			onMouseEnter={() => setIsMouseOver(true)}
			onMouseLeave={() => setIsMouseOver(false)}
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
					mr={2}
					onClick={() => {
						retrainHandler(link);
					}}
					isDisabled={
						currentChatbot.trainStatus === "TRAINING_PENDING"
					}
					isLoading={
						isDeleting ||
						isLoading ||
						!!currentChatbot.links.find(
							({ linkId: id, trainStatus }) =>
								linkId === id &&
								trainStatus === "RETRAINING_PENDING"
						)
					}
					loadingText={isDeleting ? "Deleting" : "Retraining"}
					size="sm"
				>
					<RepeatIcon mr={1} />
					Retrain
				</Button>
				{isMouseOver && (
					<IconButton
						isLoading={isDeleting}
						isDisabled={
							currentChatbot.trainStatus === "TRAINING_PENDING" ||
							!!currentChatbot.links.find(
								({ linkId: id, trainStatus }) =>
									linkId === id &&
									trainStatus === "RETRAINING_PENDING"
							)
						}
						onClick={forgetLinkHandler}
						icon={<CloseIcon />}
						aria-label="forget-link"
						size="sm"
						variant="outline"
					/>
				)}
			</Box>
		</Box>
	);
};

export default LinkBox;
