import {
	Box,
	Button,
	Checkbox,
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

	const fetchUrls: React.FormEventHandler<HTMLFormElement> | undefined = (
		e
	) => {
		e.stopPropagation();
		e.preventDefault();
		if (
			url?.slice(0, 4).includes("http") ||
			url?.slice(0, 5).includes("https")
		)
			session
				?.getToken({ template: "stealth-token-template" })
				.then((token) => {
					if (!token) {
						navigate("/");
						return;
					}
					dispatch(getAllUrls({ url, token }));
				});
		else window.alert("Please enter a valid url!");
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
			<Box
				sx={{
					width: "100%",
				}}
			>
				<form
					onSubmit={fetchUrls}
					style={{
						marginBottom: 2,
						display: "flex",
						alignItems: "center",
					}}
				>
					<Input
						placeholder="https://yourwebsite.com"
						mr={2}
						required
						autoFocus
						onChange={(e) => setUrl(e.target.value)}
						width={400}
					/>
					<Button
						type="submit"
						loadingText="Fetching Links"
						isLoading={getAllUrlsApiStatus === "pending"}
						bgColor="black"
						color="white"
					>
						<RepeatIcon sx={{ mr: 1 }} />
						Get All Links
					</Button>
				</form>
				<Box
					sx={{
						display: "flex",
						my: 3,
						width: "70%",
						alignItems: "center",
					}}
				>
					<Divider />
					<Text sx={{ mx: 1, color: "gray", whiteSpace: "nowrap" }}>
						Or Add links manually
					</Text>
					<Divider />
				</Box>
				<form style={{ marginBottom: 5, display: "flex" }}>
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
						Add New Link
					</Button>
				</form>
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
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Checkbox
									colorScheme="green"
									onChange={(e) => {
										if (e.target.checked)
											handleUpdateCheckedUrls(urls);
										else handleUpdateCheckedUrls([]);
									}}
									sx={{ mr: 2 }}
									size="md"
									value={url}
								>
									Select All
								</Checkbox>
								<IconButton
									size="sm"
									colorScheme="red"
									onClick={() => {
										dispatch(
											crawlerActions.clearAllLinks()
										);
									}}
									aria-label="remove url"
									icon={
										<Text px={2}>
											<DeleteIcon /> Clear All
										</Text>
									}
								/>
							</Box>
							<Text color="gray">
								{checkedUrls.length} links selected out of{" "}
								{urls.length} links{" "}
							</Text>
							<Divider my={2} />

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
												justifyContent: "space-between",
											}}
										>
											<Checkbox
												colorScheme="green"
												isChecked={checkedUrls.includes(
													url
												)}
												onChange={(e) => {
													if (e.target.checked) {
														handleUpdateCheckedUrls(
															[
																...checkedUrls,
																url,
															]
														);
													} else {
														handleUpdateCheckedUrls(
															[
																...checkedUrls,
															].filter(
																(u) => u != url
															)
														);
													}
												}}
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
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default CrawlUrlSelection;
