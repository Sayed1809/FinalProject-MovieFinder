import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
	const [dbUser, setDbUser] = useState(() => null);
	const { user } = useAuth0();

	//retrieve user
	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(`/api/user/${user.email}`);
			const result = await response.json();
			setDbUser(result.data);
		};
		getUser();
	}, []);

	//remove movies
	const removeMovie = async (e, movie) => {
		e.preventDefault();
		//remove the movie from the list in the front end
		const newBookmarks = dbUser.bookmarks.filter((elem) => elem.id !== movie.id);
		setDbUser({
			...dbUser,
			bookmarks: newBookmarks,
		});

		const body = {
			email: dbUser.email,
			data: {
				id: movie.id,
				title: movie.title,
				image: movie.poster_path,
				score: movie.vote_average,
			},
		};

		//remove movie from database
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

	if (!dbUser) {
		return;
	}

	return (
		<div>
			<h3>User: {dbUser.email} </h3>
			<br />
			<h3>My List</h3>
			<div>
				{dbUser?.bookmarks &&
					dbUser.bookmarks.map((movie) => {
						return (
							<Container>
								<Label>
									<LinkNav to={`/movie/${movie.id}`}>
										<Img src={"https://image.tmdb.org/t/p/w500/" + movie.image} />
									</LinkNav>
								</Label>
								<LinkNav to={`/movie/${movie.id}`}>
									<Label>{movie.title}</Label>
								</LinkNav>
								<Label>{movie.score}</Label>

								<Label>
									<Button confirm={false} onClick={(e) => removeMovie(e, movie)}>
										Remove
									</Button>
								</Label>
							</Container>
						);
					})}
			</div>
		</div>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid #777;
`;

const Img = styled.img`
	height: 15vh;
	margin: 1vh 0px;
`;

const Label = styled.div`
	width: 12vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Button = styled.button`
	backface-visibility: hidden;
	background-color: ${(props) => (props?.confirm ? "#405cf5" : "#ff726f")};
	border-radius: 6px;
	border-width: 0;
	box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset, rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
	box-sizing: border-box;
	color: #fff;
	cursor: pointer;
	height: 35px;
	width: 120px;
	padding: 0 25px;
	text-align: center;
`;

const LinkNav = styled(NavLink)`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	color: inherit;
	width: 12vw;
`;

export default Profile;
