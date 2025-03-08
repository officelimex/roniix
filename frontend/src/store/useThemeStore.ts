import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
	theme: Theme;
	toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
	theme: (localStorage.getItem("theme") as Theme) || "light",
	toggleTheme: () =>
		set((state) => {
			const newTheme: Theme = state.theme === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			document.documentElement.setAttribute("data-theme", newTheme);
			return { theme: newTheme };
		}),
}));

export default useThemeStore;
