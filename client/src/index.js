import App from "./App";
import Auth0Prov from "./authentication/auth0-prov";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Auth0Prov>
			<App />
		</Auth0Prov>
	</Router>
);
