import Course from "../models/Course.js"

// @desc    Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.json(courses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc    Create new course
export const createCourse = async (req, res) => {
  try {
    console.log("Incoming course:", req.body);
    const { code, name, credits, category } = req.body
    const course = new Course({ code, name, credits, category })
    const savedCourse = await course.save()
    res.status(201).json(savedCourse)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// @desc    Update course
export const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// @desc    Delete course
export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.json({ message: "Course deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
