// boardRoutes.js
import express from "express";
import Board from "../models/Board.js";
import Task from "../models/Task.js";

const router = express.Router();

// Existing board routes - Remain same
router.get("/", async (req, res) => {
  const boards = await Board.find();
  res.json(boards);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Board name is required" });
  try {
    const board = new Board({ name });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    console.error("Board creation error:", err);
    res.status(500).json({ error: "Server error while creating board" });
  }
});

// ✅ ADDED: Board-specific task routes
// GET all tasks for a board
router.get("/:boardId/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({ boardId: req.params.boardId }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST a new task to a board
router.post("/:boardId/tasks", async (req, res) => {
  try {
    const boardExists = await Board.findById(req.params.boardId);
    if (!boardExists) return res.status(404).json({ error: "Board not found" });

    const { title, description, status, priority, assignedTo, dueDate } =
      req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = new Task({
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      boardId: req.params.boardId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

export default router;
