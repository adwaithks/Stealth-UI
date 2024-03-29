import { Box, Button, Divider, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import QuickReplyBox from "./QuickReplyBox";
import { QuickReply } from "../../../../types/chatbot.type";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/store";
import {
	addQuickReply,
	deleteQuickReply,
	editQuickReply,
} from "../../../../store/thunks/quickReplies.thunk";
import { useSelector } from "react-redux";
import { addQuickReplyApiStatusSelector } from "../../../../store/selectors/chatbots.selector";

const QuickReplies: React.FC<{
	chatbotId: number;
	quickReplies: QuickReply[] | undefined;
}> = ({ quickReplies, chatbotId }) => {
	const { session } = useClerk();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const addQuickReplyApiStatus = useSelector(addQuickReplyApiStatusSelector);

	const [quickReplyInfo, setQuickReplyInfo] = useState({
		keyword: "",
		question: "",
	});

	const onDelete = (quickReplyId: number) => {
		if (
			window.confirm("Are you sure you want to delete this quick reply ?")
		)
			session
				?.getToken({ template: "stealth-token-template" })
				.then((token) => {
					if (!token) {
						navigate("/");
						return;
					}
					const quickReplies_ = quickReplies ? quickReplies : [];
					dispatch(
						deleteQuickReply({
							quickReplies: quickReplies_,
							chatbotId,
							quickReplyId,
							token,
						})
					);
				})
				.catch(() => {
					navigate("/");
				});
	};

	const onEdit = (
		quickReplyId: number,
		keyword: string,
		question: string
	) => {
		if (question.length === 0 || keyword.length === 0) {
			window.alert("Please provide both keyword and the question!");
			return;
		}
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}
				dispatch(
					editQuickReply({
						chatbotId,
						quickReplyId,
						question,
						keyword,
						token,
					})
				);
			})
			.catch(() => {
				navigate("/");
			});
	};

	const addNewQuickReply = () => {
		if (
			quickReplyInfo.question.length === 0 ||
			quickReplyInfo.keyword.length === 0
		) {
			window.alert("Please provide both keyword and the question!");
			return;
		}
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}
				dispatch(
					addQuickReply({
						chatbotId,
						question: quickReplyInfo.question,
						keyword: quickReplyInfo.keyword,
						token,
					})
				);
			})
			.catch(() => {
				navigate("/");
			});
	};

	return (
		<Box>
			<Box mb={3}>
				<Text fontSize="lg" fontWeight="bold">
					Quick Replies
				</Text>
				<Text sx={{ color: "gray" }}>
					Attach small keywords corresponding to questions, enhancing
					customer experience. You can test them out in the preview
					section.
				</Text>
			</Box>

			<Box
				sx={{
					mb: 5,
					borderRadius: 5,
				}}
			>
				<>
					<Box mb={2}>
						<Text fontWeight="bold">Quick Reply Keyword</Text>
						<Input
							placeholder="Eg: pricing"
							onChange={(e) =>
								setQuickReplyInfo((prev) => ({
									...prev,
									keyword: e.target.value,
								}))
							}
						/>
					</Box>
					<Box>
						<Text fontWeight="bold">Quick Reply Question</Text>
						<Textarea
							placeholder="Eg: Explain the pricing of products in the form of a list."
							onChange={(e) =>
								setQuickReplyInfo((prev) => ({
									...prev,
									question: e.target.value,
								}))
							}
						/>
					</Box>
				</>
				<>
					<Button
						mt={2}
						isLoading={addQuickReplyApiStatus === "pending"}
						loadingText="Add new Quick Reply"
						onClick={addNewQuickReply}
					>
						Add new Quick Reply
					</Button>
				</>
			</Box>

			<Divider my={2} />

			<Box mb={2}>
				<Text fontSize="lg" fontWeight="bold">
					Your Quick Replies
				</Text>
			</Box>
			<Box>
				{quickReplies?.map((qr) => {
					return (
						<>
							<QuickReplyBox
								question={qr.question}
								keyword={qr.keyword}
								quickReplyId={qr.quickReplyId}
								onDelete={onDelete}
								onEdit={onEdit}
							/>
						</>
					);
				})}
			</Box>
		</Box>
	);
};

export default QuickReplies;
