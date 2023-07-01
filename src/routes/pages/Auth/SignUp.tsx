import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ClerkSignUp from "./ClerkSignUp";

const CSignUp: React.FC = () => {
	const OverlayOne = () => (
		<ModalOverlay
			bg="blackAlpha.300"
			backdropFilter="blur(10px) hue-rotate(90deg)"
		/>
	);

	const { onClose } = useDisclosure();
	const navigate = useNavigate();

	return (
		<Modal isCentered isOpen={true} onClose={onClose}>
			<OverlayOne />
			<ModalContent height="650px" bg="transparent" boxShadow="none">
				<ModalHeader sx={{ height: "10%" }}>
					<Button bgColor="white" onClick={() => navigate("/")}>
						<ArrowBackIcon mr={2} /> Go back
					</Button>
				</ModalHeader>
				<ModalBody sx={{ height: "90%" }}>
					<ClerkSignUp />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CSignUp;
