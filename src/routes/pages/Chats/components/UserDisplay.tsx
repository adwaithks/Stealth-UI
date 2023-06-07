import { Box, Text } from "@chakra-ui/react";
import React from "react";

const UserDisplay: React.FC<{
	users: string[];
	currentUser: string;
	handleChangeUser: (userId: string) => void;
}> = ({ users, currentUser, handleChangeUser }) => {
	return (
		<Box sx={{ p: 1 }}>
			<Box
				sx={{
					backgroundColor: "black",
					color: "white",
					p: 2,
					mb: 2,
					borderRadius: 5,
				}}
			>
				<Text fontWeight="black" fontSize="xl">
					Customer
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
								borderRadius: 5,
								cursor: "pointer",
								backgroundColor:
									currentUser === user
										? "lightgray"
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
