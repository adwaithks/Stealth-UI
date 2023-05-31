import {
	Badge,
	Box,
	Button,
	Divider,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Switch } from "@chakra-ui/react";
import {
	AddIcon,
	CheckIcon,
	CloseIcon,
	DeleteIcon,
	EditIcon,
} from "@chakra-ui/icons";
import { useAppDispatch } from "../../../../store/store";
import { useSelector } from "react-redux";
import {
	deleteChatbot,
	udpateChatbotStatus,
	updateChatbotName,
} from "../../../../store/thunks/chatbotSettings.thunk";
import {
	deleteChatbotApiStatusSelector,
	udpateChatbotStatusApiSelector,
	updateChatbotNameApiStatusSelector,
} from "../../../../store/selectors/chatbots.selector";
import { useNavigate } from "react-router-dom";

const ChatbotSettings: React.FC<{
	domains: string[];
	name: string;
	status: string;
}> = ({ domains, name, status }) => {
	const dispatch = useAppDispatch();
	const deleteChatbotApiStatus = useSelector(deleteChatbotApiStatusSelector);
	const udpateChatbotNameApiStatus = useSelector(
		updateChatbotNameApiStatusSelector
	);
	const updateChatbotStatusApiStatus = useSelector(
		udpateChatbotStatusApiSelector
	);

	const navigate = useNavigate();

	const [chatbotDomains, setChatbotDomains] = useState<string[]>([]);
	const [newDomain, setNewDomain] = useState("");
	const [newName, setNewName] = useState("");
	const [isNameEditing, setIsNameEditing] = useState(false);
	const [newStatus, setNewStatus] = useState(status);
	const chatbotId = Number(window.location.pathname.split("/")[2] || -1);

	useEffect(() => {
		setChatbotDomains(domains || []);
		setNewName(name);
		setNewStatus(status);
	}, [domains, name, status]);

	const handleDeleteChatbot = () => {
		if (
			window.confirm(
				`Are you sure you want to delete chatbot ${newName} ?`
			)
		)
			dispatch(deleteChatbot(chatbotId)).then(() => {
				navigate("/app");
			});
		else return;
	};

	const handleChatbotNameUpdate = () => {
		if (
			window.confirm(
				`Are you sure you want to rename chatbot to ${newName} ?`
			)
		) {
			setIsNameEditing(false);
			dispatch(updateChatbotName({ chatbotId, newName }));
		} else return;
	};

	const handleChatbotStatusUpdate = (newStatus: string) => {
		if (
			window.confirm(
				`Are you sure you want to change the status of chatbot to ${newStatus} ?`
			)
		) {
			setNewStatus(newStatus);
			dispatch(udpateChatbotStatus({ chatbotId, newStatus }));
		} else return;
	};

	return (
		<Box>
			<Box sx={{ mb: 5 }}>
				<Text fontSize="lg" fontWeight="bold">
					Chatbot Name
				</Text>
				<Text sx={{ color: "gray" }}>
					Update the name of your chatbot
				</Text>
			</Box>
			<Box sx={{ display: "flex" }}>
				<Input
					sx={{ width: 400, mr: 3 }}
					value={newName}
					onChange={(e) => {
						if (e.target.value.length > 0 && e.target.value != name)
							setNewName(e.target.value);
					}}
					disabled={isNameEditing ? false : true}
				/>
				<Button
					onClick={() => {
						if (isNameEditing) handleChatbotNameUpdate();
						else setIsNameEditing(true);
					}}
					colorScheme={isNameEditing ? "green" : "gray"}
				>
					{isNameEditing ? (
						<CheckIcon sx={{ mr: 2 }} />
					) : (
						<EditIcon sx={{ mr: 2 }} />
					)}
					{isNameEditing ? "Save" : "Edit"}
				</Button>
				{isNameEditing && (
					<Button
						onClick={() => {
							setIsNameEditing(false);
						}}
						sx={{ ml: 3 }}
						colorScheme="red"
					>
						Cancel
					</Button>
				)}
			</Box>

			<Divider sx={{ my: 5 }} orientation="horizontal" />

			{/* chatbot status */}
			<Box sx={{ mb: 5 }}>
				<Text fontSize="lg" fontWeight="bold">
					Chatbot Status
				</Text>
				<Text sx={{ color: "gray" }}>Update the status of chatbot</Text>
			</Box>
			<Box>
				<FormControl display="flex" alignItems="center">
					<FormLabel htmlFor="email-alerts" mb="0">
						Activate or Inactivate Chatbot
					</FormLabel>
					<Switch
						sx={{ mr: 3 }}
						onChange={(e) => {
							handleChatbotStatusUpdate(
								e.target.checked ? "active" : "inactive"
							);
						}}
						isChecked={newStatus === "active"}
						size="lg"
						id="email-alerts"
					/>
					<Badge
						colorScheme={newStatus === "active" ? "green" : "red"}
					>
						{newStatus}
					</Badge>
				</FormControl>
			</Box>

			<Divider sx={{ my: 5 }} orientation="horizontal" />

			{/* add or remove domains */}
			<Box>
				<Box sx={{ mb: 5 }}>
					<Text fontSize="lg" fontWeight="bold">
						Whitelisted Domains
					</Text>
					<Text sx={{ color: "gray" }}>
						Add or Remove domains where you are going to embed the
						chatbot
					</Text>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<InputGroup sx={{ width: 400, mr: 3 }}>
						<InputLeftAddon children="https://" />
						<Input
							value={newDomain}
							onChange={(e) => {
								setNewDomain(e.target.value);
							}}
							placeholder="example.com"
						/>
					</InputGroup>
					<Button
						onClick={() => {
							if (newDomain.length > 0) {
								setChatbotDomains((prev) => [
									...prev,
									newDomain,
								]);
								setNewDomain("");
							}
						}}
					>
						<AddIcon sx={{ mr: 2 }} /> Add Domain
					</Button>
				</Box>
				<Box sx={{ mt: 3 }}>
					{chatbotDomains.map((domain: string) => {
						return (
							<Box
								sx={{
									display: "flex",
									width: "fit-content",
									backgroundColor: "whitesmoke",
									p: 1,
									borderRadius: 5,
									mb: 1,
									alignItems: "center",
								}}
							>
								<Text fontSize="sm">https://{domain}</Text>
								<CloseIcon
									sx={{
										ml: 2,
										backgroundColor: "black",
										color: "white",
										borderRadius: "50%",
										cursor: "pointer",
										p: 1,
									}}
									onClick={() => {
										const domains_ = [...domains].filter(
											(d) => d !== domain
										);
										setChatbotDomains(domains_);
									}}
								/>
							</Box>
						);
					})}
				</Box>
			</Box>

			<Divider sx={{ my: 5 }} orientation="horizontal" />

			<Box>
				<Box sx={{ mb: 5 }}>
					<Text fontSize="lg" fontWeight="bold">
						Delete Chatbot
					</Text>
					<Text sx={{ color: "gray" }}>
						Delete chatbot, once deleted cannot be recovered
					</Text>
				</Box>
				<Box>
					<Button
						loadingText="Deleting Chatbot"
						isLoading={deleteChatbotApiStatus === "pending"}
						onClick={handleDeleteChatbot}
						colorScheme="red"
					>
						<DeleteIcon sx={{ mr: 2 }} />
						Delete {name}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default ChatbotSettings;
