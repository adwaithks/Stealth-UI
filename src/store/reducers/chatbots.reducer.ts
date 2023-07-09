/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyChatbotsApi } from "../../api/getMyChabots.api";
import { Chatbot, QuickReply } from "../../types/chatbot.type";
import { createNewChatbotApi } from "../../api/createNewChatbot.api";
import { retrainChatbotApi } from "../../api/retrainChatbot.api";
import {
	deleteChatbot,
	udpateChatbotStatus,
	updateChatbotColors,
	updateChatbotDomains,
	updateChatbotName,
	updateChatbotPosition,
} from "../thunks/chatbotSettings.thunk";
import {
	addNewLinks,
	getChatbotById,
	updateFineTune,
} from "../thunks/getChatbotById.thunk";
import { createStandaloneToast } from "@chakra-ui/react";
import {
	addQuickReply,
	deleteQuickReply,
	editQuickReply,
} from "../thunks/quickReplies.thunk";

const { toast } = createStandaloneToast();

export const getMyChatbots = createAsyncThunk(
	"chatbots/getMyChatbots",
	async (token: string) => {
		try {
			const data = await getMyChatbotsApi(token);
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to get your chatbots!",
				status: "error",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

export const createNewChatbot = createAsyncThunk(
	"chatbots/createNewChatbot",
	async ({
		name,
		urls,
		token,
	}: {
		name: string;
		urls: string[];
		token: string;
	}) => {
		try {
			const data = await createNewChatbotApi(name, urls, token);
			toast({
				title: "Success",
				description: "Chatbot training started successfully!",
				status: "success",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			return data;
		} catch (err: any) {
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to create new chatbot!",
				status: "error",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

export const retrainChatbot = createAsyncThunk(
	"chatbots/retrainChatbot",
	async (
		{
			chatbotId,
			link,
			token,
			chatbotHashId,
			linkId,
		}: {
			chatbotId: number;
			link: string;
			token: string;
			chatbotHashId: string;
			linkId: number;
		},
		{ dispatch }
	) => {
		try {
			const data = await retrainChatbotApi(
				chatbotId,
				link,
				token,
				chatbotHashId
			);
			dispatch(
				chatbotsActions.updateLinkStatus({
					linkId,
					trainStatus: "RETRAINING_PENDING",
				})
			);

			toast({
				title: "Success",
				description: "Chatbot retraining started successfully!",
				status: "success",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			return data;
		} catch (err: any) {
			dispatch(
				chatbotsActions.updateLinkStatus({
					linkId,
					trainStatus: "RETRAINING_REJECTED",
				})
			);
			toast({
				title: "Something went wrong",
				description: err?.message
					? err.message
					: "Failed to retrain chatbot!",
				status: "error",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
			throw err;
		}
	}
);

const chatbotsSlice = createSlice({
	name: "chatbots",
	initialState: {
		myChatbots: [] as Chatbot[],
		currentChatbot: {} as Chatbot,
		quickReplyAddApiStatus: "idle",
		quickReplyEditApiStatus: "idle",
		quickReplyDeleteApiStatus: "idle",
		getMyChatbotsApiStatus: "idle",
		createNewChatbotApiStatus: "idle",
		retrainChatbotApiStatus: "idle",
		updateChatbotFineTuneApiStatus: "idle",
		deleteChatbotApiStatus: "idle",
		chatbotStatusChangeApiStatus: "idle",
		addNewLinksApiStatus: "idle",
		chatbotNameChangeApiStatus: "idle",
		domainChangeApiStatus: "idle",
		getChatbotByIdApiStatus: "idle",
		chatbotPositionChangeApiStatus: "idle",
		chatbotColorChangeApiStatus: "idle",
	},
	reducers: {
		updateLinkStatus: (state, action) => {
			const { linkId, trainStatus } = action.payload;
			state.currentChatbot.links = state.currentChatbot.links.map(
				({ link, linkId: id, trainStatus: status }) => {
					if (linkId === id) {
						return {
							link,
							linkId: id,
							trainStatus,
						};
					}
					return { link, linkId: id, trainStatus: status };
				}
			);
		},

		resetCreateNewChatbotStatus: (state) => {
			state.createNewChatbotApiStatus = "idle";
		},
		updateCurrentChatbotStatus: (state, action) => {
			state.currentChatbot.status = action.payload;
		},
		updateTrainStatus: (state, action) => {
			const { chatbotId, status } = action.payload;
			state.currentChatbot.trainStatus = status;
			state.myChatbots = state.myChatbots.map((chatbot) => {
				if (chatbot.chatbotId === chatbotId) {
					return {
						...chatbot,
						trainStatus: status,
					};
				}
				return chatbot;
			});
		},
		updateCurrentChatbotName: (state, action) => {
			state.currentChatbot.chatbotName = action.payload;
		},
		updateCurrentChatbotDomains: (state, action) => {
			state.currentChatbot.domains = action.payload;
		},
		updateCurrentChatbotPosition: (state, action) => {
			state.currentChatbot.position = action.payload;
		},
		resetRetrainApiStatus: (state) => {
			state.retrainChatbotApiStatus = "idle";
		},
		deleteThisQuickReply: (state, action) => {
			const { quickReplies, quickReplyId } = action.payload;
			state.currentChatbot.quickReplies = quickReplies.filter(
				(qr: QuickReply) => qr.quickReplyId !== quickReplyId
			);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(addNewLinks.pending, (state) => {
				state.addNewLinksApiStatus = "pending";
			})
			.addCase(addNewLinks.fulfilled, (state) => {
				state.addNewLinksApiStatus = "fulfilled";
			})
			.addCase(addNewLinks.rejected, (state) => {
				state.addNewLinksApiStatus = "rejected";
			})
			.addCase(updateFineTune.pending, (state) => {
				state.updateChatbotFineTuneApiStatus = "pending";
			})
			.addCase(updateFineTune.fulfilled, (state, action) => {
				state.updateChatbotFineTuneApiStatus = "fulfilled";
				state.currentChatbot.fineTune = action.payload;
			})
			.addCase(updateFineTune.rejected, (state) => {
				state.updateChatbotFineTuneApiStatus = "rejected";
			})
			.addCase(updateChatbotPosition.pending, (state) => {
				state.chatbotPositionChangeApiStatus = "pending";
			})
			.addCase(updateChatbotPosition.fulfilled, (state) => {
				state.chatbotPositionChangeApiStatus = "fulfilled";
			})
			.addCase(updateChatbotPosition.rejected, (state) => {
				state.chatbotPositionChangeApiStatus = "rejected";
			})
			.addCase(getMyChatbots.pending, (state) => {
				state.getMyChatbotsApiStatus = "pending";
			})
			.addCase(getMyChatbots.fulfilled, (state, action) => {
				state.myChatbots = action.payload || [];
				state.getMyChatbotsApiStatus = "fulfilled";
			})
			.addCase(getMyChatbots.rejected, (state) => {
				state.getMyChatbotsApiStatus = "rejected";
			})
			.addCase(createNewChatbot.pending, (state) => {
				state.createNewChatbotApiStatus = "pending";
			})
			.addCase(createNewChatbot.fulfilled, (state, action) => {
				state.myChatbots.push(action.payload);
				state.createNewChatbotApiStatus = "fulfilled";
			})
			.addCase(createNewChatbot.rejected, (state) => {
				state.createNewChatbotApiStatus = "rejected";
			})
			.addCase(retrainChatbot.pending, (state) => {
				state.retrainChatbotApiStatus = "pending";
			})
			.addCase(retrainChatbot.fulfilled, (state) => {
				state.retrainChatbotApiStatus = "fulfilled";
			})
			.addCase(retrainChatbot.rejected, (state) => {
				state.retrainChatbotApiStatus = "rejected";
			})
			.addCase(udpateChatbotStatus.pending, (state) => {
				state.chatbotStatusChangeApiStatus = "pending";
			})
			.addCase(udpateChatbotStatus.fulfilled, (state) => {
				state.chatbotStatusChangeApiStatus = "fulfilled";
			})
			.addCase(udpateChatbotStatus.rejected, (state) => {
				state.chatbotStatusChangeApiStatus = "rejected";
			})
			.addCase(updateChatbotName.pending, (state) => {
				state.chatbotNameChangeApiStatus = "pending";
			})
			.addCase(updateChatbotName.fulfilled, (state) => {
				state.chatbotNameChangeApiStatus = "fulfilled";
			})
			.addCase(updateChatbotName.rejected, (state) => {
				state.chatbotNameChangeApiStatus = "rejected";
			})
			.addCase(deleteChatbot.pending, (state) => {
				state.deleteChatbotApiStatus = "pending";
			})
			.addCase(deleteChatbot.fulfilled, (state) => {
				state.deleteChatbotApiStatus = "fulfilled";
			})
			.addCase(deleteChatbot.rejected, (state) => {
				state.deleteChatbotApiStatus = "rejected";
			})
			.addCase(getChatbotById.pending, (state) => {
				state.getChatbotByIdApiStatus = "pending";
			})
			.addCase(getChatbotById.fulfilled, (state, action) => {
				state.currentChatbot = action.payload;
				state.getChatbotByIdApiStatus = "fulfilled";
			})
			.addCase(getChatbotById.rejected, (state) => {
				state.getChatbotByIdApiStatus = "rejected";
			})
			.addCase(updateChatbotDomains.pending, (state) => {
				state.domainChangeApiStatus = "pending";
			})
			.addCase(updateChatbotDomains.fulfilled, (state) => {
				state.domainChangeApiStatus = "fulfilled";
			})
			.addCase(updateChatbotDomains.rejected, (state) => {
				state.domainChangeApiStatus = "rejected";
			})
			.addCase(addQuickReply.pending, (state) => {
				state.quickReplyAddApiStatus = "pending";
			})
			.addCase(addQuickReply.fulfilled, (state, action) => {
				state.currentChatbot.quickReplies?.push(action.payload);
				state.quickReplyAddApiStatus = "fulfilled";
			})
			.addCase(addQuickReply.rejected, (state) => {
				state.quickReplyAddApiStatus = "rejected";
			})
			.addCase(editQuickReply.pending, (state) => {
				state.quickReplyEditApiStatus = "pending";
			})
			.addCase(editQuickReply.fulfilled, (state, action) => {
				const { quickReplyId, question, keyword } = action.payload;
				state.currentChatbot.quickReplies?.forEach((qr) => {
					if (qr.quickReplyId === quickReplyId) {
						qr.keyword = keyword;
						qr.question = question;
					}
				});
				state.quickReplyEditApiStatus = "fulfilled";
			})
			.addCase(editQuickReply.rejected, (state) => {
				state.quickReplyEditApiStatus = "rejected";
			})
			.addCase(deleteQuickReply.pending, (state) => {
				state.quickReplyDeleteApiStatus = "pending";
			})
			.addCase(deleteQuickReply.fulfilled, (state) => {
				state.quickReplyDeleteApiStatus = "fulfilled";
			})
			.addCase(deleteQuickReply.rejected, (state) => {
				state.quickReplyDeleteApiStatus = "rejected";
			})
			.addCase(updateChatbotColors.pending, (state) => {
				state.chatbotColorChangeApiStatus = "pending";
			})
			.addCase(updateChatbotColors.fulfilled, (state, action) => {
				state.currentChatbot.primaryBgColor =
					action.payload.primaryBgColor;
				state.chatbotColorChangeApiStatus = "fulfilled";
			})
			.addCase(updateChatbotColors.rejected, (state) => {
				state.chatbotColorChangeApiStatus = "rejected";
			});
	},
});

export const chatbotsActions = {
	...chatbotsSlice.actions,
};
export default chatbotsSlice.reducer;
