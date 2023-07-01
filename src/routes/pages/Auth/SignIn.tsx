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
import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CSignIn: React.FC = () => {
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
			<ModalContent height="600px" bg="transparent" boxShadow="none">
				<ModalHeader height="10%">
					<Button
						bgColor="white"
						onClick={() => navigate("/", { replace: true })}
					>
						<ArrowBackIcon mr={2} /> Go back
					</Button>
				</ModalHeader>
				<ModalBody height="90%">
					<SignIn
						afterSignInUrl="/app"
						afterSignUpUrl="/billing"
						signUpUrl="/signup"
						appearance={{
							variables: {
								colorPrimary: "#000000",
							},
						}}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CSignIn;
