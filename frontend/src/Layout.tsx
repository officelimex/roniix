import { Container, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<Container
			fluid
			className="vh-100 p-0 d-flex"
			style={{
				backgroundImage: "url('https://picsum.photos/1920/1080')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Sidebar */}
			<div
				style={{
					width: "220px",
					backgroundColor: "rgba(0, 0, 0, 0.6)",
					display: "flex",
					flexDirection: "column",
					height: "100vh",
				}}
				className="text-white"
			>
				{/* Brand Area */}
				<div className="text-center m-3">
					<h4 className="fw-bold">🟢 Roniix</h4>
				</div>

				{/* Sidebar Menu Container */}
				<div className="flex-grow-1 overflow-auto">
					<Nav className="flex-column">
						{Array.from({ length: 40 }).map((_, i) => (
							<Nav.Link key={i} href="#" className="text-white">
								<i className="bi bi-folder me-2"></i> Menu {i + 1}
							</Nav.Link>
						))}
					</Nav>
				</div>

				{/* Footer */}
				<div className="text-center m-3">
					<div
						className=" p-2 rounded"
						style={{
							backgroundColor: "rgba(0, 0, 0, 0.6)",
							color: "grey",
						}}
					>
						Footer section to say something important, and its will be cool
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div
				style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.85)" }}
				className="d-flex flex-column justify-content-between"
			>
				{/* User Profile Section */}
				<div className="d-flex justify-content-end p-3">
					<img
						src="https://avatar.iran.liara.run/public/boy"
						alt="User Profile"
						className="rounded-circle"
						width="32px"
					/>
				</div>

				{/* Page Content */}
				<div className="flex-grow-1 px-4 overflow-auto">
					<Outlet />
				</div>

				{/* Footer */}
				<div className="text-center fs-tiny  pb-2">Copyright Officelime Software Ltd</div>
			</div>
		</Container>
	);
};

export default Layout;
