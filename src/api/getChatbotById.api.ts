import { getChatbotByIdSerializer } from "./serializers/getChatbotById.sertializer";

export const getChatbotByIdApi = async (chatbotId: number) => {
	const res = await fetch(
		`http://localhost:8000/api/v1/chatbots/${chatbotId}`
	);
	const data = await res.json();
	return getChatbotByIdSerializer(data.message);
};
