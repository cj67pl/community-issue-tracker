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

export const getAverageDays = async (req, res, next) => {
	

	try {
		const allIssues = await pool.query(`
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
        
		res.json(Math.round(average * 100) / 100);
	} catch (error) {
		next(error);
	}
};