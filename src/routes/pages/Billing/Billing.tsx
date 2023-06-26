import { Box, Divider, Skeleton, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getMySubscriptionApi } from "../../../api/subscriptions.api";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import BillCard from "./components/BillCard";
import { subscriptionPlans } from "../../../utils/subscriptionPlans";

const Billing: React.FC = () => {
	const { session } = useClerk();
	const navigate = useNavigate();

	const [currentSubscription, setCurrentSubscription] = useState<
		object | null
	>(null);
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
						console.log("getmysubapi", data);
						setCurrentSubscription(data);
					})
					.catch(() => {
						setCurrentSubscription(null);
					})
					.finally(() => {
						setIsLoading(false);
					});
			});
	}, [navigate, session]);

	return (
		<Box>
			<Box sx={{ mb: 5 }}>
				<Text fontSize="2xl" fontWeight="bold">
					Subscriptions & Billing Info
				</Text>
				<Text sx={{ color: "gray" }}>
					Subscribe and Unsubscribe from plans in just seconds
				</Text>
				<Divider />
			</Box>

			{isLoading && (
				<Stack>
					<Skeleton
						startColor="lightgray"
						endColor="gray.100"
						height="220px"
						rounded="base"
					/>
				</Stack>
			)}

			<Box sx={{ display: "flex", gap: 5 }}>
				{!isLoading &&
					subscriptionPlans.map((plan) => {
						return (
							<BillCard
								currentSubscription={currentSubscription}
								id={plan.id}
								name={plan.name}
								price={plan.recurringPrice["INR"]}
								type={plan.billingType}
							/>
						);
					})}
			</Box>
		</Box>
	);
};

export default Billing;
