import { IAppState } from "../store";

export const userSelector = (state: IAppState) => {
	return state.user;
};

export const getUserApiStatusSelector = (state: IAppState) => {
	return state.user.getUserApiStatus;
};

export const isSubscribedSelector = (state: IAppState) => {
	return state.user.subscription;
};
