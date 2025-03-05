import { Navigate, Outlet } from "react-router-dom";

// Replace this with your actual authentication check logic
const isAuthenticated = () => {
	// Check if the user is logged in, e.g., check a token in localStorage or state
	return localStorage.getItem("authToken") !== null;
};

const PrivateRoute = () => {
	if (!isAuthenticated()) {
		// Redirect to login page if the user is not authenticated
		return <Navigate to="/auth" />;
	}

	return <Outlet />; // If authenticated, render child routes
};

export default PrivateRoute;
