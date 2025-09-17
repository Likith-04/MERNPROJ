import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  expertise: { type: [String], default: [] },  // e.g. ["Math", "AI"]
  availability: { type: [String], default: [] } // e.g. ["Mon 9-11", "Tue 2-4"]
});

export default mongoose.model("Faculty", FacultySchema);
