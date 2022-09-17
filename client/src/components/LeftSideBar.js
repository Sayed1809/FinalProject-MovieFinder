import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LeftSideBar = () => {
	const [topMovies, setTopMovies] = useState();

	useEffect(() => {
		const getData = async () => {
			const data = await (
				await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
			).json();
			setTopMovies(data.results);
		};
		getData();
	}, []);

	return (
		<Nav>
			{topMovies &&
				topMovies.slice(0, 15).map((movie) => (
					<LinkNav to={`/movie/${movie.id}`} key={movie.id} rel="noreferrer">
						{movie.title}
					</LinkNav>
				))}
		</Nav>
	);
};
const Nav = styled.nav`
	padding-left: 12px;
	padding-right: 12px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const LinkNav = styled(NavLink)`
	padding: 8px 16px;
	width: 80%;
	color: black;
	font-size: 16px;
	margin-bottom: 16px;
	background-color: #f0f0f0;
	text-decoration: none;
`;

export default LeftSideBar;
