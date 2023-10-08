import axios from "axios";
import { getCookie } from "cookies-next";

const axiosService = axios.create({
	baseURL: "http://localhost:5500",
});
axiosService.interceptors.request.use(
	async function (config) {
		const token = getCookie("Authorization");

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosService.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error.response.data);
	}
);
export default axiosService;
