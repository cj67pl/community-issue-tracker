import pool from "../config/db.js";
import { isNonEmptyString, isValidId } from "../utils/validation.js";

export const getAverage = async (req, res, next) => {
	console.log("cj");

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
	

	try {
		
        /*const allIssues = await pool.query(`
		    SELECT COUNT(*) FROM issues

		`);

		const resolvedDays = await pool.query (`
		    SELECT updated_at
		        FROM issues
		        LEFT JOIN statuses
		            ON issues.status_id = statuses.id
		        WHERE statuses.status_name = $1;

		    `, ["Resolved"]);

		console.log(resolvedDays.rows.updated_at);
		const daysList = resolvedDays.rows.map((row) => row.updated_at);
		let totalDays = 0;
		const msPerDay = 1000 * 60 * 60 * 24;

		for(let i=1; i<daysList.length; i++) {
		    const date1 = new Date(daysList[i - 1]);
		    const date2 = new Date(daysList[i]);
		    const diffInMs = Math.abs(date2 - date1);
		    totalDays += diffInMs / msPerDay;
		}

		const average = totalDays / (daysList.length - 1);
		console.log(Math.round(average * 100) / 100);

		const averageResolution = await pool.query(
			`
		        SELECT
		            id,
		            reported_at,
		            updated_at,
		            updated_at - reported_at AS resolution_interval,
		            EXTRACT(EPOCH FROM (updated_at - reported_at)) / 86400 AS resolution_days
		        FROM issues
		        JOIN statuses
		            ON issues.status_id = statuses.id
		        WHERE statuses.status_name = $1;
		`,
			["Resolved"],
		);
		const average_days = averageResolution.rows[0].average_days
		*/

		//Resolution Time
        const now = new Date();

		
		const currentMonthStart = new Date(
			now.getFullYear(),
			now.getMonth(),
			1,
		);

		
		const nextMonthStart = new Date(
			now.getFullYear(),
			now.getMonth() + 1,
			1,
		);

		
		const previousMonthStart = new Date(
			now.getFullYear(),
			now.getMonth() - 1,
			1,
		);

		const currentMonth = await pool.query(
			`
            SELECT ROUND(
                AVG(
                    EXTRACT(EPOCH FROM (updated_at - reported_at)) / 86400
                )::numeric,
                1
            ) AS average_days
            FROM issues
            JOIN statuses
                ON issues.status_id = statuses.id
            WHERE statuses.status_name = $1
                AND resolved_at >= $2
                AND resolved_at < $3;
        `,
			["Resolved", currentMonthStart, nextMonthStart],
		);

		// console.table(averageResolution.rows);
        const lastMonth = await pool.query(
            `
                SELECT ROUND(
                    AVG(
                        EXTRACT(EPOCH FROM (resolved_at - reported_at)) / 86400
                    )::numeric,
                    1
                ) AS average_days
                FROM issues
                JOIN statuses
                    ON issues.status_id = statuses.id
                WHERE statuses.status_name = $1
                AND resolved_at >= $2
                AND resolved_at < $3;
            `,
			["Resolved", previousMonthStart, currentMonthStart],
		);
		const currentAverage = Number(currentMonth.rows[0].average_days || 0);
		const previousAverage = Number(lastMonth.rows[0].average_days || 0);
		
        const difference = currentAverage - previousAverage;
		const direction = currentAverage > previousAverage ? "down" : "up";
        
        // console.log(averageDays);
        const averageResolution = {
			current: currentAverage,
			change: Math.abs(difference),
			direction,
		};

		// console.log(averageResolution);



        //--------Resolution Rate
        const allIssues = await pool.query(
			`
               SELECT COUNT(*) FROM issues 
            `,
		);
        // console.log(allIssues.rows[0].count);
        
        const allResolved = await pool.query (
            `
                SELECT COUNT(*) 
                    FROM issues
                WHERE status_id = $1
            ` ,[2]
        )
        // console.log(allResolved.rows[0].count);
        const resRate = ((allResolved.rows[0].count / allIssues.rows[0].count) * 100).toFixed(2)
        
        // console.log(resRate);
        const resolutionRate = {
			rate: resRate,
			allIssues: allIssues.rows[0].count,
			resolved: allResolved.rows[0].count,
		};


        // Total Reports for current month
        const currentMonthReps = await pool.query (
            `
                SELECT COUNT(*) 
                    FROM issues
                WHERE reported_at >= $1
                    AND reported_at < $2

            `, [currentMonthStart, nextMonthStart]
        )
        // console.log(currentMonthReps.rows[0].count);
        const lastMonthReps = await pool.query(
			`
                SELECT COUNT(*) 
                    FROM issues
                WHERE reported_at >= $1
                    AND reported_at < $2

            `,
			[previousMonthStart, currentMonthStart],
		);
        // console.log(lastMonthReps.rows[0].count);
        const percentageDifference =
			(((currentMonthReps.rows[0].count - lastMonthReps.rows[0].count) /
				lastMonthReps.rows[0].count) *
			100).toFixed(2);
        // console.log(percentageDifference);

        const totalMonthlyReports = {
			currentMonthReps: currentMonthReps.rows[0].count,
			percentageDifference:
				percentageDifference < 0
					? percentageDifference
					: `+${percentageDifference}`,
		};
        
        // console.log(totalMonthlyReports);
        
		res.json({
			averageResolution,
			resolutionRate,
            totalMonthlyReports,
		});
	} catch (error) {
		next(error);
	}
};




export const getResolutionRate = async (req, res, next) => {
    try {
        const getResolutionRate = await pool.query (
            `
                C
            `
        )
    }
    catch (error) {
        next(error);
    }
}