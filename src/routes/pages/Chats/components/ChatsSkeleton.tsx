import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatsSkeleton: React.FC = () => {
	return (
		<Stack>
			<Skeleton
				startColor="lightgray"
				endColor="gray.100"
				height="100px"
				rounded="base"
			/>
			<Skeleton
				startColor="lightgray"
				endColor="gray.100"
				height="500px"
				rounded="base"
			/>
		</Stack>
	);
};

export default ChatsSkeleton;
