import {
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
import { CloseIcon } from "@chakra-ui/icons";

const ChatbotSettings: React.FC<{ domains: string[] }> = ({ domains }) => {
	const [chatbotDomains, setChatbotDomains] = useState<string[]>([]);
	const [newDomain, setNewDomain] = useState("");

	useEffect(() => {
		setChatbotDomains(domains);
	}, [domains]);

	return (
		<Box>
			<Box sx={{ mb: 5 }}>
				<Text fontSize="lg" fontWeight="bold">
					Chatbot Status
				</Text>
				<Text sx={{ color: "gray" }}>Change the status of chatbot</Text>
			</Box>
			<Box>
				<FormControl display="flex" alignItems="center">
					<FormLabel htmlFor="email-alerts" mb="0">
						Activate or Inactivate Chatbot
					</FormLabel>
					<Switch id="email-alerts" />
				</FormControl>
			</Box>
			<Divider sx={{ my: 3 }} orientation="horizontal" />

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
					<InputGroup sx={{ width: 400, mr: 3 }} size="sm">
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
						size="sm"
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
						Add Domain
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

			<Divider sx={{ my: 3 }} orientation="horizontal" />
		</Box>
	);
};

export default ChatbotSettings;
