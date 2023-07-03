const ENVIRON = import.meta.env.VITE_ENVIRON;

export const BASE_URL =
	ENVIRON == "DEV" ? "http://localhost:8000" : "https://api.assistdesk.in";
// export const BASE_URL = "";
