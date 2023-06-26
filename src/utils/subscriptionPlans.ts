export const subscriptionPlanIdToName: { [key: string]: string } = {
	53300: "Starter",
};

export const subscriptionPlans = [
	{
		id: 53300,
		name: "Starter",
		recurringPrice: {
			INR: "999.00",
			USD: "14.99",
		},
		trialDays: 0,
		billingType: "month",
		billingPeriod: 1,
		features: [
			"Create 2 Chatbots",
			"Train each chatbot with data from 3 web pages using our crawler",
			"Manually add training data",
			"Insights into customer chat history",
			"Ticket raising system",
		],
	},
];
