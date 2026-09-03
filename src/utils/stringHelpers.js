export function getInitials(name) {
	return name
		.trim()
		.split(/\s+/)
		.map((word) => word[0].toUpperCase())
		.join("");
}

export function capitalizeFirstLetter(string) {
	return string.trim().charAt(0).toUpperCase() + string.trim().slice(1);
}
