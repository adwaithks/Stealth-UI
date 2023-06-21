import { BASE_URL } from "./baseURL";

export const getMySubscriptionApi = async (token: string) => {
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

export const getPlansApi = async (token: string) => {
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
