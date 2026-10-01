import express from "express";
import cors from "cors";
// import issues from "./issuesData.js";
import issuesRouter from "./routes/issues.routes.js";
import commentsRouter from "./routes/comments.rotues.js";
import usersRouter from "./routes/users.routes.js";
import categoriesRouter from "./routes/categories.routes.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";
import notificationsRouter from "./routes/notifications.routes.js";

const app = express();

app.use(express.json());
app.use(cors());



app.use("/api/issues", issuesRouter);
app.use("/api/issues/:id/comments", commentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/notifications", notificationsRouter);

app.use(errorHandler);

export default app;
