import { useState, useEffect } from "react";
import axios from "axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    code: "",
    name: "",
    credits: "",
    category: "Major",
  });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, credits: Number(form.credits) };

      if (editing) {
        const res = await axios.put(
          `http://localhost:5000/api/courses/${editing}`,
          payload
        );
        setCourses(courses.map((c) => (c._id === editing ? res.data : c)));
        setEditing(null);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/courses",
          payload
        );
        setCourses([...courses, res.data]);
      }

      setForm({ code: "", name: "", credits: "", category: "Major" });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  const handleEdit = (course) => {
    setForm({
      code: course.code,
      name: course.name,
      credits: course.credits.toString(),
      category: course.category,
    });
    setEditing(course._id);
  };

  const filtered = courses.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="text-gray-900 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white dark:bg-gray-900 p-4 rounded-xl shadow space-y-4 border border-gray-200 dark:border-gray-700"
      >
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            name="code"
            placeholder="Course Code"
            value={form.code}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-2 rounded"
            required
            disabled={editing !== null}
          />
          <input
            type="text"
            name="name"
            placeholder="Course Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-2 rounded"
            required
          />
          <input
            type="number"
            name="credits"
            placeholder="Credits"
            value={form.credits}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-2 rounded"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-2 rounded"
          >
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
            <option value="Skill">Skill-based</option>
            <option value="Ability">Ability Enhancement</option>
            <option value="Value">Value-added</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editing ? "Update Course" : "Add Course"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setForm({ code: "", name: "", credits: "", category: "Major" });
              setEditing(null);
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* List */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold mb-2">Course List</h2>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search by code or name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-2 rounded w-1/2"
          />
        </div>
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-200 dark:border-gray-700 p-2">Code</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Name</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Credits</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Category</th>
              <th className="border border-gray-200 dark:border-gray-700 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((c) => (
              <tr key={c._id}>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{c.code}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{c.name}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{c.credits}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2">{c.category}</td>
                <td className="border border-gray-200 dark:border-gray-700 p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
