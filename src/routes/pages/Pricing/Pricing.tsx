import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import PriceCard from "./components/PriceCard";
import TrainChatbotNow from "../Landing/components/TrainChatbotNow";
import Footer from "../Footer/Footer";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { subscriptionPlans } from "../../../utils/subscriptionPlans";

const Pricing: React.FC = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	const navigate = useNavigate();

	return (
		<Box sx={{ mx: 2 }}>
			<Box sx={{ ml: 2 }}>
				<Button
					onClick={() => navigate("/", { replace: true })}
					size="sm"
					fontWeight="hairline"
					variant="outline"
				>
					<ChevronLeftIcon />
					Go Back
				</Button>
			</Box>
			<Box
				sx={{
					textAlign: "center",
				}}
			>
				<Text fontSize="5xl" fontWeight="bold">
					Pricing plans
				</Text>
				<Text color="gray">
					We are still in beta and are working on new pricing plans
					and providing more features for the existing pricing plans!
				</Text>
			</Box>
			<Divider />

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: 10,
					mt: 10,
				}}
			>
				{subscriptionPlans.map((plan) => {
					return (
						<PriceCard
							title={plan.name}
							pricingInfo={{
								price: plan.recurringPrice.INR,
								type: plan.billingType,
							}}
							features={plan.features}
						/>
					);
				})}
			</Box>
			<Text mb={10} mt={10} textAlign="center" color="gray">
				* The pricing is exclusive of taxes and additional local tax may
				be collected.
			</Text>

			<TrainChatbotNow />
			<Footer />
		</Box>
	);
};

export default Pricing;
