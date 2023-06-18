import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";

const CreateNewChatbotModal: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
	title: string;
	isLoading: boolean;
	primaryActionText: string;
	secondaryActionText: string;
	children: React.ReactNode;
}> = ({
	isOpen,
	onClose,
	onSuccess,
	isLoading,
	title,
	primaryActionText,
	secondaryActionText,
	children,
}) => {
	return (
		<Modal size="full" isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader sx={{ fontWeight: 800 }}>{title}</ModalHeader>
				{!isLoading && <ModalCloseButton />}
				<ModalBody>{children}</ModalBody>

				<ModalFooter>
					<Button
						_hover={{
							opacity: 0.6,
						}}
						color="white"
						onClick={onSuccess}
						isLoading={isLoading}
						loadingText="Training Chatbot..."
						backgroundColor="black"
						mr={3}
					>
						{primaryActionText}
					</Button>
					<Button
						disabled={isLoading}
						onClick={onClose}
						variant="outline"
					>
						{secondaryActionText}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CreateNewChatbotModal;
