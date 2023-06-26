import { Box, Button, Text, useMediaQuery } from "@chakra-ui/react";
import { useClerk } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const PriceCard: React.FC<{
	title: string;
	pricingInfo: { [key: string]: string };
	features: string[];
}> = ({ title, pricingInfo, features }) => {
	const [isMobile] = useMediaQuery("(max-width: 468px)");
	const { session, redirectToSignIn } = useClerk();
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				width: isMobile ? "90%" : 310,
				height: "fit-content",
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
					mt: 2,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Button
					onClick={() => {
						if (session) {
							navigate("/billing");
						} else {
							redirectToSignIn();
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
