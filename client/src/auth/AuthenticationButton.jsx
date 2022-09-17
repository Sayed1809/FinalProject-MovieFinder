import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

//checks if user is authenticated then would show logout
const AuthenticationButton = () => {
	const { isAuthenticated } = useAuth0();
	if (isAuthenticated) {
		return <LogoutButton />;
	}
	return <LoginButton />;
};

export default AuthenticationButton;
