import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const PriceCard: React.FC<{
	title: string;
	pricingInfo: { [key: string]: string };
	features: string[];
}> = ({ title, pricingInfo, features }) => {
	return (
		<Box
			sx={{
				width: 310,
				height: 310,
				boxShadow: "0 0 10px lightgray",
				borderRadius: 5,
				p: 3,
				color: "black",
			}}
		>
			<Box sx={{ height: "90%" }}>
				<Box>
					<Text fontSize="3xl" fontWeight="bold">
						{title}
					</Text>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Text fontSize="2xl">Rs.{pricingInfo.price}</Text>
					<Text fontSize="2xl">/{pricingInfo.type}</Text>
				</Box>
				<Box sx={{ mt: 2 }}>
					{features.map((feature, idx) => {
						return <Text key={idx}>- {feature}</Text>;
					})}
				</Box>
			</Box>
			<Box
				sx={{
					height: "10%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Button width="100%" color="white" bgColor="black">
					Subscribe
				</Button>
			</Box>
		</Box>
	);
};

export default PriceCard;
