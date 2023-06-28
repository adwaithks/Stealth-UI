import { Badge, Box, Text } from "@chakra-ui/react";
import React from "react";
import { subscriptionPlanIdToName } from "../../../../utils/subscriptionPlans";

const SubscriptionInfo: React.FC<{ info: any }> = ({ info }) => {
	console.log({ info });
	return (
		<Box
			sx={{
				boxShadow: "0 0 2px lightgray",
				p: 2,
				mt: 1,
				width: "fit-content",
			}}
		>
			<Box>
				<Badge colorScheme="green">
					<Text fontSize="xl" fontWeight="bold">
						{subscriptionPlanIdToName[info.plan_id]}
					</Text>
				</Badge>
				<Badge ml={2} colorScheme="orange">
					#{info.plan_id}
				</Badge>
			</Box>
			<Box mb={2}>
				<Text color="gray">Signed up on {info.signup_date}</Text>
			</Box>
			<Box>
				<Badge>Last Payment</Badge>
				<Text sx={{ display: "flex", alignItems: "center" }}>
					{info.last_payment.currency}{" "}
					<Text mx={1} fontWeight="bold" fontSize="2xl">
						{info.last_payment.amount}
					</Text>{" "}
					on{" "}
					<Text mx={1} fontWeight="bold" fontSize="2xl">
						{info.last_payment.date}
					</Text>
				</Text>
			</Box>
			<Box>
				<Badge>Next Payment</Badge>
				<Text sx={{ display: "flex", alignItems: "center" }}>
					{info.next_payment.currency}{" "}
					<Text mx={1} fontWeight="bold" fontSize="2xl">
						{info.next_payment.amount}
					</Text>{" "}
					on{" "}
					<Text mx={1} fontWeight="bold" fontSize="2xl">
						{info.next_payment.date}
					</Text>
				</Text>
			</Box>
		</Box>
	);
};

export default SubscriptionInfo;
