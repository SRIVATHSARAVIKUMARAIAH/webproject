import { Navigate } from "react-router-dom";

import { fetchUser, fetchRestUser, fetchAdminUser } from "../utils/fetchLocalStorageData";

function PrivateRoute({ children, role = "" }) {
	let roleData;
	let loginRoute = "/";

	switch (role) {
		case "user":
			roleData = fetchUser();
			loginRoute = "/";
			break;

		case "restUser":
			roleData = fetchRestUser();
			loginRoute = "/restaurant-login";
			break;

		case "admin":
			roleData = fetchAdminUser();
			loginRoute = "/admin-login";
			break;
		default:
			break;
	}

	return roleData ? <>{children}</> : <Navigate to={loginRoute} />;
}

export default PrivateRoute;
