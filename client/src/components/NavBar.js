import AuthenticationButton from "../auth/AuthenticationButton";
import Logo from "../images/logo.png";
import { NavLink } from "react-router-dom";
import React from "react";
import Search from "./Search";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
	const { isAuthenticated } = useAuth0();
	return (
		<Nav>
			<LeftNav to="/">
				<Img src={Logo} />
			</LeftNav>
			<RightNav>
				<Search />
				{isAuthenticated && (
					<NavLink to="/profile">
						<Tab>My List</Tab>
					</NavLink>
				)}
				<AuthenticationButton />
			</RightNav>
		</Nav>
	);
};

const Nav = styled.nav`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
`;

const LeftNav = styled(NavLink)`
	display: flex;
	align-items: center;
	padding-left: 50px;
	text-decoration: none;
	color: inherit;
	cursor: pointer;
`;

const Img = styled.img`
	height: 125px;
`;

const RightNav = styled.div`
	display: flex;
	margin-left: auto;
	padding-right: 50px;
	align-items: center;
`;

const Tab = styled.button`
	border: 2px solid black;
	width: 90px;
	text-align: center;
	padding: 10px;
	border-radius: 4px;
	cursor: pointer;
	margin-right: 10px;
`;

export default NavBar;
