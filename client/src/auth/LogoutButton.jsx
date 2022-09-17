import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
	const { logout } = useAuth0();
	return (
		<Button
			onClick={() =>
				logout({
					returnTo: window.location.origin,
				})
			}
		>
			Log Out
		</Button>
	);
};

const Button = styled.button`
	padding: 10px;
	width: 85px;
	color: black;
	background: red;
	cursor: pointer;
	border-radius: 4px;
	border: 2px solid black;
`;

export default LogoutButton;
