import { Box } from "@chakra-ui/react";
import { useClerk } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
	getMySubscription,
	getSubscriptionPlans,
} from "../../../api/subscriptionPlans";
import { useNavigate } from "react-router-dom";
import BillCard from "./components/BillCard";

interface IPlan {
	name: string;
	id: number;
	recurring_price: {
		INR: string;
		USD: string;
	};
}

const Billing: React.FC = () => {
	const { session } = useClerk();
	const navigate = useNavigate();

	const [plans, setPlans] = useState<IPlan[]>([]);
	const [mySubscription, setMySubscription] = useState<object | null>({});

	useEffect(() => {
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}
				getSubscriptionPlans(token).then((res) => {
					setPlans(res.response);
					getMySubscription(token)
						.then((res) => {
							setMySubscription(res.message);
						})
						.catch(() => {
							setMySubscription(null);
						});
				});
			});
	}, [navigate, session]);

	return (
		<Box>
			{plans?.map((plan) => {
				return (
					<BillCard
						currentSubscription={mySubscription}
						id={plan.id}
						name={plan.name}
						recurringPrice={plan.recurring_price.INR}
					/>
				);
			})}
		</Box>
	);
};

export default Billing;
