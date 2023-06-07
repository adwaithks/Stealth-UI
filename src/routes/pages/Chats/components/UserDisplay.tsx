import { Box, Text } from "@chakra-ui/react";
import React from "react";

const UserDisplay: React.FC<{
	users: string[];
	currentUser: string;
	handleChangeUser: (userId: string) => void;
}> = ({ users, currentUser, handleChangeUser }) => {
	return (
		<Box>
			{users.map((user: string) => {
				return (
					<Box
						onClick={() => handleChangeUser(user)}
						sx={{
							p: 2,
							mr: 1,
							borderRadius: 5,
							cursor: "pointer",
							backgroundColor:
								currentUser === user ? "black" : "white",
							color: currentUser === user ? "white" : "black",
						}}
					>
						<Text>user-{user}</Text>
					</Box>
				);
			})}
		</Box>
	);
};

export default UserDisplay;
