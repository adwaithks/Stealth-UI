import { IUser, IUserDTO } from "../types/user.type";
import { BASE_URL } from "./baseURL";

const meSerializer = (user: IUserDTO): IUser => {
	return {
		userId: user.user_id,
		email: user.email,
		cancelUrl: user.cancel_url,
		updateUrl: user.update_url,
		subId: user.sub_id,
		subPlanId: user.sub_plan_id,
	};
};

export const getUserApi = async (token: string) => {
	const res = await fetch(BASE_URL + "/api/v1/me", {
		method: "GET",
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});

	const data = await res.json();

	if (!res.ok) {
		throw data;
	}
	return meSerializer(data.message);
};
