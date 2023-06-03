import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatbotConfigSkeleton: React.FC = () => {
	return (
		<Stack>
			<Skeleton height="120px" rounded="base" />
			<Skeleton height="60px" rounded="base" />
			<Skeleton height="400px" rounded="base" />
		</Stack>
	);
};

export default ChatbotConfigSkeleton;
