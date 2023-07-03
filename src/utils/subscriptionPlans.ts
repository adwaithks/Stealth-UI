const ENVIRON = import.meta.env.VITE_ENVIRON;

let planId = 839660;

if (ENVIRON == "DEV") {
	planId = 53300;
}

export const subscriptionPlanIdToName: { [key: string]: string } = {
	[planId]: "Starter",
};

export const subscriptionPlans = [
	{
		id: planId,
		name: "Starter",
		recurringPrice: {
			INR: "999.00",
			USD: "14.99",
		},
		trialDays: 0,
		billingType: "month",
		billingPeriod: 1,
		features: [
			"Create 3 Chatbots",
			"Train each chatbot with data from 3 web pages using our crawler",
			"Manually add training data",
			"Insights into customer chat history",
			"Ticket raising system",
		],
	},
];
