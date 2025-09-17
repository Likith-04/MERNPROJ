// import Faculty from "../models/Faculty.js";

// // @desc    Get all faculty
// export const getFaculty = async (req, res) => {
//   try {
//     const faculty = await Faculty.find();
//     res.json(faculty);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // @desc    Create new faculty
// export const createFaculty = async (req, res) => {
//   try {
//     console.log("Incoming faculty:", req.body);
//     const faculty = new Faculty(req.body);
//     const savedFaculty = await faculty.save();
//     res.status(201).json(savedFaculty);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // @desc    Update faculty
// export const updateFaculty = async (req, res) => {
//   try {
//     const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // @desc    Delete faculty
// export const deleteFaculty = async (req, res) => {
//   try {
//     await Faculty.findByIdAndDelete(req.params.id);
//     res.json({ message: "Faculty deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

import Faculty from "../models/Faculty.js";

// @desc Get all faculty
export const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Create new faculty
export const createFaculty = async (req, res) => {
  try {
    const { name, department, expertise, availability } = req.body;
    const faculty = new Faculty({
      name,
      department,
      expertise,
      availability
    });
    const saved = await faculty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Update faculty
export const updateFaculty = async (req, res) => {
  try {
    const updated = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Delete faculty
export const deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Faculty deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

