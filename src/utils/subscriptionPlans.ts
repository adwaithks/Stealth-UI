const ENVIRON = import.meta.env.VITE_ENVIRON;

let starterPlanID = 839660;
let growthPlanID = 847740;

if (ENVIRON == "DEV") {
	starterPlanID = 53300;
	growthPlanID = 63595;
}

export const subscriptionPlanIdToName: { [key: string]: string } = {
	[starterPlanID]: "Starter",
	[growthPlanID]: "Growth",
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
			"Full access for 2 weeks!",
			"Inorder to continue using after 2 weeks, you will have to upgrade to a paid plan.",
			"We wont charge until you upgrade to paid plan :)",
		],
	},
	{
		id: starterPlanID,
		name: "Starter",
		recurringPrice: {
			INR: "999.00",
			USD: "12.99",
		},
		trialDays: 0,
		billingType: "month",
		billingPeriod: 1,
		features: [
			"Create 1 Chatbots",
			"Train each chatbot with data from 10 web pages using our crawler",
			"Manually fine tune responses",
			"Insights into customer chat history",
			"Ticket raising system",
		],
	},
	{
		id: growthPlanID,
		name: "Growth",
		recurringPrice: {
			INR: "3499.00",
			USD: "14.99",
		},
		trialDays: 0,
		billingType: "month",
		billingPeriod: 1,
		features: [
			"Create 5 Chatbots",
			"Train each chatbot with data from 100 web pages using our crawler",
			"Manually fine tune responses",
			"Insights into customer chat history",
			"Ticket raising system",
		],
	},
];
