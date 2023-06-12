import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Contact: React.FC = () => {
	const navigate = useNavigate();
	return (
		<Box>
			<Box sx={{ ml: 2 }}>
				<Button
					onClick={() => navigate("/", { replace: true })}
					size="sm"
					fontWeight="hairline"
					variant="outline"
				>
					<ChevronLeftIcon />
					Go Back
				</Button>
			</Box>
			<Box
				sx={{
					textAlign: "center",
				}}
			>
				<Text fontSize="5xl" fontWeight="bold">
					Contact Us
				</Text>
				<Text color="gray">
					You can contact us at any time you like. We will get back to
					you as soon as possible.
				</Text>
			</Box>
			<Divider />
			<Box mt={10} textAlign="center">
				<Text fontSize="xl">
					Reach out to us at{" "}
					<a
						style={{ textDecoration: "underline" }}
						href="mailto:official@assistdesk.in"
					>
						official@assistdesk.in
					</a>
					.
				</Text>
			</Box>
		</Box>
	);
};

export default Contact;
