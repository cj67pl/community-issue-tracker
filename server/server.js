import express from 'express';
import pool from './config/db.js';
import cors from "cors";
// import issues from "./issuesData.js";
import issuesRouter from "./routes/issues.routes.js";
import commentsRouter from "./routes/comments.rotues.js";
import usersRouter from "./routes/users.routes.js"
import categoriesRouter from "./routes/categories.routes.js";
import authRouter from "./routes/auth.routes.js"
import { errorHandler } from './middleware/error.middleware.js';
import dashboardRouter from './routes/dashboard.routes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());



pool.query('SELECT NOW()', (error, result) => {
    if(error) {
        console.error('Database connection failed: ', error);
    }
    else {
        console.log('Database connected: ', result.rows[0]);
    }
})



app.use("/api/issues", issuesRouter);
app.use('/api/issues/:id/comments', commentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(errorHandler);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
});