import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserDisplay: React.FC<{
	users: string[];
	currentUser: string;
	handleChangeUser: (userId: string) => void;
}> = ({ users, currentUser, handleChangeUser }) => {
	return (
		<Box>
			<Box
				sx={{
					p: 2,
				}}
			>
				<Text color="black" fontWeight="bold" fontSize="xl">
					Visitors
				</Text>
			</Box>
			<Box
				sx={{
					mr: 3,
					display: "flex",
					flexDirection: "column",
				}}
			>
				{users.map((user: string) => {
					return (
						<Box
							onClick={() => handleChangeUser(user)}
							sx={{
								p: 2,
								display: "flex",
								alignItems: "center",
								cursor: "pointer",
								backgroundColor:
									currentUser === user
										? "rgba(0,0,0,0.05)"
										: "white",
								color: "black",
							}}
						>
							<Avatar size="sm" mr={2} />
							<Text>user-{user}</Text>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default UserDisplay;
