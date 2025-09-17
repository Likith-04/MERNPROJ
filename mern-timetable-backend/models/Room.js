import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  type: { type: String, enum: ["Classroom", "Lab", "Seminar"], required: true }
});

export default mongoose.model("Room", roomSchema);
