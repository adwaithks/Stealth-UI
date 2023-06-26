import { Badge, Box, Button, Text } from "@chakra-ui/react";
import { useClerk } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BillCard: React.FC<{
	id: number;
	name: string;
	price: string;
	type: string;
	currentSubscription: any;
}> = ({ id, name, price, type, currentSubscription: sub }) => {
	const { session } = useClerk();
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				boxShadow: "0 0 5px lightgray",
				borderRadius: 5,
				minWidth: 250,
				maxWidth: "fit-content",
				height: "fit-content",
				p: 3,
			}}
		>
			{sub && sub.subscription_plan_id === id ? (
				<Box>
					<Text fontSize="2xl" fontWeight="bold">
						{name}
					</Text>
					<Text fontSize="xl">
						{price}/{type}
					</Text>
					<Badge mr={2} colorScheme="green">
						Subscribed
					</Badge>
				</Box>
			) : (
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

			<Box>
				{sub && sub.subscription_plan_id === id ? (
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
								successCallback: () => {
									navigate("/app");
								},
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
