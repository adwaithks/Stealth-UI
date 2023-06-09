import { BASE_URL } from "./baseURL";

export const getAllUrlsApi = async (url: string, token: string) => {
	const res = await fetch(BASE_URL + "/api/v1/url/fetch", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"STEALTH-ACCESS-TOKEN": token,
		},
		body: JSON.stringify({
			url: url,
		}),
	});
	const data = await res.json();
	console.log("data: ", data);
	return data.message;
};
