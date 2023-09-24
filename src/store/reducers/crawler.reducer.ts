import { createSlice } from "@reduxjs/toolkit";
import { getAllUrls } from "../thunks/crawl.thunk";

const crawlerSlice = createSlice({
	name: "crawler",
	initialState: {
		urls: [] as string[],
		getAllUrlsApiStatus: "idle",
	},
	reducers: {
		addNewLink: (state, action) => {
			state.urls.push(action.payload);
		},
		removeLink: (state, action) => {
			const links = [...state.urls];
			const newLinks = links.filter((link) => link != action.payload);
			state.urls = newLinks;
		},
		resetCrawlStates: (state) => {
			state.urls = [];
			state.getAllUrlsApiStatus = "idle";
		},
		clearAllLinks: (state) => {
			state.urls = [];
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAllUrls.pending, (state) => {
				state.getAllUrlsApiStatus = "pending";
			})
			.addCase(getAllUrls.fulfilled, (state, action) => {
				const hashSet = new Set(state.urls);
				const newLinks = action.payload.filter(
					(link: string) => !hashSet.has(link)
				);
				state.urls = [...state.urls, ...newLinks];
				state.getAllUrlsApiStatus = "fulfilled";
			})
			.addCase(getAllUrls.rejected, (state) => {
				state.getAllUrlsApiStatus = "rejected";
			});
	},
});

export const crawlerActions = {
	...crawlerSlice.actions,
};

export default crawlerSlice.reducer;
