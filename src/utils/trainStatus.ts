export function getStatusObject(status: string) {
	switch (status) {
		case "TRAINING_PENDING":
			return { text: "Training Pending", color: "orange" };
		case "TRAINING_REJECTED":
			return { text: "Training Rejected", color: "red" };
		case "TRAINING_SUCCESS":
			return { text: "Training Success", color: "green" };
		case "RETRAINING_PENDING":
			return { text: "Retraining Pending", color: "orange" };
		case "RETRAINING_REJECTED":
			return { text: "Retraining Rejected", color: "red" };
		case "RETRAINING_SUCCESS":
			return { text: "Retraining Success", color: "green" };
		default:
			return { text: "Fetching Status...", color: "orange" };
	}
}
