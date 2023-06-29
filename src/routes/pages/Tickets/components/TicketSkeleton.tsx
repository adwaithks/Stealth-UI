import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const TicketSkeleton: React.FC = () => {
	return (
		<Stack>
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
			<Skeleton
				startColor="lightgray"
				endColor="gray.100"
				height="70px"
				rounded="base"
			/>
		</Stack>
	);
};

export default TicketSkeleton;
