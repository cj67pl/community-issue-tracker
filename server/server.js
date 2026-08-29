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



// API FOR ISSUES

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
					error: "Invalid priority",
				});
			}
            if (statusResult.rowCount === 0) {
				return res.status(400).json({
					error: "Invalid status",
				});
			}
            if (userResult.rowCount === 0) {
				return res.status(400).json({
					error: "Invalid user",
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
        const result = await pool.query(
			`
            UPDATE issues
            SET status_id = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *;
        `,
			[status_id, id],
		);

        if (result.rowCount === 0) {
			return res.status(404).json({
				error: "Issue not found",
			});
		}

        res.status(200).json({
			message: "Issue updated successfully",
			issue: result.rows[0],
		});
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

        res.status(200).json({
			message: "Issue deleted successfully",
		});

    }
    catch (error) {
        console.error(error); 
        res.status(500).json({
            error: 'Failed to delete issue'
        });
    }
})


//API FOR COMMENTS

app.get('/api/issues/:id/comments', async (req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    try {
        const result = await pool.query(`
                        SELECT 
                            comments.id,
                            comments.content,
                            comments.created_at,
                            comments.updated_at,
                            users.name AS user_name
                        FROM comments
                        
                        JOIN users
                            ON comments.user_id = users.id
                        WHERE comments.issue_id = $1
                        ORDER by comments.created_at DESC;
                `, [id]);

    
        res.json(result.rows)
    }
    catch (error){
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve comments'
        })
    }
    
})

app.post('/api/issues/:id/comments', async (req, res) => {
    const { id } = req.params;
    const {user_id, content} = req.body;

    // console.log("Issue ID:", id);
    // console.log("User ID:", user_id);
    // console.log("Content:", content);

    if (!user_id || !content) {
        return res.status(400) ({
            error: 'All fields are required',
        })
    }

    const userResult = await pool.query(`SELECT id FROM users WHERE id = $1`, [
        user_id,
    ]);

    if (userResult.rowCount === 0) {
        return res.status(400).json({
            error: "Invalid user",
        });
    }

    try {
        const result = await pool.query(`
                INSERT INTO comments (
                    issue_id,
                    user_id,
                    content
                )
                VALUES (
                    $1,
                    $2,
                    $3
                )
                RETURNING *;
            
            `,[id, user_id, content]
        );

        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to create comment'
        });
    }

});

app.patch('/api/comments/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({
            error:"Comment update required"
        });
    }

    try {

        const commentResult = await pool.query(
			`
                    SELECT id 
                    FROM comments
                    WHERE id = $1
            `,
			[id],
		);

        if (commentResult.rowCount === 0) {
			return res.status(400).json({
				error: "Comment not found",
			});
		}

        const result = await pool.query(
			`
                UPDATE comments
                SET content = $1, 
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                RETURNING *;
        `,
			[content, id],
		);

        res.status(200).json({
			message: "Comment updated successfully",
			comment: result.rows[0],
		});

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error:'Failed to update comment'
        });
    }


})

app.delete('/api/comments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
                DELETE
                FROM comments
                WHERE comments.id = $1
                RETURNING *;
            
            `, [id])

        if (result.rowCount === 0) {
            return res.status(400).json({
                error: 'Comment not found'
            });
        }

        res.status(200).json({
			message: "Comment deleted successfully",
		});
    }

    catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to delete comment'
        });
    }

})


//User API

app.get('/api/users', async (req, res) => {

    try{
        const result = await pool.query(`
                    SELECT
                        users.id,
                        users.name,
                        users.email,
                        roles.role_name AS role,
                        users.created_at,
                        users.updated_at
                    FROM users
                    JOIN roles
                        ON users.role_id = roles.id
                    ORDER BY users.id;

            `);

        res.json(result.rows)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to get users'
        })
    }
})

app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const result = await pool.query(
			`
                    SELECT
                        users.id,
                        users.name,
                        users.email,
                        roles.role_name AS role,
                        users.created_at,
                        users.updated_at
                    FROM users
                    JOIN roles
                        ON users.role_id = roles.id
                    WHERE users.id = $1;
            
            `,
			[id],
		);

        if (result.rowCount === 0) {
			return res.status(404).json({
				error: "User not found",
			});
		}

        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        
        res.status(500).json({
			error: "User not found",
		});
    }

});

app.post('/api/users', async (req, res) => {

    const {
        name, 
        password,
        role,
        email
    } = req.body

    if (!name || !password || !role || !email) {
        return res.status(400).json ({
            error: 'All fields are required'
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Invalid email format'
        });
    }

    if(password.length < 8) {
        return res.status(400).json({
            error: 'Password must be at least 8 characters long'
        });
    }

    try {

        
        const existingUser = await pool.query(`
                SELECT id 
                FROM users 
                WHERE email = $1 
            
        `, [email]);

        if (existingUser.rowCount > 0) {
            return res.status(409).json({
                error: 'Email is already registered'
            });
        }

        const rolesResult = await pool.query(`
            SELECT id FROM roles WHERE id = $1 
            
            `, [role]);

        if (rolesResult.rowCount === 0) {
			return res.status(404).json({
				error: "Invalid role",
			});
		} 
        
        const hashedPassword = await bcrypt.hash(password, 15);


        const result = await pool.query(
			`
            INSERT INTO
                    users (name, password, role_id, email)
            VALUES ($1, $2, $3, $4)
            RETURNING 
            id, name, email, role_id, created_at, updated_at;
            
            
        `,
			[name, hashedPassword, role, email],
		);

        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to create user'
        });
    }

});


app.patch('/api/users/:id/password', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
		return res.status(400).json({
			error: "Password is required",
		});
	}

    if (password.length < 8) {
		return res.status(400).json({
			error: "Password must be at least 8 characters long",
		});
	}

    try {
       

        const userResult = await pool.query(
			`
                    SELECT id 
                    FROM users
                    WHERE id = $1
            `,
			[id],
		);

		if (userResult.rowCount === 0) {
			return res.status(404).json({
				error: "User not found",
			});
		}

        const hashedPassword = await bcrypt.hash(password, 15);

        const result = await pool.query(`
                UPDATE users
                SET password = $1, 
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                RETURNING 
                id, name, email, role_id, updated_at; 
                
            `, [hashedPassword, id]);


        res.status(200).json({
			message: "Password updated successfully",
			user: result.rows[0],
		});
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to update user password'
        });
    }


})

app.patch("/api/users/:id/role", async (req, res) => {
	const { id } = req.params;
	const { role } = req.body;

	if (!role) {
		return res.status(400).json({
			error: "Role is required",
		});
	}

	try {

        const roleResult = await pool.query(
            `
            SELECT id
            FROM roles
            WHERE id = $1
        `,
            [role],
        );

        if (roleResult.rowCount === 0) {
            return res.status(400).json({
                error: "Invalid role",
            });
        }

		const userResult = await pool.query(
			`
                    SELECT id 
                    FROM users
                    WHERE id = $1
            `,
			[id],
		);

		if (userResult.rowCount === 0) {
			return res.status(400).json({
				error: "User not found",
			});
		}

		const result = await pool.query(
			`
                UPDATE users
                SET role_id = $1, 
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                RETURNING
                    id,
                    name,
                    email,
                    role_id,
                    updated_at;

        `,
			[role, id],
		);

		res.status(200).json({
			message: "Role updated successfully",
			user: result.rows[0],
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "Failed to update user role",
		});
	}
});

app.delete("/api/users/:id", async (req, res) => {
	const { id } = req.params;

	try {

		const result = await pool.query(
			`
                DELETE FROM users
                WHERE id = $1
                RETURNING *;

        `,
			[id],
		);
        
        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "User not found",
            });
        }

		res.status(200).json({
			message: "User deleted successfully",
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "Failed to update user role",
		});
	}
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
});