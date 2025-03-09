import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";

class ApiService {
	private axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: import.meta.env.VITE_API_BASE_URL,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		});

		// Attach token automatically before each request
		this.axiosInstance.interceptors.request.use((config) => {
			const token = useAuthStore.getState().token;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		});
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.axiosInstance.get<T>(url, config);
		return response.data;
	}

	async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.axiosInstance.post<T>(url, data, config);
		return response.data;
	}

	async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.axiosInstance.patch<T>(url, data, config);
		return response.data;
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.axiosInstance.delete<T>(url, config);
		return response.data;
	}
}

export default new ApiService();
