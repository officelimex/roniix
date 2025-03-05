import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Forget = () => {
	return (
		<Card
			className="p-5 shadow-lg rounded"
			style={{ width: "100%", maxWidth: "400px" }}>
			<h2 className="text-center mb-4">Forgot Password</h2>
			<p className="text-center text-muted">
				Enter your email address and we will send you a link to reset your
				password.
			</p>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>
				<Button variant="primary" type="submit" className="w-100">
					Send Reset Link
				</Button>
			</Form>
			<p className="text-center mt-3">
				Remembered your password? <Link to="/">Login</Link>
			</p>
		</Card>
	);
};

export default Forget;
