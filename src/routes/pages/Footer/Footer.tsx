import { Badge, Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	return (
		<Box
			sx={{
				backgroundColor: "rgba(0, 0, 0, 0.05)",
				borderRadius: 5,
				textAlign: "center",
				mt: 10,
				p: 5,
			}}
		>
			<Text fontWeight="bold">
				Assist Desk{" "}
				<Badge variant="subtle" colorScheme="red">
					Beta
				</Badge>
			</Text>
			<Box sx={{ p: 2 }}>
				<Link
					style={{ marginBottom: 8, marginRight: 8, marginLeft: 8 }}
					to="/pricing"
				>
					Pricing
				</Link>
				<Link
					style={{ marginBottom: 8, marginRight: 8, marginLeft: 8 }}
					to="/terms"
				>
					Terms & Conditions
				</Link>
				<Link
					style={{ marginBottom: 8, marginRight: 8, marginLeft: 8 }}
					to="/terms"
				>
					Refund Policy
				</Link>
				<Link
					style={{ marginBottom: 8, marginRight: 8, marginLeft: 8 }}
					to="/privacy"
				>
					Privacy
				</Link>
				<Link
					style={{ marginBottom: 8, marginRight: 8, marginLeft: 8 }}
					to="/contact"
				>
					Contact Us
				</Link>
			</Box>
			<Box>
				<Text color="gray">Made in India</Text>
			</Box>
		</Box>
	);
};

export default Footer;
