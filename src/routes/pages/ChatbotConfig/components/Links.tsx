import { Box, Button, Skeleton, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import LinkBox from "./LinkBox";
import { Chatbot } from "../../../../types/chatbot.type";
import AddNewLinks from "./AddNewLinks";
import { addNewLinks } from "../../../../store/thunks/getChatbotById.thunk";
import { useAppDispatch } from "../../../../store/store";
import usePolling from "../../../../hooks/usePolling";
import { chatbotsActions } from "../../../../store/reducers/chatbots.reducer";
import { useSelector } from "react-redux";
import { addNewLinksApiStatusSelector } from "../../../../store/selectors/chatbots.selector";

const Links: React.FC<{ chatbot: Chatbot }> = ({ chatbot }) => {
	const { session } = useClerk();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isAddingNewLinks, setIsAddingNewLinks] = useState(false);

	const addNewLinksApiStatus = useSelector(addNewLinksApiStatusSelector);

	const { startPolling, data } = usePolling({
		endpoint: `/api/v2/chatbot/${chatbot.chatbotId}/trainstatus`,
		stopFunction: (response: any) => {
			if (
				response.message === "TRAINING_PENDING" ||
				response.message === "RETRAINING_PENDING"
			) {
				return false;
			}

			return true;
		},
		maxRetries: 10,
		delay: 3000,
	});

	useEffect(() => {
		if (data) {
			dispatch(
				chatbotsActions.updateTrainStatus({
					chatbotId: chatbot.chatbotId,
					status: data.message,
				})
			);
		}

		if (data && !data.message.includes("PENDING")) {
			setIsAddingNewLinks(false);
			navigate(`/app/configure/${chatbot.chatbotId}`, { replace: true });
		}
	}, [data, dispatch, navigate, chatbot.chatbotId]);

	useEffect(() => {
		if (addNewLinksApiStatus === "fulfilled" && isAddingNewLinks) {
			startPolling();
		}
		if (addNewLinksApiStatus === "rejected") {
			setIsAddingNewLinks(false);
		}
	}, [isAddingNewLinks, addNewLinksApiStatus, startPolling]);

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
						chatbotHashId: chatbot.chatbotHashId,
						chatbotId: chatbot.chatbotId,
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
							!!chatbot.links?.find(
								({ trainStatus }) =>
									!!trainStatus.includes("PENDING")
							)
						}
						isLoading={isAddingNewLinks}
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

			<Box>
				{!chatbot.links && (
					<Skeleton
						startColor="lightgray"
						endColor="gray.100"
						height="160px"
						rounded="base"
					/>
				)}

				{chatbot.links?.map(({ link, trainStatus, linkId }) => {
					return (
						<LinkBox
							key={linkId}
							link={link}
							status={trainStatus}
							linkId={linkId}
						/>
					);
				})}
			</Box>
		</Box>
	);
};

export default Links;
