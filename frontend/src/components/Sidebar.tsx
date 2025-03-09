import { useState } from "react";
import { Nav, Accordion } from "react-bootstrap";

interface SubmenuItem {
	name: string;
	icon: string;
}

interface MenuItem {
	name: string;
	icon: string;
	submenu?: SubmenuItem[];
}

export default function Sidebar() {
	const [activeMenu, setActiveMenu] = useState<string>("Dashboard");
	const [openSubmenu, setOpenSubmenu] = useState<string | null>(null); // Stores the currently open submenu

	const menuItems: MenuItem[] = [
		{ name: "Dashboard", icon: "bi bi-speedometer2" },
		{ name: "Employee", icon: "bi bi-people-fill" },
		{
			name: "Projects",
			icon: "bi bi-folder-fill",
			submenu: [
				{ name: "All Projects", icon: "bi bi-clipboard-data" },
				{ name: "Ongoing", icon: "bi bi-hourglass-split" },
				{ name: "Completed", icon: "bi bi-check-circle" },
			],
		},
		{
			name: "Reports",
			icon: "bi bi-bar-chart-fill",
			submenu: [
				{ name: "Monthly Reports", icon: "bi bi-calendar3" },
				{ name: "Annual Reports", icon: "bi bi-calendar-check" },
			],
		},
		{ name: "Settings", icon: "bi bi-gear-fill" },
		{ name: "Logout", icon: "bi bi-box-arrow-right" },
	];
	const handleMenuClick = (item: MenuItem): void => {
		setActiveMenu(item.name);

		if (item.submenu) {
			setOpenSubmenu((prev) => (prev === item.name ? null : item.name));
		}
	};

	return (
		<>
			<div
				style={{
					width: "220px",
				}}
				className=" vh-100 d-flex flex-column sidebar-gb sidebar"
			>
				{/* Brand Area */}
				<div className="m-4">
					<h4 className="fw-bold">🟢 Roniix</h4>
				</div>

				{/* Sidebar Menu Container */}
				<div className="flex-grow-1 overflow-auto">
					<Nav className="flex-column">
						{menuItems.map((item, index) =>
							item.submenu ? (
								<Accordion
									key={item.name}
									activeKey={openSubmenu === item.name ? index.toString() : null}
									className=""
								>
									<Accordion.Item eventKey={index.toString()} className="bg-transparent">
										<Accordion.Header
											className={` ${activeMenu === item.name && "active bg-primary"}`}
											onClick={() => handleMenuClick(item)}
										>
											<i className={`${item.icon} me-3`}></i>
											{item.name}
										</Accordion.Header>
										<Accordion.Body className="p-0">
											<Nav className="flex-column">
												{item.submenu.map((sub) => (
													<Nav.Link
														key={sub.name}
														className={` py-2 px-5 ${
															activeMenu === sub.name && "active bg-secondary"
														}`}
														onClick={() => setActiveMenu(sub.name)}
													>
														<i className={`${sub.icon} me-2`}></i>
														{sub.name}
													</Nav.Link>
												))}
											</Nav>
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							) : (
								<Nav.Link
									key={item.name}
									className={` py-2 px-3 ${activeMenu === item.name && "active bg-primary"}`}
									onClick={() => handleMenuClick(item)}
								>
									<i className={`${item.icon} me-3`}></i>
									{item.name}
								</Nav.Link>
							)
						)}
					</Nav>
				</div>
				{/* Footer */}
				<div className="text-center m-3">
					<div
						className="p-2 rounded"
						style={{
							backgroundColor: "rgba(0, 0, 0, 0.6)",
							color: "grey",
						}}
					>
						Footer section to say something important, and it will be cool
					</div>
				</div>
			</div>
		</>
	);
}
