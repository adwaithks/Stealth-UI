import { createSlice } from "@reduxjs/toolkit";
import { getAllUrls } from "../thunks/crawl.thunk";

const crawlerSlice = createSlice({
	name: "crawler",
	initialState: {
		urls: [],
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
	},
	extraReducers(builder) {
		builder
			.addCase(getAllUrls.pending, (state) => {
				state.getAllUrlsApiStatus = "pending";
			})
			.addCase(getAllUrls.fulfilled, (state, action) => {
				state.urls = action.payload;
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
