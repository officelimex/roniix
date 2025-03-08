import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Layout: React.FC = () => {
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
			<Sidebar />

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
					<div className="text-center fs-tiny pb-1 fixed-bottom">
						Copyright Officelime Software Ltd
					</div>
				</div>

				{/* Footer */}
				<div></div>
			</div>
		</Container>
	);
};

export default Layout;
