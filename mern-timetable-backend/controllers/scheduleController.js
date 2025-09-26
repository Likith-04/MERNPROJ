// controllers/scheduleController.js
import Schedule from "../models/Schedule.js";

// GET schedule by slug (e.g. /api/schedules/demo)
export const getScheduleBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const schedule = await Schedule.findOne({ slug });
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });
    res.json(schedule);
  } catch (err) {
    console.error("getScheduleBySlug error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Create a new schedule
export const createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    const saved = await schedule.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("createSchedule error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Update entire schedule (replace fields / entries)
export const updateScheduleById = async (req, res) => {
  try {
    const updated = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("updateScheduleById error:", err);
    res.status(400).json({ message: err.message });
  }
};
