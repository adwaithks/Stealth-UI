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
				boxShadow: "0 0 2px lightgray",
				borderRadius: 5,
				minWidth: 250,
				mt: 1,
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
				height: "fit-content",
				p: 3,
			}}
		>
			{sub && sub.subscription_plan_id === id ? (
				<Box>
					<Badge colorScheme="green">
						<Text fontSize="xl" fontWeight="bold">
							{name}
						</Text>
					</Badge>
					<Text fontWeight="bold" fontSize="2xl">
						{price}/{type}
					</Text>
					<Badge mr={2} colorScheme="orange">
						You are subscribed to {name} plan
					</Badge>
				</Box>
			) : (
				<Box>
					<Badge colorScheme="green">
						<Text fontSize="xl" fontWeight="bold">
							{name}
						</Text>
					</Badge>
					<Text fontWeight="bold" fontSize="xl">
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
							(window as any)?.Paddle?.Checkout.open({
								override: sub.cancel_url,
								passthrough: JSON.stringify({
									userId: session?.user.id,
									email: session?.user.primaryEmailAddress
										?.emailAddress,
								}),
								successCallback: () => {
									setTimeout(() => {
										navigate("/billing", { replace: true });
									}, 2000);
								},
								errorCallback: () => {
									alert("Something went wrong");
								},
							});
						}}
						colorScheme="red"
						size="md"
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
									setTimeout(() => {
										navigate("/billing", { replace: true });
									}, 2000);
								},
								errorCallback: () => {
									alert("Something went wrong");
								},
							});
						}}
						mt={2}
						width="100%"
						colorScheme="green"
						size="md"
					>
						Subscribe
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default BillCard;
