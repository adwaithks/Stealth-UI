import { getMyChatbotsSerializer } from "./serializers/getMyChatbots.serializer";

export const getMyChatbotsApi = async () => {
	const res = await fetch("http://localhost:8000/api/v1/chatbots/all");
	const data = await res.json();
	return getMyChatbotsSerializer(data.message);
};
