import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  program: { type: String, required: true }, // e.g. "B.Ed", "FYUP"
  electives: { type: [String], default: [] } // array of course codes
});

export default mongoose.model("Student", studentSchema);
