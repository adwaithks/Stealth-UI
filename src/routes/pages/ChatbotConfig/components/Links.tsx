import { Badge, Box, Button, Skeleton, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { currentChatbotSelector } from "../../../../store/selectors/chatbots.selector";
import { BASE_URL } from "../../../../api/baseURL";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { RepeatIcon } from "@chakra-ui/icons";

const Links: React.FC = () => {
	const currentChatbot = useSelector(currentChatbotSelector);
	const { session } = useClerk();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [stopRetry, setStopRetry] = useState(false);
	const [links, setLinks] = useState<{ [key: string]: string } | null>(null);

	const getLinksForChatbot = useCallback(async () => {
		session
			?.getToken({ template: "stealth-token-template" })
			.then(async (token) => {
				if (!token) {
					navigate("/");
					return;
				}
				// eslint-disable-next-line no-useless-catch
				try {
					const res = await fetch(
						BASE_URL +
							`/api/v2/chatbot/${currentChatbot.chatbotId}/links/trainstatus`,
						{
							headers: {
								"Content-Type": "application/json",
								"STEALTH-ACCESS-TOKEN": token,
							},
						}
					);
					const data = await res.json();
					console.log({ data });
					let counter = true;
					Object.values(data.message).forEach((status) => {
						if (
							status != "TRAINING_PENDING" &&
							status != "RETRAINING_PENDING"
						) {
							counter = false;
						}
					});
					if (!counter) {
						setStopRetry(true);
					}
					setLinks(data.message);
				} catch (err) {
					throw err;
				}
			});
	}, [currentChatbot.chatbotId, navigate, session]);

	useEffect(() => {
		let timer: number;

		if (isLoading) {
			getLinksForChatbot()
				.catch((err) => {
					setLinks(null);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			if (!stopRetry) {
				timer = setTimeout(() => {
					getLinksForChatbot()
						.catch((err) => {
							setLinks(null);
						})
						.finally(() => {
							setIsLoading(false);
						});
				}, 3000);
			}
		}

		return () => {
			clearTimeout(timer);
		};
	}, [isLoading, getLinksForChatbot, stopRetry]);

	function getStatusObject(status: string) {
		switch (status) {
			case "TRAINING_PENDING":
				return { text: "Training Pending", color: "orange" };
			case "TRAINING_REJECTED":
				return { text: "Training Rejected", color: "red" };
			case "TRAINING_SUCCESS":
				return { text: "Training Success", color: "green" };
			case "RETRAINING_PENDING":
				return { text: "Retraining Pending", color: "orange" };
			case "RETRAINING_REJECTED":
				return { text: "Retraining Rejected", color: "red" };
			case "RETRAINING_SUCCESS":
				return { text: "Retraining Success", color: "green" };
			default:
				return { text: "Fetching Status...", color: "orange" };
		}
	}

	return (
		<Box>
			<Box sx={{ mb: 5 }}>
				<Text fontSize="lg" fontWeight="bold">
					Training Links
				</Text>
				<Text sx={{ color: "gray" }}>
					Links that you trained your chatbot on. Retrain them as you
					like!
				</Text>
			</Box>

			<Box>
				{!links && isLoading && (
					<Skeleton
						startColor="lightgray"
						endColor="gray.100"
						height="160px"
						rounded="base"
					/>
				)}

				{links &&
					Object.entries(links)?.map(([link, status]) => {
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
										colorScheme={
											getStatusObject(status).color
										}
										ml={2}
									>
										{getStatusObject(status).text}
									</Badge>
								</Box>
								<Box ml={5}>
									<Button size="sm">
										<RepeatIcon mr={1} />
										Retrain
									</Button>
								</Box>
							</Box>
						);
					})}
			</Box>
		</Box>
	);
};

export default Links;
