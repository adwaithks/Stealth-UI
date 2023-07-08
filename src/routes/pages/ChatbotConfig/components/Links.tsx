import { Box, Skeleton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { BASE_URL } from "../../../../api/baseURL";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import LinkBox from "./LinkBox";
import { Chatbot } from "../../../../types/chatbot.type";

const Links: React.FC<{ chatbot: Chatbot }> = ({ chatbot }) => {
	const { session } = useClerk();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [links, setLinks] = useState<
		{ id: number; link: string; status: string }[] | null
	>(null);

	useEffect(() => {
		if (Object.keys(chatbot).length > 0)
			session
				?.getToken({ template: "stealth-token-template" })
				.then(async (token) => {
					if (!token) {
						navigate("/");
						return;
					}
					try {
						const res = await fetch(
							BASE_URL +
								`/api/v2/chatbot/${chatbot.chatbotId}/links`,
							{
								headers: {
									"Content-Type": "application/json",
									"STEALTH-ACCESS-TOKEN": token,
								},
							}
						);
						const data = await res.json();
						setIsLoading(false);
						setLinks(data.message);
					} catch (err) {
						setLinks(null);
					}
				})
				.catch(() => {
					setLinks(null);
				});
	}, [chatbot.chatbotId, chatbot, navigate, session]);

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
					links?.map(({ link, status, id }) => {
						return (
							<LinkBox
								key={id}
								link={link}
								status={status}
								linkId={id}
							/>
						);
					})}
			</Box>
		</Box>
	);
};

export default Links;
