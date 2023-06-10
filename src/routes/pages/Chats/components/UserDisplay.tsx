import { Box, Text } from "@chakra-ui/react";
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
					mb: 2,
					borderTopLeftRadius: 5,
					backgroundColor: "whitesmoke",
				}}
			>
				<Text color="black" fontWeight="bold" fontSize="xl">
					Customers
				</Text>
			</Box>
			<Box
				sx={{
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
								cursor: "pointer",
								backgroundColor:
									currentUser === user
										? "rgba(0,0,0,0.1)"
										: "white",
								color: "black",
							}}
						>
							<Text>user-{user}</Text>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default UserDisplay;
