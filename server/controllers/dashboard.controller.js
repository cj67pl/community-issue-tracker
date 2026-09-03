import pool from "../config/db.js";

export const getDashboardKPIs = async (req, res, next) => {
	try {
		console.log(req.user.role_id);

		// if (
		//     req.user.role_id !== 1 &&
		//     req.user.role_id !== 2
		// ) {
		//     return res.status(403).json({
		//         error: "You do not have permission to this portion",
		//     });
		// }
		const result = await pool.query(
			`
                SELECT
                    COUNT(*) AS total_issues,
                    COUNT(*) FILTER (
                        WHERE status_id = $1) 
                        AS pending_issues,
                    COUNT(*) FILTER (
                        WHERE status_id = $2) 
                        AS in_progress_issues,
                    COUNT(*) FILTER (
                        WHERE status_id = $3) 
                        AS resolved_issues,
                    COUNT(*) FILTER (
                        WHERE priority_level_id = $4) 
                        AS critical_issues
                FROM issues;
            `,
			[1, 2, 3, 4],
		);
		res.status(200).json({
			kpis: result.rows[0],
		});
	} catch (error) {
		next(error);
	}
};

export const getIssuesByCategory = async (req, res, next) => {
	try {
		// console.log(req.user.role_id);
		const result = await pool.query(`
                SELECT
                    c.category_name as category,
                    COUNT(i.id) AS value
                FROM categories c
                LEFT JOIN issues i
                    ON c.id = i.category_id
                GROUP BY c.id, c.category_name
                ORDER BY value DESC;
                
        `);

		res.status(200).json({
			categories: result.rows,
		});
	} catch (error) {
		next(error);
	}
};

export const getRecentIssues = async (req, res, next) => {
	try {
		const result = await pool.query(
			`
                SELECT 
                    i.id,
                    i.title,
                    i.location,
                    p.priority_name as priority_level,
                    status_name as status,
                    i.created_at,
                    c.category_name as category
                FROM issues i
                LEFT JOIN priority_levels p ON i.priority_level_id = p.id
                LEFT JOIN statuses s ON i.status_id = s.id
                LEFT JOIN categories c ON i.category_id = c.id
                Order BY  i.created_at DESC
                LIMIT $1
        `,
			[5],
		);
		res.status(200).json({
			issues: result.rows,
		});
	} catch (error) {
		next(error);
	}
};



export const getIssuesByUrgency = async (req, res, next) => {
	try {
		const result = await pool.query(
			`
                SELECT 
                    i.id,
                    i.title,
                    i.location,
                    p.priority_name as priority_level,
                    status_name as status,
                    i.created_at
                FROM issues i
                LEFT JOIN priority_levels p ON i.priority_level_id = p.id
                LEFT JOIN statuses s ON i.status_id = s.id
                WHERE i.status_id IN (1, 2)
                Order BY i.priority_level_id DESC
                LIMIT $1
        `,
			[5],
		);
		res.status(200).json({
			issues: result.rows,
		});
	} catch (error) {
		next(error);
	}
};