export const formatDateTime = (datetime: string) => {
	const date = new Date(datetime);

	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;

	function getOrdinalSuffix(day: number) {
		if (day >= 11 && day <= 13) {
			return "th";
		}
		switch (day % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	}

	return formattedDate;
};

export function getTimeAgo(dateString: string | undefined) {
	if (!dateString) return "";
	const date = new Date(dateString);
	const now = new Date();

	// Calculate the time difference in milliseconds
	const timeDiff = now.getTime() - date.getTime();

	// Convert the time difference to minutes, hours, days, or months
	const minutes = Math.floor(timeDiff / (1000 * 60));
	const hours = Math.floor(timeDiff / (1000 * 60 * 60));
	const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));

	if (minutes < 60) {
		return minutes + " minutes ago";
	} else if (hours < 24) {
		return hours + " hours ago";
	} else if (days < 30) {
		return days + " days ago";
	} else {
		return months + " months ago";
	}
}
