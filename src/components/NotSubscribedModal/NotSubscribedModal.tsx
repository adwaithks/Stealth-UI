import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import BillCard from "../../routes/pages/Billing/components/BillCard";
import { subscriptionPlans } from "../../utils/subscriptionPlans";

const NotSubscribedModal: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Modal size="full" onClose={() => setIsOpen(false)} isOpen={isOpen}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>You are not subscribed</ModalHeader>
				<ModalBody>
					{subscriptionPlans.map((plan) => {
						return (
							<BillCard
								currentSubscription={null}
								id={plan.id}
								name={plan.name}
								price={plan.recurringPrice["INR"]}
								type={plan.billingType}
							/>
						);
					})}
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default NotSubscribedModal;
