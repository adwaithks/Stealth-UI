import { BASE_URL } from "./baseURL";

export const getMySubscriptionApi = async (token: string) => {
	const res = await fetch(BASE_URL + "/subscription/my", {
		method: "GET",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});
	const data = await res.json();

	if (!res.ok) {
		throw data.message;
	}
	return data.message;
};

export const getMySubscriptionInfoApi = async (token: string) => {
	const res = await fetch(BASE_URL + "/subscription/my/info", {
		method: "GET",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});

	const data = await res.json();

	if (!res.ok) {
		throw data.message;
	}
	return data.message;
};

export const getPlansApi = async (token: string) => {
	const res = await fetch(BASE_URL + "/subscription/plans", {
		method: "GET",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});
	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return data.message;
};
