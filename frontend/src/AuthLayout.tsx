import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<Container
			fluid
			className="vh-100 p-0 m-0"
			style={{
				backgroundImage: "url('https://picsum.photos/1920/1080')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<Row className="h-100 g-0 ">
				<Col
					md={6}
					className="auth-left p-5 vh-100 d-flex gap-5 flex-column align-items-center justify-content-center"
				>
					<div className="logo">
						<span className="text">Roniix</span>
					</div>
					<img
						src="/screen1.png"
						alt="Auth Screen"
						style={{ maxHeight: "50%" }}
						className="img-fluid"
					/>
					<div className="text-center ">
						<h1 className="fs-2qx">Fast, Efficient and Productive</h1>
						<p className="fs-base">
							In this kind of post, the blogger introduces a person they've interviewed and provides
							some background information about the interviewee and their work following this is a
							transcript of the interview.
						</p>
					</div>
				</Col>

				<Col
					md={6}
					className="d-flex flex-column align-items-center justify-content-between auth-main"
				>
					<div></div>
					<Outlet />
					<div className="text-center fs-tiny p-4">
						Copyright Officelime Software Ltd <br />
						Terms | Privacy Policy
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default AuthLayout;
