import { Box, Divider, Skeleton, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
	getMySubscriptionApi,
	getMySubscriptionInfoApi,
} from "../../../api/subscriptions.api";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import BillCard from "./components/BillCard";
import { subscriptionPlans } from "../../../utils/subscriptionPlans";
import SubscriptionInfo from "./components/SubscriptionInfo";

const Billing: React.FC = () => {
	const { session } = useClerk();
	const navigate = useNavigate();

	const [currentSubscription, setCurrentSubscription] = useState<
		object | null
	>(null);
	const [subscriptionInfo, setSubscriptionInfo] = useState(null);
	const [currentSubscriptionIsLoading, setCurrentSubscriptionIsLoading] =
		useState(true);
	const [subscriptionInfoIsLoading, setSubscriptionInfoIsLoading] =
		useState(true);

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
						setCurrentSubscription(data);
					})
					.catch(() => {
						setCurrentSubscription(null);
					})
					.finally(() => {
						setCurrentSubscriptionIsLoading(false);
					});
				getMySubscriptionInfoApi(token)
					.then((data) => {
						setSubscriptionInfo(data);
					})
					.catch(() => setSubscriptionInfo(null))
					.finally(() => {
						setSubscriptionInfoIsLoading(false);
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
			{
				<>
					<Text fontWeight="bold" fontSize="xl">
						Your Active Plan
					</Text>
					<Text color="gray">
						Subscription plan that you are subscribed to.
					</Text>
					{subscriptionInfoIsLoading && (
						<Stack>
							<Skeleton
								startColor="lightgray"
								endColor="gray.100"
								height="220px"
								rounded="base"
							/>
						</Stack>
					)}
					{!subscriptionInfoIsLoading && subscriptionInfo && (
						<SubscriptionInfo info={subscriptionInfo} />
					)}
					{!subscriptionInfoIsLoading && subscriptionInfo == null && (
						<Text>You are not subscribed to our plan</Text>
					)}
					<Divider my={5} />
				</>
			}

			<Box sx={{ gap: 5 }}>
				<Text fontWeight="bold" fontSize="xl">
					Available Subscription Plans
				</Text>
				<Text color="gray">
					Subscription plan that you are subscribed to.
				</Text>
				{currentSubscriptionIsLoading && (
					<Stack>
						<Skeleton
							startColor="lightgray"
							endColor="gray.100"
							height="220px"
							rounded="base"
						/>
					</Stack>
				)}
				{!currentSubscriptionIsLoading &&
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
