import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const AllChatbotsSkeleton = () => {
	return (
		<Stack>
			<Skeleton height="70px" rounded="base" />
			<Skeleton height="70px" rounded="base" />
			<Skeleton height="70px" rounded="base" />
		</Stack>
	);
};

export default AllChatbotsSkeleton;
