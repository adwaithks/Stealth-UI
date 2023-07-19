import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	deleteQuickReplyApiStatusSelector,
	editQuickReplyApiStatusSelector,
} from "../../../../store/selectors/chatbots.selector";

interface IProps {
	quickReplyId: number;
	keyword: string;
	question: string;
	onEdit: (qrId: number, keyword: string, question: string) => void;
	onDelete: (qrId: number) => void;
}

const QuickReplyBox: React.FC<IProps> = ({
	quickReplyId,
	keyword,
	question,
	onEdit,
	onDelete,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [quickReplyInfo, setQuickReplyInfo] = useState({
		keyword: "",
		question: "",
	});
	const [isDeleting, setIsDeleting] = useState(false);
	const deleteQuickReplyApiStatus = useSelector(
		deleteQuickReplyApiStatusSelector
	);
	const editQuickReplyApiStatus = useSelector(
		editQuickReplyApiStatusSelector
	);

	useEffect(() => {
		if (deleteQuickReplyApiStatus !== "pending") {
			setIsDeleting(false);
		}
	}, [deleteQuickReplyApiStatus]);

	useEffect(() => {
		setQuickReplyInfo({
			keyword,
			question,
		});
	}, [keyword, question]);

	useEffect(() => {
		if (editQuickReplyApiStatus === "fulfilled") {
			setIsEditing(false);
		}
	}, [editQuickReplyApiStatus]);

	return (
		<Box
			sx={{
				p: 3,
				borderRadius: 5,
				border: "rgba(0,0,0,0.05) solid 1px",
				mb: 2,
			}}
		>
			<Box>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					mb={2}
				>
					<Text>Keyword</Text>
					<Box>
						{isEditing ? (
							<Button
								isLoading={
									editQuickReplyApiStatus === "pending"
								}
								loadingText="Saving"
								size="sm"
								onClick={() => {
									if (
										quickReplyInfo.question !== question ||
										quickReplyInfo.keyword !== keyword
									)
										onEdit(
											quickReplyId,
											quickReplyInfo.keyword,
											quickReplyInfo.question
										);
									setIsEditing(false);
								}}
							>
								<CheckIcon />
							</Button>
						) : (
							<Button
								size="sm"
								onClick={() => {
									setIsEditing(true);
								}}
							>
								<EditIcon />
							</Button>
						)}
						<Button
							size="sm"
							onClick={() => {
								setIsEditing(false);
								onDelete(quickReplyId);
							}}
							ml={2}
							isLoading={isDeleting}
							loadingText="Deleting"
						>
							<DeleteIcon />
						</Button>
					</Box>
				</Box>
				<Box>
					<Input
						onChange={(e) => {
							setQuickReplyInfo((prev) => ({
								...prev,
								keyword: e.target.value,
							}));
						}}
						disabled={!isEditing}
						value={quickReplyInfo.keyword}
					/>
				</Box>
				<Box>
					<Text>Question</Text>
					<Textarea
						onChange={(e) => {
							setQuickReplyInfo((prev) => ({
								...prev,
								question: e.target.value,
							}));
						}}
						disabled={!isEditing}
						value={quickReplyInfo.question}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default QuickReplyBox;
