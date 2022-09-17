import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);

	const { user, isAuthenticated } = useAuth0();
	const [dbUser, setDbUser] = useState(null);

	const [isBookmark, setIsBookmark] = useState(false);

	//retrive current movie
	useEffect(() => {
		const getData = async () => {
			const data = await (await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)).json();
			setMovie(data);
			setIsBookmark(false);
		};
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	//retrive user if authenticated
	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(`/api/user/${user.email}`);
			const result = await response.json();
			setDbUser(result.data);

			//sets to bookmarked if show is already bookmarked
			if (result.data.bookmarks) {
				//checks if id already exists in bookmarks list, if it does then sets it to true
				setIsBookmark(result.data.bookmarks.filter((e) => e.id === movie.id).length > 0);
			} else {
				setIsBookmark(false);
			}
		};
		if (isAuthenticated) {
			getUser();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movie, isAuthenticated]);

	//add movie or remove movie from bookmark
	const handleBookmark = async () => {
		//change state in frontend
		setIsBookmark((current) => !current);

		const body = {
			email: dbUser.email,
			data: {
				id: movie.id,
				title: movie.title,
				image: movie.poster_path,
				score: movie.vote_average,
			},
		};

		//change state in db
		try {
			await fetch("/api/user/bookmark", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
		} catch (error) {
			alert("An error occured");
		}
	};

	if (!movie) {
		return;
	}

	if (isAuthenticated && dbUser === null) {
		return;
	}
	return (
		<Container>
			<Top>
				<Img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} />
				<Wrap>
					<Mid>
						<Title>{movie.title}</Title>
						{isAuthenticated && isBookmark && (
							<Button onClick={handleBookmark}>
								<IoBookmark size={40} />
							</Button>
						)}
						{isAuthenticated && !isBookmark && (
							
							<Button onClick={handleBookmark}>
								<IoBookmarkOutline size={40} />
							</Button>)
							}
					</Mid>
					<Overview>{movie.overview}</Overview>
					<Overview>Original Language: {movie.original_language}</Overview>
					<Overview>Release Date: {movie.release_date}</Overview>
					{movie.budget !== 0 && <Overview>Budget: {movie.budget}$</Overview>}
					{movie.revenue !== 0 && <Overview>Revenue: {movie.revenue}$</Overview>}
					<Overview>
						Genres:
						{movie.genres.map((genre) => (
							<span> {genre.name},</span>
						))}
					</Overview>
					<Overview>
						Production Companies:
						{movie.production_companies.map((prod) => (
							<span> {prod.name},</span>
						))}
					</Overview>
					<Overview>Rating: {movie.vote_average}</Overview>
					<Overview>Vote Count: {movie.vote_count}</Overview>
				</Wrap>
			</Top>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Top = styled.div`
	display: flex;
	margin-left: 20px;
`;

const Mid = styled.div`
	display: flex;
	flex-direction: row;
`;

const Wrap = styled.div`
	margin-left: 20px;
`;

const Img = styled.img`
	width: 300px;
	height: 450px;
`;

const Title = styled.h3`
	margin-bottom: 20px;
	font-size: 30px;
	flex: 0 0 90%;
`;

const Overview = styled.h3`
	margin: 10px 0px;
`;

const Button = styled.button`
	cursor: pointer;
	border: none;
	background: inherit;
	align-self: flex-start;
	justify-self: flex-end;
`;

export default MovieDetails;