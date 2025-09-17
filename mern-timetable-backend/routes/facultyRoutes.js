import express from "express";
import {
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty
} from "../controllers/facultyController.js";

const router = express.Router();

router.get("/", getFaculty);
router.post("/", createFaculty);
router.put("/:id", updateFaculty);
router.delete("/:id", deleteFaculty);

export default router;
