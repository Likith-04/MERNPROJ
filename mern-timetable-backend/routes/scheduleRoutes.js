// routes/scheduleRoutes.js
import express from "express";
import { getScheduleBySlug, createSchedule, updateScheduleById } from "../controllers/scheduleController.js";

const router = express.Router();

router.get("/:slug", getScheduleBySlug);     // GET /api/schedules/demo
router.post("/", createSchedule);            // POST /api/schedules
router.put("/:id", updateScheduleById);      // PUT /api/schedules/:id  (update whole schedule)

export default router;
