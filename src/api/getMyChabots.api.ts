import { getMyChatbotsSerializer } from "./serializers/getMyChatbots.serializer";

export const getMyChatbotsApi = async (token: string) => {
	const res = await fetch("http://localhost:8000/api/v1/chatbots/all", {
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});
	const data = await res.json();
	return getMyChatbotsSerializer(data.message);
};
