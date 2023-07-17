import {
	Alert,
	Box,
	Button,
	InputGroup,
	Skeleton,
	Text,
	createStandaloneToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../api/baseURL";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeftIcon, CopyIcon } from "@chakra-ui/icons";

const Api: React.FC = () => {
	const { session } = useClerk();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [token, setToken] = useState("");
	const [isGen, setIsGen] = useState(false);
	const { toast } = createStandaloneToast();

	// Define the async function to fetch the data
	const fetchApiKey = async () => {
		const token = await session?.getToken({
			template: "stealth-token-template",
		});

		if (!token) {
			navigate("/");
			return;
		}
		const response = await fetch(BASE_URL + "/api/v3/user/token", {
			headers: {
				"STEALTH-ACCESS-TOKEN": token,
			},
		});
		const data = await response.json();
		return data.message;
	};

	// Use the useQuery hook to fetch the data
	const { data, isLoading, isError } = useQuery({
		queryKey: ["getApiToken"],
		queryFn: fetchApiKey,
	});

	useEffect(() => {
		if (data) {
			setToken(data);
		}
	}, [data]);

	if (isLoading) {
		return (
			<Skeleton
				startColor="lightgray"
				endColor="gray.100"
				height="70px"
				rounded="base"
			/>
		);
	}

	if (isError) {
		return <div>Error occurred while fetching data.</div>;
	}

	const generateApiKey = async () => {
		const token = await session?.getToken({
			template: "stealth-token-template",
		});

		if (!token) {
			navigate("/");
			return;
		}
		const response = await fetch(BASE_URL + "/api/v3/user/token/new", {
			headers: {
				"STEALTH-ACCESS-TOKEN": token,
			},
		});
		const data = await response.json();
		return data.message;
	};

	const handleGenerateApiKey = async () => {
		setIsGen(true);
		const res = await queryClient.fetchQuery({
			queryKey: ["generateApiKey"],
			queryFn: generateApiKey,
		});
		if (res) {
			setToken(res);
			toast({
				title: "New Api access token generated!",
				status: "success",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
		} else {
			toast({
				title: "Failed to generate new Api access token!",
				status: "error",
				duration: 4000,
				isClosable: true,
				variant: "left-accent",
			});
		}
		setIsGen(false);
	};

	return (
		<Box>
			<Box sx={{ mb: 2 }}>
				<Button
					onClick={() => navigate("/app", { replace: true })}
					size="sm"
					fontWeight="hairline"
					variant="outline"
				>
					<ChevronLeftIcon />
					Go Back
				</Button>
			</Box>
			<Box sx={{ mb: 5 }}>
				<Text fontSize="xl" fontWeight="bold">
					Api Access
				</Text>
				<Text sx={{ color: "gray" }}>
					Generate your api access token and unleash your creativity!
				</Text>
			</Box>

			<Box>
				<Box
					sx={{ cursor: "pointer" }}
					onClick={() => {
						navigator.clipboard
							.writeText(token)
							.then(() => {
								toast({
									title: "Copied to clipboard!",
									status: "success",
									duration: 4000,
									isClosable: true,
									variant: "left-accent",
								});
							})
							.catch((error) => {
								toast({
									title: "Failed to copy to clipboard!",
									status: "error",
									duration: 4000,
									isClosable: true,
									variant: "left-accent",
								});
							});
					}}
				>
					<InputGroup sx={{ display: "flex", alignItems: "center" }}>
						<Text borderRadius={5} px={2} bgColor="black">
							{token.slice(0, 30)}
						</Text>
						<Text>{token.slice(30)}</Text>
						<CopyIcon ml={2} />
						<Text color="gray">Click to copy</Text>
					</InputGroup>
				</Box>
				<Box mt={2}>
					<Button
						isLoading={isGen}
						loadingText="Generating..."
						onClick={handleGenerateApiKey}
					>
						Generate New Access Token
					</Button>
				</Box>
				<Box mt={5}>
					<Alert colorScheme="red">
						<Text>
							please make sure to keep your API token secure. It's
							essential to protect it from unauthorized access. If
							you have any doubts about the security of your
							token, don't hesitate to regenerate it. Regenerating
							new access token will revoke the previous token.
							Your security is our top priority.
						</Text>
					</Alert>
				</Box>
			</Box>
		</Box>
	);
};

export default Api;
