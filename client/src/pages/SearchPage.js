import { NavLink, useLocation } from "react-router-dom";

import React from "react";
import styled from "styled-components";

const SearchPage = () => {
    //get movies list
    const { state } = useLocation();

    //if list then set it
    let movieList;
    if (state.data) {
        //only get the first 20 movies
        movieList = state.data.slice(0, 20);
    }

    return (
        <div>
            <Title>Result:</Title>
            <SearchWrap>
                {movieList &&
                    movieList.map((movie) => {
                        return (
                            <div key={movie.id}>
                                <LinkNav to={`/movie/${movie.id}`}>
                                    <Img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} />
                                    <Text>{movie.title} </Text>
                                </LinkNav>
                            </div>
                        );
                    })}
            </SearchWrap>
        </div>
    );
};

const SearchWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    justify-content: flex-start;
`;

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

const LinkNav = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
    margin: 0 25px;

    &:hover {
        img {
            transform: scale(1.05);
        }
    }
`;

export default SearchPage;