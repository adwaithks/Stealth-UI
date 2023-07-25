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

// Function to convert ISO date and time to local date and time
export function convertToUserLocationDateTime(isoDateTime: Date | string) {
	// Parse the ISO date string to a Date object
	let utcDate: Date = isoDateTime as Date;
	if (typeof isoDateTime === "string") utcDate = new Date(isoDateTime);

	// Get the user's timezone offset in minutes
	const userTimezoneOffset = new Date().getTimezoneOffset();

	// Convert the UTC date to the user's local date by adding the timezone offset
	const userLocalDate = new Date(
		utcDate.getTime() - userTimezoneOffset * 60000
	);

	// Format the date and time in the desired format
	const formattedDate = userLocalDate.toLocaleDateString();
	const formattedTime = userLocalDate.toLocaleTimeString(undefined, {
		hour12: true,
		hour: "numeric",
		minute: "numeric",
	});

	return {
		date: formattedDate,
		time: formattedTime,
	};
}

export function isTimeDifferenceAtLeastNHours(
	dateString1: string | Date,
	dateString2: string | Date,
	n: number
) {
	let date1 = dateString1 as Date;
	let date2 = dateString2 as Date;
	if (typeof dateString1 === "string") date1 = new Date(dateString1);
	if (typeof dateString2 === "string") date2 = new Date(dateString2);

	// Calculate the time difference in milliseconds
	const timeDifferenceInMillis = Math.abs(date1.getTime() - date2.getTime());

	// Convert the time difference to hours
	const timeDifferenceInHours = timeDifferenceInMillis / (1000 * 60 * 60);

	// Compare the time difference with n and return the result
	return timeDifferenceInHours >= n;
}

export function getTimeAgo(givenDateTime: Date | string) {
	let givenDate: any = givenDateTime as Date;
	if (typeof givenDateTime === "string") givenDate = new Date(givenDateTime);

	const currentDateTime: any = new Date();
	const timeDifference = currentDateTime - givenDate;

	const seconds = Math.floor(timeDifference / 1000);
	if (seconds < 60) {
		return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
	}

	const minutes = Math.floor(timeDifference / (1000 * 60));
	if (minutes < 60) {
		return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
	}

	const hours = Math.floor(timeDifference / (1000 * 60 * 60));
	if (hours < 24) {
		return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
	}

	const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	if (days < 30) {
		return days === 1 ? "1 day ago" : `${days} days ago`;
	}

	const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
	return months === 1 ? "1 month ago" : `${months} months ago`;
}
