import { Badge, Box, Button, Divider, Text } from "@chakra-ui/react";
import { useClerk } from "@clerk/clerk-react";
import React from "react";
import { subscriptionPlanIdToName } from "../../../../utils/subscriptionPlans";

const BillCard: React.FC<{
	id: number;
	name: string;
	price: string;
	type: string;
	currentSubscription: any;
}> = ({ id, name, price, type, currentSubscription: sub }) => {
	const { session } = useClerk();

	return (
		<Box
			sx={{
				boxShadow: "0 0 5px lightgray",
				borderRadius: 5,
				border:
					sub && sub.plan_id === id && sub.state === "active"
						? "green solid 1px"
						: "none",
				minWidth: 250,
				bgColor:
					sub &&
					sub.plan_id === id &&
					sub.state === "active" &&
					"rgba(0, 237, 64, 0.1)",
				maxWidth: "fit-content",
				height: "fit-content",
				p: 3,
			}}
		>
			{(!sub || sub.plan_id !== id || sub.state === "deleted") && (
				<Box>
					<Text fontSize="2xl" fontWeight="bold">
						{name}
					</Text>
					<Text fontSize="xl">
						{price}/{type}
					</Text>
					<Badge mr={2} colorScheme="orange">
						Not Subscribed
					</Badge>
				</Box>
			)}

			{sub && sub.plan_id === id && sub.state === "active" && (
				<>
					<Box mb={2}>
						<Text>
							<Text fontSize="2xl" fontWeight="bold">
								{subscriptionPlanIdToName[sub.plan_id]}
							</Text>{" "}
							<Badge mr={2} colorScheme="orange">
								#{sub.plan_id}
							</Badge>
							<Badge colorScheme="green">
								{" "}
								Subscription Active
							</Badge>
						</Text>
					</Box>
					<Divider />
					<Box
						sx={{
							bgColor: "rgba(0 ,0, 0,0.05)",
							borderRadius: 5,
							width: "fit-content",
							mt: 2,
							px: 2,
						}}
					>
						<Text sx={{ display: "flex", alignItems: "center" }}>
							Last Payment on
							<Text fontSize="xl" fontWeight="bold" mx={2}>
								{sub.last_payment.date}
							</Text>
							of
							<Text fontSize="xl" fontWeight="bold" mx={2}>
								{sub.last_payment.currency}
								{sub.last_payment.amount}
							</Text>
						</Text>

						<Text sx={{ display: "flex", alignItems: "center" }}>
							Next Payment on
							<Text fontSize="xl" fontWeight="bold" mx={2}>
								{sub.next_payment.date}
							</Text>
						</Text>

						<Text sx={{ display: "flex", alignItems: "center" }}>
							Subscribed on{" "}
							<Text fontSize="xl" fontWeight="bold" mx={2}>
								{sub.signup_date.split(" ")[0]}
							</Text>
						</Text>
					</Box>
				</>
			)}

			<Box>
				{sub && sub.plan_id === id && sub.state === "active" ? (
					<Button
						onClick={() => {
							window.open(sub.cancel_url, "_blank");
						}}
						colorScheme="red"
						size="sm"
						mt={2}
					>
						Unsubscribe
					</Button>
				) : (
					<Button
						onClick={() => {
							(window as any)?.Paddle?.Checkout.open({
								product: id,
								passthrough: JSON.stringify({
									userId: session?.user.id,
									email: session?.user.primaryEmailAddress
										?.emailAddress,
								}),
							});
						}}
						mt={2}
						width="100%"
						colorScheme="green"
						size="sm"
					>
						Subscribe
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default BillCard;
