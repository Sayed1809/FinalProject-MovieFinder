import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

//privacy
const ProtectedRoute = ({ component, ...args }) => {
	const Component = withAuthenticationRequired(component, args);
	return <Component />;
};

export default ProtectedRoute;
