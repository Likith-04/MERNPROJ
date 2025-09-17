import express from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// GET all students
router.get("/", getStudents);

// POST new student
router.post("/", createStudent);

// PUT update student
router.put("/:id", updateStudent);

// DELETE student
router.delete("/:id", deleteStudent);

export default router;
