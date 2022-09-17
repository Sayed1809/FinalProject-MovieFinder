import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/Home";
import LeftSideBar from "./components/LeftSideBar";
import MovieDetails from "./pages/MovieDetails";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import ProtectedRoute from "./authentication/protected-route";
import SearchPage from "./pages/SearchPage";
import styled from "styled-components";
//fix
function App() {
	return (
		<Container>
			<GlobalStyles />
			<Nav>
				<NavBar />
			</Nav>
			<LeftAside>
				<LeftSideBar />
			</LeftAside>
			<Main>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/profile" element={<ProtectedRoute component={Profile} />} />
					<Route exact path="/searchList" element={<SearchPage />} />
					<Route exact path="/movie/:id" element={<MovieDetails />} />
				</Routes>
			</Main>
			<RightAside></RightAside>
			<FooterDiv>
				<Footer />
			</FooterDiv>
		</Container>
	);
}
const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const Nav = styled.div`
	flex: 0 0 100%;
	height: 15%;
	margin-bottom: 1rem;
`;

const LeftAside = styled.div`
	flex: 0 0 15%;
	min-width: 12%;
`;

const Main = styled.div`
	flex: 0 0 70%;
	padding-bottom: 2%;
	min-width: 60%;
`;

const RightAside = styled.div`
	flex: 0 0 15%;
	min-width: 12%;
`;

const FooterDiv = styled.div`
	flex: 0 0 100%;
`;

export default App;
