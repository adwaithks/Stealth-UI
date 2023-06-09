import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
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
import { DeleteIcon } from "@chakra-ui/icons";

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

	console.log({ urls, checkedUrls });

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
				<Text fontWeight="black" fontSize="md">
					Generate data to train your chatbot
				</Text>
				<Text color="gray">
					Fetch all links of the url that you provide. (Please provide
					domain that you own or have control over.)
				</Text>
			</Box>
			<Box sx={{ mb: 2 }}>
				<Input
					mr={2}
					onChange={(e) => setUrl(e.target.value)}
					width={400}
				/>
				<Button
					loadingText="Fetching Links"
					isLoading={getAllUrlsApiStatus === "pending"}
					onClick={fetchUrls}
				>
					Get All Links
				</Button>
			</Box>
			<Box>
				{getAllUrlsApiStatus === "fulfilled" && (
					<Box
						sx={{
							borderColor: "rgba(0,0,0,0.02)",
							p: 2,
							borderRadius: 5,
							width: 500,
						}}
					>
						<Box sx={{ mb: 1 }}>
							<Text fontSize="md" fontWeight="black">
								Select all urls to crawl
							</Text>
							<Text color="gray">
								Chatbot will trained on knowledge base created
								from the contents on the links you select. (You
								can modify it later on)
							</Text>
						</Box>
						<Box sx={{ mb: 20 }}>
							<Box sx={{ mb: 2, display: "flex" }}>
								<Input
									onChange={(e) => setNewLink(e.target.value)}
									size="sm"
									mr={2}
									width={400}
								/>
								<Button
									bgColor="black"
									color="white"
									onClick={addNewLink}
									size="sm"
								>
									Add new link
								</Button>
							</Box>
							<CheckboxGroup
								colorScheme="green"
								onChange={(checkedUrls) => {
									handleUpdateCheckedUrls(
										checkedUrls as string[]
									);
								}}
							>
								<Stack direction={["column"]}>
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
													aria-label="remove url"
													icon={
														<DeleteIcon
															onClick={() => {
																dispatch(
																	crawlerActions.removeLink(
																		url
																	)
																);
															}}
														/>
													}
												/>
											</Box>
										);
									})}
								</Stack>
							</CheckboxGroup>
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default CrawlUrlSelection;