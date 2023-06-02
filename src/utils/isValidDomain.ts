export function isValidDomain(input: any) {
	const regex =
		/^(?!.*:\/\/)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
	return regex.test(input);
}
