import { createStandaloneToast } from "@chakra-ui/react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserApi } from "../../api/user.api";
import { IUser } from "../../types/user.type";

const { toast } = createStandaloneToast();

export const getUser = createAsyncThunk(
	"user/getUser",
	async ({ token }: { token: string }) => {
		try {
			const data = await getUserApi(token);
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to get user information",
				status: "error",
				duration: 9000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {
			userId: "",
			email: "",
			cancelUrl: "",
			updateUrl: "",
			subId: -1,
			subPlanId: -1,
		} as IUser,
		getUserApiStatus: "idle",
	},
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUser.pending, (state) => {
				state.getUserApiStatus = "pending";
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.user.email = action.payload.email;
				state.user.userId = action.payload.userId;
				state.user.subId = action.payload.subId;
				state.user.subPlanId = action.payload.subPlanId;
				state.user.cancelUrl = action.payload.cancelUrl;
				state.user.updateUrl = action.payload.updateUrl;
				state.getUserApiStatus = "fulfilled";
			})
			.addCase(getUser.rejected, (state) => {
				state.getUserApiStatus = "rejected";
			});
	},
});

export default userSlice.reducer;
