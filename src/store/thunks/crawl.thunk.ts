/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createStandaloneToast } from "@chakra-ui/react";
import { getAllUrlsApi } from "../../api/crawler.api";

const { toast } = createStandaloneToast();

export const getAllUrls = createAsyncThunk(
	"crawler/getAllUrls",
	async ({ url, token }: { url: string; token: string }) => {
		try {
			const data = await getAllUrlsApi(url, token);
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to fetch urls",
				status: "error",
				duration: 2000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);
