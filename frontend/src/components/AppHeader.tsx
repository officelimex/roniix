import ThemeSwitcher from "./ThemeSwitcher";
export default function AppHeader() {
	return (
		<div className="d-flex justify-content-end p-3 app-head-bg">
			<ThemeSwitcher />
			<img
				src="https://avatar.iran.liara.run/public/boy"
				alt="User Profile"
				className="rounded-circle"
				width="32px"
				height="32px"
			/>
		</div>
	);
}
