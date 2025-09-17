import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  credits: { type: Number, required: true }, // 👈 should be Number
  category: { type: String, required: true },
});

export default mongoose.model("Course", courseSchema);
