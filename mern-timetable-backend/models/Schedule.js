// models/Schedule.js
import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String },
  // You can optionally store actual ObjectId references later
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: false },
  facultyName: { type: String },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: false },
  roomName: { type: String },

  // simple timeslot model: day (0=Mon..6=Sun), slot index per day (0..n-1)
  day: { type: Number, required: true },
  slot: { type: Number, required: true },
  durationSlots: { type: Number, default: 1 }, // how many contiguous slots

  studentGroup: { type: String }, // optional group label
  notes: { type: String }
});

const ScheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },  // e.g. "Demo Semester 1"
  slug: { type: String, index: true },      // e.g. "demo"
  semester: { type: String },
  program: { type: String },
  isDemo: { type: Boolean, default: false },

  // meta: how many timeslots per day (UI will use this)
  timeslotsPerDay: { type: Number, default: 8 },

  entries: [EntrySchema]
}, { timestamps: true });

export default mongoose.model("Schedule", ScheduleSchema);
