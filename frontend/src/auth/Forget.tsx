import { Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import apiService from "@/services/ApiService1";
import { Link } from "react-router-dom";

const Forget = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");
		setError("");

		try {
			await apiService.post("/auth/forgot-password", { email });
			setMessage("Check your email for reset instructions.");
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to send reset link");
		}
	};

	return (
		<Card className="p-5 shadow-lg rounded" style={{ width: "100%", maxWidth: "400px" }}>
			<h2 className="text-center mb-5">Reset Password</h2>
			<p className="text-center text-muted">
				Enter your email address and we will send you a link to reset your password.
			</p>

			{message && <div className="alert alert-success">{message}</div>}
			{error && <div className="alert alert-danger">{error}</div>}

			<Form onSubmit={handleReset}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" className="w-100">
					Send Reset Link
				</Button>
			</Form>
			<p className="text-center mt-3">
				Remembered your password? <Link to="/auth/login">Login</Link>
			</p>
		</Card>
	);
};

export default Forget;
