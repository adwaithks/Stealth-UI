import { BASE_URL } from "./baseURL";
import { getChatbotByIdSerializer } from "./serializers/getChatbotById.sertializer";

export const getChatbotByIdApi = async (chatbotId: number, token: string) => {
	const res = await fetch(BASE_URL + `/api/v1/chatbots/${chatbotId}`, {
		headers: {
			"STEALTH-ACCESS-TOKEN": token,
		},
	});
	const data = await res.json();
	return getChatbotByIdSerializer(data.message);
};
