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
		id: -1,
		name: "Free",
		recurringPrice: {
			INR: "00.00",
			USD: "00.00",
		},
		trialDays: 0,
		billingType: "month",
		billingPeriod: 1,
		features: [
			"Minimal features to try out our product",
			"Create 1 Chatbot",
			"Train chatbot with data from 3 web pages using our crawler",
			"Test chatbot with restriction upto 10 questions",
		],
	},
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
			"Train each chatbot with data from 10 web pages using our crawler",
			"Manually fine tune responses",
			"Insights into customer chat history",
			"Ticket raising system",
		],
	},
];
