export function formatRelativeTime(dateInput) {
    const date = new Date(dateInput);
    const now = new Date();
    const diffInSeconds = Math.floor((now-date) / 1000);

    if (diffInSeconds < 1) return "1s ago";

    const intervals = [
		{ label: "year", seconds: 31536000 },
		{ label: "month", seconds: 2592000 }, 
		{ label: "week", seconds: 604800 },
		{ label: "day", seconds: 86400 },
		{ label: "h", seconds: 3600 },
		{ label: "min", seconds: 60 },
		{ label: "s", seconds: 1 },
	];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);

        if (count >= 1) {
            const plural = count > 1 && !["s", "min", "h"].includes(interval.label);
            return `${count}${interval.label}${plural ? 's' : ''} ago`;
        }

    }

    return "1s ago";

}