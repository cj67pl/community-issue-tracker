export const allowedRanges = [
	"7",
	"30",
	"90",
	"this_month",
	"last_month",
	"this_year",
];

export const getRangeCondition = (range) => {
	if (!allowedRanges.includes(range)) {
		return null;
	}

	let interval;
	let dateCondition;
	let previousDateCondition;

	switch (range) {
		case "7":
			interval = "day";
			dateCondition = `issues.reported_at >= CURRENT_DATE - INTERVAL '6 days'`;
			previousDateCondition = `
				reported_at >= CURRENT_DATE - INTERVAL '13 days'
				AND reported_at < CURRENT_DATE - INTERVAL '6 days'
			`;
			break;

		case "30":
			interval = "week";
			dateCondition = `reported_at >= CURRENT_DATE - INTERVAL '29 days'`;
			previousDateCondition = `
				reported_at >= CURRENT_DATE - INTERVAL '59 days'
				AND reported_at < CURRENT_DATE - INTERVAL '29 days'
			`;
			break;

		case "90":
			interval = "week";
			dateCondition = `reported_at >= CURRENT_DATE - INTERVAL '89 days'`;
			previousDateCondition = `
				reported_at >= CURRENT_DATE - INTERVAL '179 days'
				AND reported_at < CURRENT_DATE - INTERVAL '89 days'
			`;
			break;

		case "this_month":
			interval = "day";
			dateCondition = `reported_at >= DATE_TRUNC('month', CURRENT_DATE)`;
			previousDateCondition = `
				reported_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
				AND reported_at < DATE_TRUNC('month', CURRENT_DATE)
			`;
			break;

		case "last_month":
			interval = "day";
			dateCondition = `
				reported_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
				AND reported_at < DATE_TRUNC('month', CURRENT_DATE)
			`;
			previousDateCondition = `
				reported_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '2 months')
				AND reported_at < DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
			`;
			break;

		case "this_year":
			interval = "month";
			dateCondition = `reported_at >= DATE_TRUNC('year', CURRENT_DATE)`;
			previousDateCondition = `
				reported_at >= DATE_TRUNC('year', CURRENT_DATE - INTERVAL '1 year')
				AND reported_at < DATE_TRUNC('year', CURRENT_DATE)
			`;
			break;
		default:
			return null;
	}

	const allowedIntervals = ["day", "week", "month"];
	if (!allowedIntervals.includes(interval)) {
		return null;
	}

	return { interval, dateCondition, previousDateCondition };
};
