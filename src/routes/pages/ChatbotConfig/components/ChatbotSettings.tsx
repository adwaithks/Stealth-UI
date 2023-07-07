import {
	Badge,
	Box,
	Button,
	Divider,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	Popover,
	PopoverArrow,
	PopoverContent,
	PopoverTrigger,
	Select,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
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
	updateChatbotColors,
	updateChatbotDomains,
	updateChatbotName,
	updateChatbotPosition,
} from "../../../../store/thunks/chatbotSettings.thunk";
import {
	deleteChatbotApiStatusSelector,
	positionChangeApiStatusSelector,
	udpateChatbotStatusApiSelector,
	updateChatbotColorApiStatusSelector,
	updateChatbotDomainsApiStatusSelector,
	updateChatbotNameApiStatusSelector,
} from "../../../../store/selectors/chatbots.selector";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { HexColorPicker } from "react-colorful";

const ChatbotSettings: React.FC<{
	domains: string[];
	name: string;
	status: string;
	position: string;
	chatbotId: number;
	chatbotHashId: string;
	primaryBgColor: string;
}> = ({
	chatbotId,
	chatbotHashId,
	domains,
	name,
	status,
	position,
	primaryBgColor,
}) => {
	const dispatch = useAppDispatch();
	const deleteChatbotApiStatus = useSelector(deleteChatbotApiStatusSelector);
	const domainsUpdateApiStatus = useSelector(
		updateChatbotDomainsApiStatusSelector
	);
	const nameChangeApiStatus = useSelector(updateChatbotNameApiStatusSelector);
	const positionChangeApiStatus = useSelector(
		positionChangeApiStatusSelector
	);
	const statusChangeApiStatus = useSelector(udpateChatbotStatusApiSelector);
	const colorChangeApiStatus = useSelector(
		updateChatbotColorApiStatusSelector
	);
	const navigate = useNavigate();

	const [chatbotDomains, setChatbotDomains] = useState<string[]>([]);
	const [newDomain, setNewDomain] = useState("");
	const [newName, setNewName] = useState("");
	const [isNameEditing, setIsNameEditing] = useState(false);
	const [isColorEditing, setIsColorEditing] = useState(false);
	const [newStatus, setNewStatus] = useState(status);
	const [chatbotPosition, setChatbotPosition] = useState<string>("");
	const [primaryBgColorState, setPrimaryBgColorState] = useState("");

	const { onOpen, onClose, isOpen } = useDisclosure();

	useEffect(() => {
		setChatbotDomains(domains || []);
		setNewName(name);
		setNewStatus(status);
		setChatbotPosition(position);
		setPrimaryBgColorState(primaryBgColor);
	}, [domains, name, status, position, primaryBgColor]);

	useEffect(() => {
		if (
			isColorEditing &&
			(colorChangeApiStatus === "fulfilled" ||
				colorChangeApiStatus === "rejected")
		)
			setIsColorEditing(false);
	}, [colorChangeApiStatus, isColorEditing]);

	const { session } = useClerk();

	const handleChatbotPositionChange:
		| React.ChangeEventHandler<HTMLSelectElement>
		| undefined = (e) => {
		const newPosition = e.target.value;
		if (
			window.confirm(
				`Are you sure you want to change the position of chatbot ?`
			)
		)
			session
				?.getToken({ template: "stealth-token-template" })
				.then((token) => {
					if (!token) {
						navigate("/");
						return;
					}
					dispatch(
						updateChatbotPosition({ chatbotId, newPosition, token })
					);
				})
				.catch(() => {
					navigate("/");
				});
		else return;
	};

	const handleDeleteChatbot = () => {
		if (
			window.confirm(
				`Are you sure you want to delete chatbot ${newName} ?`
			)
		)
			session
				?.getToken({ template: "stealth-token-template" })
				.then((token) => {
					if (!token) {
						navigate("/");
						return;
					}
					dispatch(deleteChatbot({ chatbotId, token }))
						.then(() => {
							navigate("/app", { replace: true });
						})
						.catch(() => {
							navigate("/app");
						});
				})
				.catch(() => {
					navigate("/");
				});
		else return;
	};

	const handleChatbotNameUpdate = () => {
		if (newName.length === 0) {
			alert("Enter a name for the chatbot");
			return;
		}
		if (
			window.confirm(
				`Are you sure you want to rename chatbot to ${newName} ?`
			)
		) {
			setIsNameEditing(false);
			session
				?.getToken({ template: "stealth-token-template" })
				.then((token) => {
					if (!token) {
						navigate("/");
						return;
					}
					dispatch(
						updateChatbotName({
							chatbotId,
							newName,
							oldName: name,
							token,
						})
					).catch(() => {
						navigate("/app");
					});
				})
				.catch(() => {
					navigate("/");
				});
		} else return;
	};

	const handleChatbotStatusUpdate = (newStatus: string) => {
		if (
			window.confirm(
				`Are you sure you want to change the status of chatbot to ${newStatus} ?`
			)
		) {
			session
				?.getToken({ template: "stealth-token-template" })
				.then((token) => {
					if (!token) {
						navigate("/");
						return;
					}
					dispatch(
						udpateChatbotStatus({ chatbotId, newStatus, token })
					);
				})
				.catch(() => {
					navigate("/");
				});
		} else return;
	};

	const handleRemoveDomain = (newDomains: string[]) => {
		if (
			window.confirm(
				`Are you sure you want to modify the domains list of chatbot ?`
			)
		) {
			session
				?.getToken({ template: "stealth-token-template" })
				.then((token) => {
					if (!token) {
						navigate("/");
						return;
					}
					// setChatbotDomains(newDomains);
					dispatch(
						updateChatbotDomains({
							chatbotId,
							domains: newDomains,
							token,
						})
					);
				})
				.catch(() => {
					navigate("/");
				});
		} else return;
	};

	const handleAddNewDomain = (newDomain: string) => {
		if (newDomain.length === 0) {
			window.alert("Please enter a domain!");
			return;
		}

		if (
			!newDomain.startsWith("http://") &&
			!newDomain.startsWith("https://")
		) {
			window.alert("Please enter a valid domain!");
			return;
		}

		if (
			window.confirm(
				`Are you sure you want to modify the domains list of chatbot ?`
			)
		) {
			session
				?.getToken({ template: "stealth-token-template" })
				.then((token) => {
					if (!token) {
						navigate("/");
						return;
					}
					dispatch(
						updateChatbotDomains({
							chatbotId,
							domains: [...chatbotDomains, newDomain],
							token,
						})
					);
				})
				.catch(() => {
					navigate("/");
				});

			setNewDomain("");
		} else return;
	};

	const handleNewBgColor = () => {
		// updateChatbotColorApiStatusSelector
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}
				dispatch(
					updateChatbotColors({
						token,
						chatbotHashId,
						chatbotId,
						primaryBgColor: primaryBgColorState,
					})
				);
			})
			.catch(() => {
				navigate("/");
			});
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
						setNewName(e.target.value);
					}}
					disabled={isNameEditing ? false : true}
				/>
				<Button
					onClick={() => {
						if (isNameEditing) handleChatbotNameUpdate();
						else setIsNameEditing(true);
					}}
					isLoading={nameChangeApiStatus === "pending"}
					loadingText="Saving"
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
					<FormLabel
						fontWeight="normal"
						htmlFor="email-alerts"
						mb="0"
					>
						Activate or Inactivate Chatbot
					</FormLabel>
					<Switch
						disabled={statusChangeApiStatus === "pending"}
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
					{statusChangeApiStatus === "pending" && <Spinner ml={2} />}
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
						Add domains where you are going to embed the chatbot
					</Text>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<InputGroup sx={{ width: 400, mr: 3 }}>
						<Input
							value={newDomain}
							onChange={(e) => {
								setNewDomain(e.target.value);
							}}
							placeholder="https://yourwebsite.com"
						/>
					</InputGroup>
					<Button
						onClick={() => {
							handleAddNewDomain(newDomain);
						}}
						isLoading={domainsUpdateApiStatus === "pending"}
						loadingText="Updating domains"
					>
						<AddIcon sx={{ mr: 2 }} /> Add Domain
					</Button>
				</Box>
				<Box
					sx={{
						mt: 3,
						display: "flex",
						alignItems: "center",
						flexWrap: "wrap",
						width: 350,
					}}
				>
					{chatbotDomains.map((domain: string) => {
						if (domain.length > 0)
							return (
								<Box
									key={domain}
									sx={{
										display: "flex",
										width: "fit-content",
										backgroundColor: "rgba(0,0,0,0.05)",
										p: 1,
										mr: 1,
										borderRadius: 5,
										mb: 1,
										alignItems: "center",
									}}
								>
									<Text fontSize="sm">{domain}</Text>
									<CloseIcon
										fontSize="md"
										sx={{
											ml: 2,
											backgroundColor: "black",
											color: "white",
											borderRadius: "50%",
											cursor: "pointer",
											p: 1,
										}}
										onClick={() => {
											const domains_ = [
												...domains,
											].filter((d) => d !== domain);
											handleRemoveDomain(domains_);
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
						Primary Color
					</Text>
					<Text sx={{ color: "gray" }}>
						Set the primary color of your chat bot embedded on
						website
					</Text>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Popover
						size="lg"
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						placement="top-end"
						strategy="absolute"
						closeOnBlur
						closeOnEsc
					>
						<PopoverArrow />
						<PopoverTrigger>
							<Box
								cursor="pointer"
								onClick={() => setIsColorEditing(true)}
								sx={{
									backgroundColor: primaryBgColorState,
									borderRadius: 5,
									height: 10,
									width: 10,
								}}
							></Box>
						</PopoverTrigger>
						<PopoverContent width="fit-content">
							<HexColorPicker
								color={primaryBgColorState}
								onChange={setPrimaryBgColorState}
							/>
						</PopoverContent>
					</Popover>

					<Box>
						{isColorEditing && (
							<Box ml={5}>
								<Button
									mr={2}
									colorScheme="green"
									onClick={handleNewBgColor}
									isLoading={
										colorChangeApiStatus === "pending"
									}
									loadingText="Updating Color"
								>
									<CheckIcon mr={2} />
									Update
								</Button>
								<Button
									colorScheme="red"
									onClick={() => {
										setPrimaryBgColorState(primaryBgColor);
										setIsColorEditing(false);
									}}
								>
									<CloseIcon mr={2} />
									Cancel
								</Button>
							</Box>
						)}
					</Box>
				</Box>
			</Box>

			<Divider sx={{ my: 5 }} orientation="horizontal" />

			<Box>
				<Box sx={{ mb: 5 }}>
					<Text fontSize="lg" fontWeight="bold">
						Chatbot Widget Position
					</Text>
					<Text sx={{ color: "gray" }}>
						Position where the chatbot icon will be displayed on
						your website
					</Text>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Select
						disabled={positionChangeApiStatus === "pending"}
						onChange={handleChatbotPositionChange}
						width={200}
						placeholder="Select option"
						value={chatbotPosition}
					>
						<option
							selected={chatbotPosition === "bottomright"}
							value="bottomright"
						>
							Bottom Right
						</option>
						<option
							selected={chatbotPosition === "bottomleft"}
							value="bottomleft"
						>
							Bottom Left
						</option>
					</Select>
					{positionChangeApiStatus === "pending" && (
						<Spinner ml={2} />
					)}
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
