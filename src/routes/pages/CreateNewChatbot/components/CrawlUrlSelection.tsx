import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	Divider,
	IconButton,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getAllUrls } from "../../../../store/thunks/crawl.thunk";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { useAppDispatch } from "../../../../store/store";
import { useSelector } from "react-redux";
import {
	getAllUrlsApiStatusSelector,
	getUrlsSelector,
} from "../../../../store/selectors/crawler.selector";
import { crawlerActions } from "../../../../store/reducers/crawler.reducer";
import { AddIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";

const CrawlUrlSelection: React.FC<{
	checkedUrls: string[];
	handleUpdateCheckedUrls: (newUrls: string[]) => void;
}> = ({ checkedUrls, handleUpdateCheckedUrls }) => {
	const navigate = useNavigate();
	const { session } = useClerk();
	const dispatch = useAppDispatch();
	const urls = useSelector(getUrlsSelector);
	const getAllUrlsApiStatus = useSelector(getAllUrlsApiStatusSelector);
	const [url, setUrl] = useState("");
	const [newLink, setNewLink] = useState("");

	console.log(checkedUrls);

	const addNewLink = () => {
		if (newLink.length > 0 && !urls.includes(newLink))
			dispatch(crawlerActions.addNewLink(newLink));
	};

	const fetchUrls: React.MouseEventHandler<HTMLButtonElement> | undefined = (
		e
	) => {
		e.stopPropagation();
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/");
					return;
				}
				dispatch(getAllUrls({ url, token }));
			});
	};

	return (
		<Box>
			<Box mb={2}>
				<Text fontWeight="bold">
					Generate data to train your chatbot
				</Text>
				<Text color="gray">
					Fetch all links in the website that you provide. Then you
					can decide which all links we should crawl to generate
					training data for your chatbot (Please provide domain that
					you own or have control over!)
				</Text>
			</Box>
			<Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
				<Input
					placeholder="https://yourwebsite.com"
					mr={2}
					onChange={(e) => setUrl(e.target.value)}
					width={400}
				/>
				<Button
					loadingText="Fetching Links"
					isLoading={getAllUrlsApiStatus === "pending"}
					onClick={fetchUrls}
					bgColor="black"
					color="white"
				>
					<RepeatIcon sx={{ mr: 1 }} />
					Get All Links
				</Button>
			</Box>
			<Divider my={3} />
			{urls.length > 0 && (
				<Box>
					<Box
						sx={{
							py: 2,
							borderRadius: 5,
							width: 500,
						}}
					>
						<Box sx={{ mb: 1 }}>
							<Text fontSize="md" fontWeight="bold">
								Select urls to crawl
							</Text>
							<Text color="gray">
								Chatbot will trained on knowledge base created
								from the contents on the links you select. (You
								can modify knowledge base later on, to add your
								touch.)
							</Text>
						</Box>
						<Box sx={{ my: 5 }}>
							<label style={{ color: "gray" }}>
								No endpoint found in the list ? Add manually
							</label>
							<Box sx={{ mb: 5, display: "flex" }}>
								<Input
									onChange={(e) => setNewLink(e.target.value)}
									mr={2}
									width={400}
									placeholder="https://yourwebsite.com/something"
								/>

								<Button
									sx={{
										display: "flex",
										alignItems: "center",
									}}
									bgColor="black"
									color="white"
									onClick={addNewLink}
								>
									<AddIcon sx={{ mr: 1 }} />
									Add Url
								</Button>
							</Box>
							<Box>
								<Text color="gray">
									{checkedUrls.length} links selected out of{" "}
									{urls.length} links{" "}
								</Text>
							</Box>

							<CheckboxGroup
								colorScheme="green"
								onChange={(checkedUrls) => {
									handleUpdateCheckedUrls(
										checkedUrls as string[]
									);
								}}
							>
								<Stack
									mb={
										window.location.pathname ===
										"/app/createbot"
											? 65
											: 5
									}
									overflowY="auto"
									direction={["column"]}
								>
									{urls.map((url, index) => {
										return (
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
												}}
											>
												<Checkbox
													sx={{ mr: 2 }}
													size="md"
													key={index}
													value={url}
												>
													{url}
												</Checkbox>
												<IconButton
													size="sm"
													onClick={() => {
														dispatch(
															crawlerActions.removeLink(
																url
															)
														);
													}}
													aria-label="remove url"
													icon={<DeleteIcon />}
												/>
											</Box>
										);
									})}
								</Stack>
							</CheckboxGroup>
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default CrawlUrlSelection;
