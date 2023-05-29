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

const ChatbotSettings: React.FC<{
	domains: string[];
	name: string;
	status: string;
}> = ({ domains, name, status }) => {
	const [chatbotDomains, setChatbotDomains] = useState<string[]>([]);
	const [newDomain, setNewDomain] = useState("");
	const [newName, setNewName] = useState("");
	const [isNameEditing, setIsNameEditing] = useState(false);
	const [newStatus, setNewStatus] = useState(status);

	useEffect(() => {
		setChatbotDomains(domains);
		setNewName(name);
		setNewStatus(status);
	}, [domains, name, status]);

	const handleChatbotNameUpdate = () => {
		setIsNameEditing(false);
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
					<Badge
						sx={{ mr: 5, ml: -1 }}
						colorScheme={status === "active" ? "green" : "red"}
					>
						{newStatus}
					</Badge>
					<Switch size="lg" id="email-alerts" />
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
					<Button colorScheme="red">
						<DeleteIcon sx={{ mr: 2 }} />
						Delete {name}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default ChatbotSettings;
