import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatsSkeleton: React.FC = () => {
	return (
		<Stack>
			<Skeleton height="100px" rounded="base" />
			<Skeleton height="500px" rounded="base" />
		</Stack>
	);
};

export default ChatsSkeleton;
