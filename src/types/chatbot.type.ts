export interface Chatbot {
	chatbotId: number;
	chatbotName: string;
	fineTune: string;
	creationDate: string;
	lastUpdated: string;
	trainStatus: string;
	taskId: string;
	links: ILink[];
	domains: string[];
	status: string;
	position: string;
	chatbotHashId: string;
	primaryBgColor: string;
	quickReplies: QuickReply[];
}

export interface ILink {
	linkId: number;
	link: string;
	trainStatus: string;
	taskId: string;
}

export interface ILinkDTO {
	link_id: number;
	link: string;
	train_status: string;
	task_id?: string;
}

export interface ChatbotDTO {
	chatbot_id: number;
	chatbot_name: string;
	fine_tune: string;
	train_status: string;
	creation_date: string;
	task_id?: string;
	last_updated: string;
	links: ILinkDTO[];
	domains: string;
	status: string;
	position: string;
	primary_bg_color: string;
	chatbot_hash_id: string;
	quick_replies: QuickReplyDTO[];
}

export interface QuickReplyDTO {
	qr_id: number;
	question: string;
	keyword: string;
	chatbot_id?: number;
}

export interface QuickReply {
	quickReplyId: number;
	question: string;
	keyword: string;
	chatbotId?: number;
}
