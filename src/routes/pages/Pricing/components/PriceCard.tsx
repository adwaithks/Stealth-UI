import { Badge, Box, Button, Text } from "@chakra-ui/react";
import { useClerk } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const PriceCard: React.FC<{
	title: string;
	pricingInfo: { [key: string]: string };
	features: string[];
}> = ({ title, pricingInfo, features }) => {
	const { session } = useClerk();
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				width: 310,
				height: 330,
				boxShadow: "0 0 10px lightgray",
				borderRadius: 5,
				p: 3,
				color: "black",
			}}
		>
			<Box sx={{ height: "90%" }}>
				<Box>
					<Badge colorScheme="green">
						<Text fontSize="xl" fontWeight="bold">
							{title}
						</Text>
					</Badge>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Text fontSize="2xl" fontWeight="bold">
						Rs.{pricingInfo.price}
					</Text>
					<Text fontSize="2xl" fontWeight="bold">
						/{pricingInfo.type}
					</Text>
				</Box>
				<Box sx={{ mt: 2 }}>
					{features.map((feature, idx) => {
						return (
							<li style={{ padding: 2 }} key={idx}>
								{feature}
							</li>
						);
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
				<Button
					onClick={() => {
						if (session) {
							navigate("/billing");
						} else {
							navigate("/signup", { replace: true });
						}
					}}
					width="100%"
					color="white"
					bgColor="black"
				>
					Subscribe
				</Button>
			</Box>
		</Box>
	);
};

export default PriceCard;
