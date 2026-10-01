import app from "./app.js";
import pool from "./config/db.js";

const port = process.env.PORT || 3000;

pool.query("SELECT NOW()", (error, result) => {
	if (error) {
		console.error("Database connection failed: ", error);
	} else {
		console.log("Database connected: ", result.rows[0]);
	}
});


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
