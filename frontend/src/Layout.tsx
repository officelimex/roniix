import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import {
	House,
	People,
	BarChart,
	BoxArrowRight,
	Moon,
	Sun,
	Search,
	List,
	XLg,
} from "react-bootstrap-icons";

const Layout = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	const [screenSize, setScreenSize] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const isMobile = screenSize <= 768;
	const sidebarWidth = isSidebarOpen ? 250 : 60;

	return (
		<div className={darkMode ? "dark-mode" : ""}>
			<Container fluid className="p-0">
				<Row className="g-0">
					{/* Sidebar */}
					<Col
						xs="auto"
						className="sidebar bg-dark text-white d-flex flex-column position-fixed"
						style={{
							width: sidebarWidth,
							transition: "width 0.3s ease-in-out",
							height: "100vh",
						}}>
						{/* Logo Section */}
						<div className="logo p-3 text-center border-bottom">
							{isSidebarOpen ? <h5>LOGO</h5> : <h5>LG</h5>}
						</div>

						{/* Menu */}
						<Nav className="flex-column flex-grow-1 p-2">
							{[
								{ icon: <House size={25} />, text: "Dashboard" },
								{ icon: <People size={25} />, text: "Employees" },
								{ icon: <BarChart size={25} />, text: "Reports" },
							].map((item, index) => (
								<Nav.Link
									key={index}
									className="text-white d-flex align-items-center py-2"
									href="#">
									{item.icon}
									{isSidebarOpen && <span className="ms-2">{item.text}</span>}
								</Nav.Link>
							))}
						</Nav>

						{/* Logout */}
						<div className="p-3 border-top text-center">
							<Button variant="outline-danger" className="w-100">
								<BoxArrowRight /> {isSidebarOpen && "Logout"}
							</Button>
						</div>
					</Col>

					{/* Main Content */}
					<Col
						className="content-area"
						style={{
							marginLeft: sidebarWidth,
							transition: "margin-left 0.3s ease-in-out",
						}}>
						{/* Header */}
						<Navbar
							bg="light"
							className="px-3 fixed-top d-flex justify-content-between"
							style={{
								marginLeft: sidebarWidth,
								width: `calc(100% - ${sidebarWidth}px)`,
								transition:
									"margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
							}}>
							{/* Sidebar Toggle */}
							<Button
								variant="outline-dark"
								onClick={() => setSidebarOpen(!isSidebarOpen)}>
								{isSidebarOpen ? <XLg /> : <List />}
							</Button>

							{/* Search Bar */}
							<div className="search-bar flex-grow-1 mx-3">
								<div className="input-group">
									<span className="input-group-text">
										<Search />
									</span>
									<input
										type="text"
										className="form-control"
										placeholder="Search..."
									/>
								</div>
							</div>

							{/* Dark Mode Toggle & Profile */}
							<div className="d-flex align-items-center gap-3">
								<Button
									variant="outline-dark"
									onClick={() => setDarkMode(!darkMode)}>
									{darkMode ? <Sun /> : <Moon />}
								</Button>
								<img
									src="https://via.placeholder.com/40"
									alt="Profile"
									className="rounded-circle"
								/>
							</div>
						</Navbar>

						{/* Page Content */}
						<div className="main-content mt-5 p-4">
							<Outlet />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Layout;
