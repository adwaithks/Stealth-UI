import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const BillCard: React.FC<{
	name: string;
	recurringPrice: string;
	id: number;
	currentSubscription: object | null;
}> = ({ name, recurringPrice, id, currentSubscription }) => {
	return (
		<Box>
			<Box>
				<Text>{name}</Text>
			</Box>
			<Box>
				<Text>{recurringPrice} / month</Text>
			</Box>
			<Button>{currentSubscription ? "Unsubscribe" : "Subscribe"}</Button>
		</Box>
	);
};

export default BillCard;
