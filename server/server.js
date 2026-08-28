import express from 'express';
import pg from "pg";
import dotenv from "dotenv";

import issues from "./issuesData.js";

dotenv.config();
// process.env.DB_HOST;

const { Pool } = pg;

const app = express();
const port = 3000;



const pool = new Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

app.use(express.json());

pool.query('SELECT NOW()', (error, result) => {
    if(error) {
        console.error('Database connection failed: ', error);
    }
    else {
        console.log('Database connected: ', result.rows[0]);
    }
})


app.get('/api/issues', async (req, res) => {
    
     try {
        const result = await pool.query(`SELECT 
                                        issues.id,
                                        issues.title,
                                        issues.description,
                                        issues.location,
                                        issues.reported_at,
                                        categories.category_name AS category,
                                        priority_levels.priority_name AS priority,
                                        statuses.status_name AS status,
                                        users.name AS reported_by
                                    FROM issues
                                    JOIN categories
                                        ON issues.category_id = categories.id
                                    JOIN statuses
                                        ON issues.status_id = statuses.id
                                    JOIN priority_levels
                                        ON issues.priority_level_id = priority_levels.id
                                    JOIN users
                                        ON issues.reported_by = users.id
                                    
                                    `);
   
        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve issues"
        });
        
    }
    
});

app.get(`/api/issues/:id`, async(req, res) => {
    console.log(req.params.id);
    
    try {
        const id = req.params.id
        const result = await pool.query(
			`
                                    SELECT 
                                        issues.id,
                                        issues.title,
                                        issues.description,
                                        issues.location,
                                        issues.reported_at,
                                        categories.category_name AS category,
                                        priority_levels.priority_name AS priority,
                                        statuses.status_name AS status,
                                        users.name AS reported_by

                                    FROM issues 
                                    JOIN categories
                                        ON issues.category_id = categories.id
                                    JOIN statuses
                                        ON issues.status_id = statuses.id
                                    JOIN priority_levels
                                        ON issues.priority_level_id = priority_levels.id
                                    JOIN users
                                        ON issues.reported_by = users.id
                                    WHERE issues.id = $1

            `,
			[id],
		);

        if (result.rowCount === 0) {
			return res.status(404).json({
				error: "Issue not found",
			});
		}

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve issue",
        });
    }

    
});


app.post('/api/issues', async(req, res) => {
    console.log(req.body);


    const {
        title,
        description,
        category_id,
        reported_by,
        location,
        priority_level_id,
        status_id
    } = req.body;

    if (
		!title ||
		!description ||
		!category_id ||
		!reported_by ||
		!location ||
		!priority_level_id ||
		!status_id
	) {
       return res.status(400).json({
            error: 'All fields are required'
       })
    }
		try {
            const categoryResult = await pool.query(
				`SELECT id FROM categories WHERE id = $1`,
				[category_id],
			);

			const priorityResult = await pool.query(
				`SELECT id FROM priority_levels WHERE id = $1`,
				[priority_level_id],
			);

			const statusResult = await pool.query(
				`SELECT id FROM statuses WHERE id = $1`,
				[status_id],
			);

			const userResult = await pool.query(
				`SELECT id FROM users WHERE id = $1`,
				[reported_by],
			);

            if (categoryResult.rowCount === 0) {
				return res.status(400).json({
					error: "Invalid category",
				});
			}
            if (priorityResult.rowCount === 0) {
				return res.status(400).json({
					error: "Invalid category",
				});
			}
            if (statusResult.rowCount === 0) {
				return res.status(400).json({
					error: "Invalid category",
				});
			}
            if (userResult.rowCount === 0) {
				return res.status(400).json({
					error: "Invalid category",
				});
			}


			const result = await pool.query(
				`
                    INSERT INTO issues (
                        title,
                        description,
                        category_id,
                        reported_by,
                        location,
                        priority_level_id,
                        status_id
                    )
                    VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7
                    )
                    RETURNING *;
            
            
            `,
				[
					title,
					description,
					category_id,
					reported_by,
					location,
					priority_level_id,
					status_id,
				],
			);
			res.status(201).json(result.rows[0]);
		} catch (error) {
			console.error(error);

			res.status(500).json({
				error: "Failed to create issue",
			});
		}
    
    
});


app.patch('/api/issues/:id', async (req, res) => {
    const { id } = req.params;
    const { status_id } = req.body;
    if (!status_id) {
		return res.status(400).json({
			error: "status_id is required",
		});
	}

    try {
        const statusResult = await pool.query(
			`SELECT id FROM statuses WHERE id = $1`,
			[status_id],
		);
        if (statusResult.rowCount === 0) {
			return res.status(400).json({
				error: "Invalid status",
			});
		}
        const result = await pool.query(`
            UPDATE issues
            SET status_id = $1
            WHERE id = $2
            RETURNING *;
        `, [status_id, id]);

        if (result.rowCount === 0) {
			return res.status(404).json({
				error: "Issue not found",
			});
		}

        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to update issues'
        });
        
    }
});

app.delete('/api/issues/:id', async (req, res) => {
    const { id } = req.params;
    

    try {
        const result = await pool.query(`
            DELETE FROM issues
            WHERE id = $1
            Returning *;    
        `,[id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: ' Issue not found'
            });
        }

        res.json(result.rows[0]);

    }
    catch (errror) {
        console.error(error); 
        res.status(500).json({
            error: 'Failed to delete issue'
        });
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
});