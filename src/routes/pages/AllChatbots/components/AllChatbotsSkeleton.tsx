import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const AllChatbotsSkeleton: React.FC = () => {
	return (
		<Stack>
			<Skeleton
				startColor="lightgray"
				endColor="gray.100"
				sx={{ mb: 5 }}
				height="90px"
				rounded="base"
			/>
			<Skeleton
				startColor="lightgray"
				endColor="gray.100"
				height="70px"
				rounded="base"
			/>
			<Skeleton
				startColor="lightgray"
				endColor="gray.100"
				height="70px"
				rounded="base"
			/>
		</Stack>
	);
};

export default AllChatbotsSkeleton;
