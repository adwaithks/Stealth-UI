import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CrawlUrlSelection from "../../CreateNewChatbot/components/CrawlUrlSelection";
import { CheckIcon } from "@chakra-ui/icons";

const AddNewLinks: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	onSuccess: (urls: string[]) => void;
}> = ({ isOpen, onClose, onSuccess }) => {
	const [checkedUrls, setCheckedUrls] = useState<string[]>([]);

	const handleUpdateCheckedUrls = (urls: string[]) => {
		setCheckedUrls(urls);
	};

	return (
		<Modal
			size="xl"
			closeOnEsc
			closeOnOverlayClick
			isCentered
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />

			<ModalContent overflowY="auto">
				<ModalHeader>
					<Text>Train on more content</Text>
				</ModalHeader>
				<ModalBody>
					<CrawlUrlSelection
						checkedUrls={checkedUrls}
						handleUpdateCheckedUrls={handleUpdateCheckedUrls}
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						onClick={() => {
							if (checkedUrls.length === 0) {
								alert(
									"Please select atleast on link to start training!"
								);
								return;
							}
							if (
								window.confirm(
									"Are you sure you want to start training chatbot on contents of selected links?"
								)
							)
								onSuccess(checkedUrls);
							onClose();
						}}
						bgColor="black"
						color="white"
						width="100%"
					>
						<CheckIcon mr={2} /> Start Training
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddNewLinks;
