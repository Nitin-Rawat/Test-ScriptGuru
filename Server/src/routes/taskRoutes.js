import express from "express";
import Task from "../models/Task.js";
import Board from "../models/Board.js";

const router = express.Router();

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

// PUT (update) a task by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
