import useThemeStore from "@/store/useThemeStore";

const ThemeSwitcher: React.FC = () => {
	const { theme, toggleTheme } = useThemeStore();

	return (
		<a className="p-2 me-3" onClick={toggleTheme} aria-label="Toggle Theme">
			{theme === "light" ? (
				<i className="bi bi-moon-fill text-dark"></i>
			) : (
				<i className="bi bi-sun-fill text-white"></i>
			)}
		</a>
	);
};

export default ThemeSwitcher;
