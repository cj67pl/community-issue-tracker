const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const apiRequest = async (endpoint, options = {}) => {
	const token = localStorage.getItem("token");

	try {
		const response = await fetch(`${API_URL}${endpoint}`, {
			...options,
			headers: {
				"Content-Type": "application/json",
				...(token && {
					Authorization: `Bearer ${token}`,
				}),
				...options.headers,
			},
		});

		const data = await response.json();

		if (response.status === 401 && token) {
			localStorage.removeItem("token");
			localStorage.removeItem("user");

			window.dispatchEvent(new Event("session-expired"));
		}

		if (!response.ok) {
			throw new Error(
				data.error ||
					data.message ||
					"Something went wrong. Please try again.",
			);
		}

		return data;
	} catch (error) {
		if (error.name === "TypeError") {
			throw new Error(
				"Unable to connect to the server. Please try again.",
			);
		}

		throw error;
	}
};

export const buildApiUrl = (endpoint) => `${API_URL}${endpoint}`;
