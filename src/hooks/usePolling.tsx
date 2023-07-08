import { useClerk } from "@clerk/clerk-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { BASE_URL } from "../api/baseURL";

type ApiResponse = {
	startPolling: () => void;
	stopPolling: () => void;
	data: any;
}; // Define your API response type here
type StopFunction = (response: ApiResponse) => boolean;

const usePolling = ({
	endpoint,
	stopFunction,
	maxRetries = null,
	delay = 3000,
	options = null,
}: {
	endpoint: string;
	stopFunction: StopFunction;
	maxRetries?: number | null;
	delay?: number;
	options?: {
		method: string;
		body: any;
	} | null;
}): ApiResponse => {
	const [data, setData] = useState<ApiResponse | null>(null);
	const [retryCount, setRetryCount] = useState<number>(0);
	const timerRef = useRef<number | null>(null);
	const [isPolling, setIsPolling] = useState(false);

	const { session } = useClerk();

	const startPolling = useCallback(() => {
		setIsPolling(true);
	}, []);

	const stopPolling = useCallback(() => {
		setIsPolling(false);
		if (timerRef.current) clearInterval(timerRef.current);
	}, []);

	const retry = useCallback((): void => {
		if (
			maxRetries !== null &&
			retryCount >= maxRetries &&
			timerRef.current
		) {
			clearInterval(timerRef.current);
			console.warn("Max retries reached. Stopping API calls.");
			return;
		}

		setRetryCount(retryCount + 1);
	}, [maxRetries, retryCount]);

	const fetchData = useCallback(async (): Promise<void> => {
		try {
			session
				?.getToken({ template: "stealth-token-template" })
				.then(async (token) => {
					if (!token) {
						setData(null);
						return;
					}
					const response = await fetch(BASE_URL + endpoint, {
						method: options ? options.method : "GET",
						headers: {
							"STEALTH-ACCESS-TOKEN": token,
							"Content-Type": "application/json",
						},
						...(options && { body: JSON.stringify(options.body) }),
					});
					const result = await response.json();
					setData(result);
					if (stopFunction(result) && timerRef.current) {
						clearInterval(timerRef.current);
					} else {
						retry();
					}
				});
		} catch (error) {
			console.error("API call failed:", error);
			retry();
		}
	}, [endpoint, session, retry]);

	useEffect(() => {
		if (isPolling) {
			fetchData(); // Call API immediately

			// Start interval timer
			timerRef.current = setInterval(fetchData, delay);

			return () => {
				if (timerRef.current)
					// Cleanup function to stop interval timer
					clearInterval(timerRef.current);
			};
		}
	}, [isPolling, delay, fetchData]);

	return { startPolling, stopPolling, data };
};

export default usePolling;
