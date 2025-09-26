// seedSchedule.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Schedule from "./models/Schedule.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern-timetable";

const demo = {
  name: "Demo Timetable - Sample",
  slug: "demo",
  semester: "Sem 1",
  program: "Demo Program",
  isDemo: true,
  timeslotsPerDay: 8,
  entries: [
    // Monday slot 0 (slot index 0)
    { courseCode: "EDU101", courseName: "Foundations of Education", facultyName: "Dr. Sharma", roomName: "Room 101", day: 0, slot: 0, durationSlots: 2, studentGroup: "BEd-1" },

    // Monday slot 2
    { courseCode: "MAT201", courseName: "Mathematics Minor", facultyName: "Prof. Singh", roomName: "Room 102", day: 0, slot: 2, durationSlots: 1, studentGroup: "FYUP-2" },

    // Tuesday
    { courseCode: "PHY110", courseName: "Physics Lab", facultyName: "Dr. Rao", roomName: "Lab A", day: 1, slot: 3, durationSlots: 2, studentGroup: "FYUP-1" },

    // Wednesday
    { courseCode: "ENG150", courseName: "English", facultyName: "Ms. Kaur", roomName: "Room 101", day: 2, slot: 1, durationSlots: 1, studentGroup: "BEd-1" }
  ]
};

(async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to Mongo for seeding...");

    // Upsert by slug so re-running script replaces demo
    const existing = await Schedule.findOne({ slug: demo.slug });
    if (existing) {
      existing.name = demo.name;
      existing.semester = demo.semester;
      existing.program = demo.program;
      existing.timeslotsPerDay = demo.timeslotsPerDay;
      existing.entries = demo.entries;
      existing.isDemo = true;
      await existing.save();
      console.log("Updated existing demo schedule:", existing._id.toString());
    } else {
      const created = await Schedule.create(demo);
      console.log("Created demo schedule with id:", created._id.toString());
    }
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
