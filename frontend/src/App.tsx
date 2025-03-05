import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AuthLayout from "./AuthLayout";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component
import Login from "./auth/Login";
import Forget from "./auth/Forget";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<PrivateRoute />}>
					<Route index element={<Layout />} />
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
