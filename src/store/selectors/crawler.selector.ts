import { IAppState } from "../store";

export const getUrlsSelector = (state: IAppState) => {
	return state.crawler.urls;
};

export const getAllUrlsApiStatusSelector = (state: IAppState) => {
	return state.crawler.getAllUrlsApiStatus;
};
