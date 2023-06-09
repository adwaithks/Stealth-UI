export function validateURL(url: string) {
	// Regular expression pattern to match the URL
	const urlPattern =
		/^(https?:\/\/)?(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|([a-zA-Z0-9]+\.)+[a-zA-Z]{2,})(:\d+)?(\/\S*)?$/;

	// Test the URL against the pattern
	const isValidURL = urlPattern.test(url);

	return isValidURL;
}
