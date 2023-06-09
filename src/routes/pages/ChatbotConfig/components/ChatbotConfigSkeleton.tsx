import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatbotConfigSkeleton: React.FC = () => {
	return (
		<Stack>
			<Skeleton
				startColor="pink.100"
				endColor="orange.100"
				height="120px"
				rounded="base"
			/>
			<Skeleton
				startColor="pink.100"
				endColor="orange.100"
				height="60px"
				rounded="base"
			/>
			<Skeleton
				startColor="pink.100"
				endColor="orange.100"
				height="400px"
				rounded="base"
			/>
		</Stack>
	);
};

export default ChatbotConfigSkeleton;
