import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
	const [topMovies, setTopMovies] = useState();
	const [currentMovies, setCurrentMovies] = useState();
	const [kidMovies, setKidMovies] = useState();

	useEffect(() => {
		const getData = async () => {
			//get the top movies currently
			const top = await (
				await fetch(
					`https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.descc&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
				)
			).json();
			setTopMovies(top.results.slice(0, 10));

			//get the movies coming out rn
			const current = await (
				await fetch(
					`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-07-01&primary_release_date.lte=2022-09-06&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
				)
			).json();
			setCurrentMovies(current.results.slice(0, 10));

			//get the top kid movies right now
			const kids = await (
				await fetch(
					`https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
				)
			).json();
			setKidMovies(kids.results.slice(0, 10));
		};
		getData();
	}, []);

	return (
		<Wrapper>
			<Title>Trending Movies</Title>
			<Article>
				{currentMovies &&
					currentMovies.map((movie) => {
						return (
							<div key={movie.id}>
								<LinkNav to={`/movie/${movie.id}`}>
									<Img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} />
									<Text>{movie.title} </Text>
								</LinkNav>
							</div>
						);
					})}
			</Article>
			<Title>Most Popular Movies</Title>
			<Article>
				{topMovies &&
					topMovies.map((movie) => {
						return (
							<div key={movie.id}>
								<LinkNav to={`/movie/${movie.id}`}>
									<Img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} />
									<Text>{movie.title} </Text>
								</LinkNav>
							</div>
						);
					})}
			</Article>
			<Title>Kid Movies</Title>
			<Article>
				{kidMovies &&
					kidMovies.map((movie) => {
						return (
							<div key={movie.id}>
								<LinkNav to={`/movie/${movie.id}`}>
									<Img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} />
									<Text>{movie.title} </Text>
								</LinkNav>
							</div>
						);
					})}
			</Article>
		</Wrapper>
	);
};

const Wrapper= styled.div`
`
const Title = styled.h1`
	font-size: 1.5rem;
	margin-bottom: 1rem;
`;

const Img = styled.img`
	width: 120px;
	height: 180px;
`;
const Text = styled.p`
	text-align: center;
	line-height: 1.2em;
	width: 120px;
	max-height: 120px;
`;

const Article = styled.div`
	display: flex;
	flex-direction: row;
`;

const LinkNav = styled(NavLink)`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	color: inherit;
	margin: 0 10px;

	&:hover {
		img {
			transform: scale(1.05);
		}
	}
`;
export default Home;