import React, { useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Search = () => {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const handleSearch = async (event) => {
		event.preventDefault();
		const data = await (
			await fetch(
				`https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${search}`
			)
		).json();
		navigate("searchList", { state: { data: data.results } });
	};

	return (
		<SearchBox onSubmit={handleSearch}>
			<SearchInput
				type="search"
				placeholder="Search for a movie..."
				required
				value={search}
				onChange={(event) => setSearch(event.target.value)}
			/>
		</SearchBox>
	);
};

const SearchBox = styled.form`
	display: flex;
	width: 30vw;
	padding: 0px 15px;
`;

const SearchInput = styled.input`
	font-size: 20px;
	margin-left: auto;

	display: block;
	width: 60%;
	padding: 14px;
	border-radius: 20px;
	background-color: #9090;
`;

export default Search;
