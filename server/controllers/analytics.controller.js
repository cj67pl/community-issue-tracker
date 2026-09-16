import pool from "../config/db.js";
import { isNonEmptyString, isValidId } from "../utils/validation.js";
import { getRangeCondition } from "../utils/dateRange.js";

export const getAverage = async (req, res, next) => {
	// console.log("cj");

	try {
		const total_issues = await pool.query(`
            SELECT COUNT(*) FROM issues
            
        `);
		console.log(total_issues.rows);
		res.json(total_issues.rows);
	} catch (error) {
		next(error);
	}
};

export const getAnalyticsKpi = async (req, res, next) => {
	const { range = "30" } = req.query;

	const parsed = getRangeCondition(range);
	if (!parsed) {
		return res.status(400).json({ error: "Invalid date range" });
	}

	const { dateCondition, previousDateCondition } = parsed;

	try {
		//     /*const allIssues = await pool.query(`
		// 	    SELECT COUNT(*) FROM issues

		// 	`);

		// 	const resolvedDays = await pool.query (`
		// 	    SELECT updated_at
		// 	        FROM issues
		// 	        LEFT JOIN statuses
		// 	            ON issues.status_id = statuses.id
		// 	        WHERE statuses.status_name = $1;

		// 	    `, ["Resolved"]);

		// 	console.log(resolvedDays.rows.updated_at);
		// 	const daysList = resolvedDays.rows.map((row) => row.updated_at);
		// 	let totalDays = 0;
		// 	const msPerDay = 1000 * 60 * 60 * 24;

		// 	for(let i=1; i<daysList.length; i++) {
		// 	    const date1 = new Date(daysList[i - 1]);
		// 	    const date2 = new Date(daysList[i]);
		// 	    const diffInMs = Math.abs(date2 - date1);
		// 	    totalDays += diffInMs / msPerDay;
		// 	}

		// 	const average = totalDays / (daysList.length - 1);
		// 	console.log(Math.round(average * 100) / 100);

		// 	const averageResolution = await pool.query(
		// 		`
		// 	        SELECT
		// 	            id,
		// 	            reported_at,
		// 	            updated_at,
		// 	            updated_at - reported_at AS resolution_interval,
		// 	            EXTRACT(EPOCH FROM (updated_at - reported_at)) / 86400 AS resolution_days
		// 	        FROM issues
		// 	        JOIN statuses
		// 	            ON issues.status_id = statuses.id
		// 	        WHERE statuses.status_name = $1;
		// 	`,
		// 		["Resolved"],
		// 	);
		// 	const average_days = averageResolution.rows[0].average_days
		// 	*/

		// 	//Resolution Time
		//     const now = new Date();

		// 	const currentMonthStart = new Date(
		// 		now.getFullYear(),
		// 		now.getMonth(),
		// 		1,
		// 	);

		// 	const nextMonthStart = new Date(
		// 		now.getFullYear(),
		// 		now.getMonth() + 1,
		// 		1,
		// 	);

		// 	const previousMonthStart = new Date(
		// 		now.getFullYear(),
		// 		now.getMonth() - 1,
		// 		1,
		// 	);

		// 	const currentMonth = await pool.query(
		// 		`
		//         SELECT ROUND(
		//             AVG(
		//                 EXTRACT(EPOCH FROM (updated_at - reported_at)) / 86400
		//             )::numeric,
		//             1
		//         ) AS average_days
		//         FROM issues
		//         JOIN statuses
		//             ON issues.status_id = statuses.id
		//         WHERE statuses.status_name = $1
		//             AND resolved_at >= $2
		//             AND resolved_at < $3;
		//     `,
		// 		["Resolved", currentMonthStart, nextMonthStart],
		// 	);

		// 	// console.table(averageResolution.rows);
		//     const lastMonth = await pool.query(
		//         `
		//             SELECT ROUND(
		//                 AVG(
		//                     EXTRACT(EPOCH FROM (resolved_at - reported_at)) / 86400
		//                 )::numeric,
		//                 1
		//             ) AS average_days
		//             FROM issues
		//             JOIN statuses
		//                 ON issues.status_id = statuses.id
		//             WHERE statuses.status_name = $1
		//             AND resolved_at >= $2
		//             AND resolved_at < $3;
		//         `,
		// 		["Resolved", previousMonthStart, currentMonthStart],
		// 	);
		// 	const currentAverage = Number(currentMonth.rows[0].average_days || 0);
		// 	const previousAverage = Number(lastMonth.rows[0].average_days || 0);

		//     const difference = currentAverage - previousAverage;
		// 	const direction = currentAverage > previousAverage ? "down" : "up";

		//     // console.log(averageDays);
		//     const averageResolution = {
		// 		current: currentAverage,
		// 		change: Math.abs(difference),
		// 		direction,
		// 	};

		// 	// console.log(averageResolution);

		//     //--------Resolution Rate
		//     const allIssues = await pool.query(
		// 		`
		//            SELECT COUNT(*) FROM issues
		//         `,
		// 	);
		//     // console.log(allIssues.rows[0].count);

		//     const allResolved = await pool.query (
		//         `
		//             SELECT COUNT(*)
		//                 FROM issues
		//             WHERE status_id = $1
		//         ` ,[2]
		//     )
		//     // console.log(allResolved.rows[0].count);
		//     const resRate = ((allResolved.rows[0].count / allIssues.rows[0].count) * 100).toFixed(2)

		//     // console.log(resRate);
		//     const resolutionRate = {
		// 		rate: resRate,
		// 		allIssues: allIssues.rows[0].count,
		// 		resolved: allResolved.rows[0].count,
		// 	};

		//     // Total Reports for current month
		//     const currentMonthReps = await pool.query (
		//         `
		//             SELECT COUNT(*)
		//                 FROM issues
		//             WHERE reported_at >= $1
		//                 AND reported_at < $2

		//         `, [currentMonthStart, nextMonthStart]
		//     )
		//     // console.log(currentMonthReps.rows[0].count);
		//     const lastMonthReps = await pool.query(
		// 		`
		//             SELECT COUNT(*)
		//                 FROM issues
		//             WHERE reported_at >= $1
		//                 AND reported_at < $2

		//         `,
		// 		[previousMonthStart, currentMonthStart],
		// 	);
		//     // console.log(lastMonthReps.rows[0].count);
		//     const percentageDifference =
		// 		(((currentMonthReps.rows[0].count - lastMonthReps.rows[0].count) /
		// 			lastMonthReps.rows[0].count) *
		// 		100).toFixed(2);
		//     // console.log(percentageDifference);

		//     const totalMonthlyReports = {
		// 		currentMonthReps: currentMonthReps.rows[0].count,
		// 		percentageDifference:
		// 			percentageDifference < 0
		// 				? percentageDifference
		// 				: `+${percentageDifference}`,
		// 	};

		//     // console.log(totalMonthlyReports);

		// 	const topLocation = await pool.query(`
		// 		SELECT location,
		// 			COUNT(*) AS count
		// 		FROM issues
		// 		GROUP BY location
		// 		ORDER BY count DESC
		// 		LIMIT 1
		// 	`);

		// 	const topReportedLocation = {
		// 		location: topLocation.rows[0]?.location || "N/A",
		// 		count: topLocation.rows[0] ? Number(topLocation.rows[0].count) : 0,
		// 	};

		// 	res.json({
		// 		averageResolution,
		// 		resolutionRate,
		// 		totalMonthlyReports,
		// 		topReportedLocation,
		// 	});
		// } catch (error) {
		// 	next(error);
		// }

		// Resolution Time — current period
		const currentPeriod = await pool.query(`
			SELECT ROUND(
				AVG(EXTRACT(EPOCH FROM (resolved_at - reported_at)) / 86400)::numeric,
				1
			) AS average_days
			FROM issues
			JOIN statuses ON issues.status_id = statuses.id
			WHERE statuses.status_name = 'Resolved'
				AND ${dateCondition};
		`);

		// Resolution Time — previous period
		const previousPeriod = await pool.query(`
			SELECT ROUND(
				AVG(EXTRACT(EPOCH FROM (resolved_at - reported_at)) / 86400)::numeric,
				1
			) AS average_days
			FROM issues
			JOIN statuses ON issues.status_id = statuses.id
			WHERE statuses.status_name = 'Resolved'
				AND ${previousDateCondition};
		`);

		const currentAverage = Number(currentPeriod.rows[0].average_days || 0);
		const previousAverage = Number(
			previousPeriod.rows[0].average_days || 0,
		);
		const difference = currentAverage - previousAverage;
		const direction =
			currentAverage > previousAverage
				? "up"
				: currentAverage < previousAverage
					? "down"
					: "same";

		const averageResolution = {
			current: currentAverage,
			change: Math.abs(difference),
			direction,
		};

		// Resolution Rate — scoped to current period
		const allIssues = await pool.query(`
			SELECT COUNT(*) FROM issues WHERE ${dateCondition};
		`);

		const allResolved = await pool.query(`
			SELECT COUNT(*) FROM issues
			WHERE status_id = 2
				AND ${dateCondition};
		`);

		const resRate =
			allIssues.rows[0].count > 0
				? (
						(allResolved.rows[0].count /
							(allIssues.rows[0].count || 1)) *
						100
					).toFixed(2)
				: null;

		const resolutionRate = {
			rate: resRate,
			allIssues: Number(allIssues.rows[0].count),
			resolved: Number(allResolved.rows[0].count),
		};

		// Total Reports — current vs previous period
		const currentReps = await pool.query(`
			SELECT COUNT(*) FROM issues WHERE ${dateCondition};
		`);

		const previousReps = await pool.query(`
			SELECT COUNT(*) FROM issues WHERE ${previousDateCondition};
		`);

		const prevCount = Number(previousReps.rows[0].count);
		const percentageDifference =
			prevCount > 0
				? (
						((currentReps.rows[0].count - prevCount) / prevCount) *
						100
					).toFixed(2)
				: "0.00";

		const totalMonthlyReports = {
			currentMonthReps: currentReps.rows[0].count,
			percentageDifference:
				percentageDifference < 0
					? percentageDifference
					: `+${percentageDifference}`,
		};

		// Top Location — scoped to current period
		const topLocation = await pool.query(`
			SELECT location, COUNT(*) AS count
			FROM issues
			WHERE ${dateCondition}
			GROUP BY location
			ORDER BY count DESC
			LIMIT 1;
		`);

		const topReportedLocation = {
			location: topLocation.rows[0]?.location || "N/A",
			count: topLocation.rows[0] ? Number(topLocation.rows[0].count) : 0,
		};

		res.json({
			averageResolution,
			resolutionRate,
			totalMonthlyReports,
			topReportedLocation,
		});
	} catch (error) {
		next(error);
	}
};

export const getIssueTrends = async (req, res, next) => {
	const { range = "30" } = req.query;

	const parsed = getRangeCondition(range);
	if (!parsed) {
		return res.status(400).json({
			error: "Invalid date range",
		});
	}

	const { interval, dateCondition } = parsed;

	try {
		const result = await pool.query(`
			SELECT
				DATE_TRUNC('${interval}', reported_at) AS period,
				COUNT(*) AS count
			FROM issues
			WHERE ${dateCondition}
			GROUP BY DATE_TRUNC('${interval}', reported_at)
			ORDER BY period ASC;
			
		`);

		console.log(result.rows);

		const trends = result.rows.map((row) => ({
			label: new Date(row.period).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
			count: Number(row.count),
		}));

		res.json(trends);
	} catch (error) {
		next(error);
	}
};

export const getIssueTrendsByStatus = async (req, res, next) => {
	const { range = "30" } = req.query;

	const parsed = getRangeCondition(range);
	if (!parsed) {
		return res.status(400).json({
			error: "Invalid date range",
		});
	}

	const { interval, dateCondition } = parsed;

	try {
		const result = await pool.query(`
			SELECT
				statuses.status_name as status,
				DATE_TRUNC('${interval}', reported_at) AS period,
				COUNT(*) AS count
			FROM issues
			JOIN statuses 
				ON issues.status_id = statuses.id
			WHERE ${dateCondition}
			GROUP BY statuses.status_name, DATE_TRUNC('${interval}', reported_at)
			ORDER BY period ASC, status ASC;
			
		`);

		console.log(result.rows);

		const trends = result.rows.map((row) => ({
			status: row.status,
			label: new Date(row.period).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
			count: Number(row.count),
		}));

		res.json(trends);
	} catch (error) {
		next(error);
	}
};

// export const getResolutionRate = async (req, res, next) => {
//     try {
//         const getResolutionRate = await pool.query (
//             `
//                 C
//             `
//         )
//     }
//     catch (error) {
//         next(error);
//     }
// }

export const exportReportsCsv = async (req, res, next) => {
	const { range = "30" } = req.query;

	const parsed = getRangeCondition(range);
	if (!parsed) {
		return res.status(400).json({ error: "Invalid date range" });
	}

	const { dateCondition } = parsed;

	try {
		// ----ave resolution time ----
		const currentPeriod = await pool.query(`
			SELECT ROUND(
				AVG(EXTRACT(EPOCH FROM (resolved_at - reported_at)) / 86400)::numeric,
				1
			) AS average_days
			FROM issues
			JOIN statuses ON issues.status_id = statuses.id
			WHERE statuses.status_name = 'Resolved'
				AND ${dateCondition};
		`);
		const averageResolutionDays = Number(
			currentPeriod.rows[0].average_days || 0,
		);

		// ---- resolution rate ----
		const allIssues = await pool.query(`
			SELECT COUNT(*) FROM issues WHERE ${dateCondition};
		`);
		const allResolved = await pool.query(`
			SELECT COUNT(*) FROM issues
			WHERE status_id = 2
				AND ${dateCondition};
		`);
		const totalCount = Number(allIssues.rows[0].count);
		const resolvedCount = Number(allResolved.rows[0].count);
		const resolutionRate =
			totalCount > 0
				? ((resolvedCount / totalCount) * 100).toFixed(2)
				: "0.00";

		// ---- top location ----
		const topLocation = await pool.query(`
			SELECT location, COUNT(*) AS count
			FROM issues
			WHERE ${dateCondition}
			GROUP BY location
			ORDER BY count DESC
			LIMIT 1;
		`);
		const topLocationName = topLocation.rows[0]?.location || "N/A";
		const topLocationCount = topLocation.rows[0]
			? Number(topLocation.rows[0].count)
			: 0;

		// ---- raw issue rows ----
		const result = await pool.query(`
			SELECT
				issues.id,
				issues.title,
				issues.location,
				statuses.status_name AS status,
				issues.reported_at,
				issues.resolved_at
			FROM issues
			LEFT JOIN statuses ON issues.status_id = statuses.id
			WHERE ${dateCondition}
			ORDER BY issues.reported_at DESC;
		`);

		const dataHeaders = [
			"ID",
			"Title",
			"Location",
			"Status",
			"Reported At",
			"Resolved At",
		];
		const dataRows = result.rows.map((row) => [
			row.id,
			escapeCsvField(row.title),
			escapeCsvField(row.location),
			row.status || "",
			row.reported_at ? new Date(row.reported_at).toISOString() : "",
			row.resolved_at ? new Date(row.resolved_at).toISOString() : "",
		]);

		// ---- build summary block ----
		const summaryLines = [
			["Summary"],
			["Metric", "Value"],
			["Average Resolution Time (days)", averageResolutionDays],
			["Resolution Rate (%)", resolutionRate],
			["Total Reports in Period", totalCount],
			[
				"Top Reported Location",
				escapeCsvField(`${topLocationName} (${topLocationCount})`),
			],
			[], // blank line separates summary from raw data
		];

		const summaryCsv = summaryLines.map((r) => r.join(",")).join("\n");
		const dataCsv = [dataHeaders, ...dataRows]
			.map((r) => r.join(","))
			.join("\n");

		const csvContent = `${summaryCsv}\n${dataCsv}`;

		// filename based on actual data bounds
		const dates = result.rows
			.map((r) => r.reported_at)
			.filter(Boolean)
			.map((d) => new Date(d));

		let filename = `reports-${range}`;
		if (dates.length > 0) {
			const minDate = new Date(Math.min(...dates));
			const maxDate = new Date(Math.max(...dates));
			const fmt = (d) => d.toISOString().split("T")[0];
			filename = `reports_${fmt(minDate)}_to_${fmt(maxDate)}`;
		}

		res.setHeader("Content-Type", "text/csv");
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${filename}.csv"`,
		);
		res.status(200).send(csvContent);
	} catch (error) {
		next(error);
	}
};

function escapeCsvField(field) {
	if (field == null) return "";

	let str = String(field);

	if (/^[=+\-@]/.test(str)) {
		str = `'${str}`;
	}

	if (str.includes(",") || str.includes('"') || str.includes("\n")) {
		return `"${str.replace(/"/g, '""')}"`;
	}

	return str;
}