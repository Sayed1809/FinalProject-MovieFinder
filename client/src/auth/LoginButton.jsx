import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();
	return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

const Button = styled.button`
	padding: 10px;
	width: 85px;
	color: black;
	background: green;
	cursor: pointer;
	border-radius: 4px;
	border: 2px solid black;
`;

export default LoginButton;
