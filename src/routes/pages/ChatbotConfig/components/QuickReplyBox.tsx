import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteQuickReplyApiStatusSelector } from "../../../../store/selectors/chatbots.selector";

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

	return (
		<Box
			sx={{
				p: 3,
				boxShadow: "0 0 5px lightgray",
				borderRadius: 5,
				mb: 2,
			}}
		>
			<Box>
				<Box>
					<Text>Keyword</Text>
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
			<Box mt={2}>
				{isEditing ? (
					<Button
						onClick={() => {
							setIsEditing(false);
							if (
								quickReplyInfo.question !== question &&
								quickReplyInfo.keyword !== keyword
							)
								onEdit(
									quickReplyId,
									quickReplyInfo.keyword,
									quickReplyInfo.question
								);
						}}
					>
						<CheckIcon mr={2} /> Save
					</Button>
				) : (
					<Button
						onClick={() => {
							setIsEditing(true);
						}}
					>
						<EditIcon mr={2} /> Edit
					</Button>
				)}
				<Button
					onClick={() => {
						setIsEditing(false);
						onDelete(quickReplyId);
						setIsDeleting(true);
					}}
					ml={2}
					isLoading={isDeleting}
					loadingText="Deleting"
				>
					<DeleteIcon mr={2} /> Delete
				</Button>
			</Box>
		</Box>
	);
};

export default QuickReplyBox;
