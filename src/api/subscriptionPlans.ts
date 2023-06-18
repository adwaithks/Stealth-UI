import { BASE_URL } from "./baseURL";

export const getSubscriptionPlans = async (token: string) => {
	const res = await fetch(BASE_URL + "/subscription/plans", {
		method: "GET",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});

	if (!res.ok) {
		throw res.statusText;
	}

	const data = await res.json();
	return data.message;
};

export const getMySubscription = async (token: string) => {
	const res = await fetch(BASE_URL + "/subscription/my", {
		method: "GET",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});

	if (!res.ok) {
		throw res.statusText;
	}

	const data = await res.json();
	return data.message;
};
