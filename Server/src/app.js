// app.js
import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import cors from "cors";
import boardsRouter from "./routes/boardRoutes.js";
import tasksRouter from "./routes/taskRoutes.js";

export const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Mount routers
app.use("/api/boards", boardsRouter);
app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
