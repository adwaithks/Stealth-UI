import React, { useEffect, useState } from "react";
import { getMySubscriptionApi } from "../../api/subscriptions.api";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";

const IsSubscribed: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { session } = useClerk();
	const navigate = useNavigate();
	const [subscription, setSubscription] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}
				getMySubscriptionApi(token)
					.then((data) => {
						setSubscription(data);
					})
					.catch(() => {
						setSubscription(null);
					})
					.finally(() => {
						setIsLoading(false);
					});
			})
			.catch(() => {
				setSubscription(null);
			})
			.finally(() => {
				if (isLoading) setIsLoading(false);
			});
	}, [isLoading, navigate, session]);

	return (
		<Box>
			{isLoading && (
				<Box
					sx={{
						height: "100vh",
						width: "100%",
						display: "flex",
						position: "absolute",
						zIndex: 20,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Spinner />
				</Box>
			)}
			{!isLoading && subscription && children}
		</Box>
	);
};

export default IsSubscribed;
