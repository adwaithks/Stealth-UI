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
