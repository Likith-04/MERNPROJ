import express from "express"
import Course from "../models/Course.js"
import { getCourses, createCourse, updateCourse, deleteCourse } from "../controllers/courseController.js";

const router = express.Router()

router.get("/", getCourses)
router.post("/", createCourse)
router.put("/:id", updateCourse)
router.delete("/:id", deleteCourse)

export default router

// // GET all courses
// router.get("/", async (req, res) => {
//   try {
//     const courses = await Course.find()
//     res.json(courses)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

// // POST add new course
// router.post("/", async (req, res) => {
//   try {
//     const { code, name, credits, category } = req.body
//     const course = new Course({ 
//       code, 
//       name, 
//       credits: Number(credits), 
//       category });
//     await course.save();
//     res.status(201).json(course);
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// // PUT update course
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params
//     const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true })
//     res.json(updatedCourse)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// // DELETE remove course
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params
//     await Course.findByIdAndDelete(id)
//     res.json({ message: "Course deleted" })
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// export default router
