import pool from "../config/db.js";
import { getRangeCondition } from "../utils/dateRange.js";

export const exportAnalyticsCsv = async (req, res, next) => {
	try {
		const { range = "30" } = req.query;

		const parsed = getRangeCondition(range);

		if (!parsed) {
			return res.status(400).json({
				error: "Invalid date range",
			});
		}

		const { dateCondition, previousDateCondition } = parsed;

		// KPI data

		const averageResolutionResult = await pool.query(`
			SELECT ROUND(
				AVG(
					EXTRACT(EPOCH FROM (resolved_at - reported_at)) / 86400
				)::numeric,
				1
			) AS average_days
			FROM issues
			JOIN statuses
				ON issues.status_id = statuses.id
			WHERE statuses.status_name = 'Resolved'
				AND ${dateCondition};
		`);

		const averageResolution = Number(
			averageResolutionResult.rows[0].average_days || 0,
		);

		const issuesResult = await pool.query(`
			SELECT COUNT(*) AS total
			FROM issues
			WHERE ${dateCondition};
		`);

		const resolvedResult = await pool.query(`
			SELECT COUNT(*) AS resolved
			FROM issues
			WHERE status_id = 2
				AND ${dateCondition};
		`);

		const totalIssues = Number(issuesResult.rows[0].total);
		const resolvedIssues = Number(resolvedResult.rows[0].resolved);

		const resolutionRate =
			totalIssues > 0
				? ((resolvedIssues / totalIssues) * 100).toFixed(1)
				: "0.0";

		// top location

		const topLocationResult = await pool.query(`
			SELECT
				location,
				COUNT(*) AS count
			FROM issues
			WHERE ${dateCondition}
			GROUP BY location
			ORDER BY count DESC
			LIMIT 1;
		`);

		const topLocation = topLocationResult.rows[0]?.location || "N/A";

		const topLocationCount = Number(topLocationResult.rows[0]?.count || 0);

		//issues by category

		const categoryResult = await pool.query(`
			SELECT
				c.category_name AS category,
				COUNT(i.id)::int AS count
			FROM issues i
			JOIN categories c
				ON i.category_id = c.id
			WHERE ${dateCondition}
			GROUP BY c.id, c.category_name
			ORDER BY count DESC, category ASC;
		`);

		//issues by priority

		const priorityResult = await pool.query(`
			SELECT
				p.priority_name AS priority,
				COUNT(i.id)::int AS count
			FROM issues i
			JOIN priority_levels p
				ON i.priority_level_id = p.id
			WHERE ${dateCondition}
			GROUP BY p.id, p.priority_name
			ORDER BY count DESC, priority ASC;
		`);

		//top location

		const locationResult = await pool.query(`
			SELECT
				location,
				COUNT(*)::int AS count
			FROM issues
			WHERE ${dateCondition}
			GROUP BY location
			ORDER BY count DESC
			LIMIT 5;
		`);

		// resolution statistics

		const resolutionStatsResult = await pool.query(`
			SELECT
				COUNT(*) FILTER (
					WHERE s.status_name NOT IN ('Resolved', 'Rejected')
					AND i.created_at < CURRENT_TIMESTAMP - INTERVAL '7 days'
				) AS overdue_issues,

				COUNT(*) FILTER (
					WHERE s.status_name = 'Resolved'
					AND i.resolved_at IS NOT NULL
					AND i.resolved_at <= i.created_at + INTERVAL '7 days'
				) AS resolved_within_target,

				COUNT(*) FILTER (
					WHERE s.status_name = 'Resolved'
				) AS total_resolved,

				MAX(
					CASE
						WHEN s.status_name NOT IN ('Resolved', 'Rejected')
						THEN CURRENT_DATE - i.created_at::date
					END
				) AS oldest_unresolved_days,

				COUNT(*) FILTER (
					WHERE s.status_name = 'Pending'
					AND i.created_at < CURRENT_TIMESTAMP - INTERVAL '30 days'
				) AS pending_over_30_days

			FROM issues i
			JOIN statuses s
				ON i.status_id = s.id;
		`);

		const resolutionStats = resolutionStatsResult.rows[0];

		const resolvedWithinTarget =
			Number(resolutionStats.total_resolved) > 0
				? Math.round(
						(Number(resolutionStats.resolved_within_target) /
							Number(resolutionStats.total_resolved)) *
							100,
					)
				: 0;

		// period comparison

		const periodResult = await pool.query(`
			SELECT
				COUNT(*) FILTER (
					WHERE ${dateCondition}
				) AS current_issues,

				COUNT(*) FILTER (
					WHERE status_id = 2
					AND ${dateCondition}
				) AS current_resolved,

				COUNT(*) FILTER (
					WHERE ${previousDateCondition}
				) AS previous_issues,

				COUNT(*) FILTER (
					WHERE status_id = 2
					AND ${previousDateCondition}
				) AS previous_resolved

			FROM issues;
		`);

		const period = periodResult.rows[0];

		const currentPeriodIssues = Number(period.current_issues);
		const currentPeriodResolved = Number(period.current_resolved);

		const previousPeriodIssues = Number(period.previous_issues);
		const previousPeriodResolved = Number(period.previous_resolved);

		const currentPeriodRate =
			currentPeriodIssues > 0
				? ((currentPeriodResolved / currentPeriodIssues) * 100).toFixed(
						1,
					)
				: "0.0";

		const previousPeriodRate =
			previousPeriodIssues > 0
				? (
						(previousPeriodResolved / previousPeriodIssues) *
						100
					).toFixed(1)
				: "0.0";

		// build CSV

		const rows = [];

		rows.push(["ADMIN ANALYTICS REPORT"]);
		rows.push([]);

		rows.push(["Summary"]);
		rows.push(["Metric", "Value"]);
		rows.push(["Average Resolution Time (days)", averageResolution]);
		rows.push(["Resolution Rate (%)", resolutionRate]);
		rows.push(["Total Issues Reported", totalIssues]);
		rows.push([
			"Top Reported Location",
			`${topLocation} (${topLocationCount})`,
		]);

		rows.push([]);

		// category
		rows.push(["Issues by Category"]);
		rows.push(["Category", "Count"]);

		categoryResult.rows.forEach((row) => {
			rows.push([row.category, row.count]);
		});

		rows.push([]);

		// priority
		rows.push(["Issues by Priority"]);
		rows.push(["Priority", "Count"]);

		priorityResult.rows.forEach((row) => {
			rows.push([row.priority, row.count]);
		});

		rows.push([]);

		// locations
		rows.push(["Top Reported Locations"]);
		rows.push(["Location", "Count"]);

		locationResult.rows.forEach((row) => {
			rows.push([row.location, row.count]);
		});

		rows.push([]);

		// resolution statistics
		rows.push(["Resolution Statistics"]);
		rows.push(["Metric", "Value"]);
		rows.push(["Overdue Issues", Number(resolutionStats.overdue_issues)]);
		rows.push(["Resolved Within Target", `${resolvedWithinTarget}%`]);
		rows.push([
			"Oldest Unresolved Issue",
			`${Number(resolutionStats.oldest_unresolved_days || 0)} days`,
		]);
		rows.push([
			"Pending Over 30 Days",
			Number(resolutionStats.pending_over_30_days),
		]);

		rows.push([]);

		// period comparison
		rows.push(["Period Comparison"]);
		rows.push(["Metric", "Current Period", "Previous Period"]);
		rows.push([
			"Issues Reported",
			currentPeriodIssues,
			previousPeriodIssues,
		]);
		rows.push([
			"Issues Resolved",
			currentPeriodResolved,
			previousPeriodResolved,
		]);
		rows.push([
			"Resolution Rate",
			`${currentPeriodRate}%`,
			`${previousPeriodRate}%`,
		]);

		const csvContent = rows
			.map((row) => row.map((field) => escapeCsvField(field)).join(","))
			.join("\n");

		const filename = `admin-analytics-${range}.csv`;

		res.setHeader("Content-Type", "text/csv");
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${filename}"`,
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
