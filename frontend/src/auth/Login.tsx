import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import apiService from "@/services/ApiService1";

const Login = () => {
	const navigate = useNavigate();
	const { setToken } = useAuthStore();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const response = await apiService.post<{ token: string }>("/auth/signin", {
				email,
				password,
			});

			setToken(response.token);
			navigate("/");
		} catch (err: any) {
			setError(err.response?.data?.message || "Login failed");
		}
	};

	return (
		<Card className="p-5 shadow-lg rounded" style={{ width: "100%", maxWidth: "400px" }}>
			<h2 className="text-center mb-5">
				Sign In
				<div className="text-gray fs-base">Welcome back again</div>
			</h2>

			{error && <div className="alert alert-danger">{error}</div>}

			<Form onSubmit={handleLogin}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" className="w-100">
					Login
				</Button>
				<div className="text-center fs-base p-1">
					<Link to="/auth/forget">Forgot password</Link>
				</div>
			</Form>

			<div className="text-center mt-3">
				<div className="d-flex align-items-center my-3">
					<hr className="flex-grow-1 mx-2" />
					<div className="text-muted">Or Sign in with</div>
					<hr className="flex-grow-1 mx-2" />
				</div>

				<Button
					variant="outline-danger"
					className="w-100 mb-2 d-flex align-items-center justify-content-center"
				>
					<i className="bi bi-google me-2"></i> Sign in with Google
				</Button>
				<Button
					variant="outline-primary"
					className="w-100 d-flex align-items-center justify-content-center"
				>
					<i className="bi bi-microsoft me-2"></i> Sign in with Microsoft
				</Button>
			</div>

			<p className="text-center mt-3">
				Don't have an account? <Link to="/">Sign up</Link>
			</p>
		</Card>
	);
};

export default Login;
