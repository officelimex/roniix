import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import AppHeader from "./components/AppHeader";

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

			<div className="d-flex flex-column justify-content-between main-section">
				<AppHeader />

				<div className="flex-grow-1 px-4 overflow-auto main-side-bg">
					<Outlet />
					<div className="text-center fs-tiny pb-1 fixed-bottom">
						Copyright Officelime Software Ltd
					</div>
				</div>

				<div></div>
			</div>
		</Container>
	);
};

export default Layout;
