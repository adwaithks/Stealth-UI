export interface IUser {
	email: string;
	userId: string;
	cancelUrl: string;
	updateUrl: string;
	subId: number;
	subPlanId: number;
}

export interface IUserDTO {
	email: string;
	user_id: string;
	cancel_url: string;
	update_url: string;
	sub_id: number;
	sub_plan_id: number;
}
