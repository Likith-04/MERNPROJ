import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    credits: "",
    category: "Major",
  });

  // Fetch all courses from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add course
  const addCourse = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/courses", newCourse);
      setCourses([...courses, res.data]);
      setNewCourse({ code: "", name: "", credits: "", category: "Major" }); // reset form
    } catch (err) {
      console.error(err);
    }
  };

  // Delete course
  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      setCourses(courses.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Courses</h2>

      <div className="flex gap-2 mb-4">
        <input className="border p-2" placeholder="Code" value={newCourse.code}
          onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })} />
        <input className="border p-2" placeholder="Name" value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} />
        <input className="border p-2" placeholder="Credits" type="number" value={newCourse.credits}
          onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })} />
        <select className="border p-2" value={newCourse.category}
          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}>
          <option>Major</option>
          <option>Minor</option>
          <option>Skill</option>
          <option>Value-Added</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addCourse}>Add</button>
      </div>

      <ul>
        {courses.map(course => (
          <li key={course._id} className="flex justify-between items-center border-b py-2">
            <span>{course.code} - {course.name} ({course.credits} credits, {course.category})</span>
            <button className="bg-red-500 text-white px-3 py-1"
              onClick={() => deleteCourse(course._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
