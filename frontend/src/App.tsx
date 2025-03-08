import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AuthLayout from "./AuthLayout";
// import PrivateRoute from "./PrivateRoute";
import Login from "./auth/Login";
import Forget from "./auth/Forget";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
import useThemeStore from "@/store/useThemeStore";

function App() {
	const { theme } = useThemeStore();
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);
	return (
		<Router>
			<Routes>
				{/* 				<Route path="/" element={<PrivateRoute />}>
					<Route index element={<Layout />} />
				</Route> */}
				<Route path="/" element={<Layout />}>
					<Route index element={<Dashboard />} />
				</Route>
				<Route path="/auth" element={<AuthLayout />}>
					<Route index element={<Login />} />
					<Route path="forget" element={<Forget />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
