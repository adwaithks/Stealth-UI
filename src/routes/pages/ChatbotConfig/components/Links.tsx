import { Box, Button, Skeleton, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import LinkBox from "./LinkBox";
import { ILink } from "../../../../types/chatbot.type";
import AddNewLinks from "./AddNewLinks";
import { addNewLinks } from "../../../../store/thunks/getChatbotById.thunk";
import { useAppDispatch } from "../../../../store/store";
import usePolling from "../../../../hooks/usePolling";
import { chatbotsActions } from "../../../../store/reducers/chatbots.reducer";
import { getChatbotLinksApi } from "../../../../api/getChatbotById.api";

const Links: React.FC<{
	chatbotId: number;
	trainStatus: string;
	chatbotHashId: string;
	taskId: string;
	links: ILink[];
}> = ({ chatbotId, trainStatus, chatbotHashId, links, taskId }) => {
	const { session } = useClerk();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isAddingNewLinks, setIsAddingNewLinks] = useState(false);
	const [isNewLinksLoading, setIsNewLinksLoading] = useState(false);

	const { startPolling, data } = usePolling({
		stopFunction: (response: any) => {
			if (response.message === "TRAINING_PENDING") {
				return false;
			}

			return true;
		},
		maxRetries: 10,
		delay: 5000,
	});

	useEffect(() => {
		if (data) {
			dispatch(
				chatbotsActions.updateTrainStatus({
					chatbotId: chatbotId,
					status: data.message,
				})
			);
		}

		if (
			data &&
			(data.message === "TRAINING_SUCCESS" ||
				data.message === "TRAINING_REJECTED")
		) {
			setIsAddingNewLinks(false);
			setIsNewLinksLoading(true);
			session
				?.getToken({ template: "stealth-token-template" })
				.then((token) => {
					if (!token) {
						navigate("/");
						return;
					}
					getChatbotLinksApi({
						token,
						chatbotId,
					})
						.then((data) => {
							if (data)
								dispatch(
									chatbotsActions.setChatbotLinks({
										links: data,
									})
								);
						})
						.finally(() => {
							setIsNewLinksLoading(false);
						});
				});
		}
	}, [data, dispatch, navigate, session, chatbotId]);

	useEffect(() => {
		if (trainStatus === "TRAINING_PENDING" && chatbotId && taskId) {
			startPolling(`/api/v2/chatbot/${chatbotId}/${taskId}/taskstatus`);
		}
	}, [trainStatus, startPolling, chatbotId, taskId]);

	const addNewLinksHandler = (links: string[]) => {
		session
			?.getToken({ template: "stealth-token-template" })
			.then(async (token) => {
				if (!token) {
					navigate("/");
					return;
				}
				dispatch(
					addNewLinks({
						token,
						links,
						chatbotHashId: chatbotHashId,
						chatbotId: chatbotId,
					})
				);
				setIsAddingNewLinks(true);
			});
	};

	const { isOpen, onClose, onToggle } = useDisclosure();

	return (
		<Box>
			<Box
				sx={{
					mb: 5,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box>
					<Text fontSize="lg" fontWeight="bold">
						Training Links
					</Text>
					<Text sx={{ color: "gray" }}>
						Links that you trained your chatbot on. Retrain them as
						you like!
					</Text>
				</Box>
				<Box>
					<Button
						color="white"
						bgColor="black"
						isDisabled={
							!!links?.find(
								({ trainStatus }) =>
									trainStatus &&
									trainStatus === "RETRAINING_PENDING"
							)
						}
						isLoading={
							isAddingNewLinks ||
							trainStatus === "TRAINING_PENDING"
						}
						loadingText="Training"
						onClick={onToggle}
					>
						Add new links
					</Button>
				</Box>
			</Box>

			<AddNewLinks
				onSuccess={addNewLinksHandler}
				isOpen={isOpen}
				onClose={onClose}
			/>
			{isNewLinksLoading && (
				<Skeleton
					startColor="lightgray"
					endColor="gray.100"
					height="150px"
					rounded="base"
				/>
			)}

			{!isNewLinksLoading && (
				<Box>
					{links?.map(({ link, trainStatus, taskId, linkId }) => {
						if (link)
							return (
								<LinkBox
									key={linkId}
									link={link}
									status={trainStatus}
									linkId={linkId}
									taskId={taskId}
								/>
							);
					})}
				</Box>
			)}
		</Box>
	);
};

export default Links;
