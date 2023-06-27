import { SignUp } from "@clerk/clerk-react";
import React from "react";

const ClerkSignUp: React.FC = () => {
	return (
		<SignUp
			afterSignInUrl="/app"
			afterSignUpUrl="/billing"
			signInUrl="/signin"
			routing="virtual"
			appearance={{
				variables: {
					colorPrimary: "#000000",
				},
			}}
		/>
	);
};

export default ClerkSignUp;
