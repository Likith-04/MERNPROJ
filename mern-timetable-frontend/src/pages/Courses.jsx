// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [form, setForm] = useState({
//     code: "",
//     name: "",
//     credits: "",
//     category: "Major",
//   });
//   const [editing, setEditing] = useState(null); // stores Mongo _id
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Fetch courses from backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/courses")
//       .then((res) => setCourses(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editing) {
//       // Update existing course
//       axios
//         .put(`http://localhost:5000/api/courses/${editing}`, form)
//         .then((res) => {
//           setCourses(
//             courses.map((c) => (c._id === editing ? res.data : c))
//           );
//           setEditing(null);
//           setForm({ code: "", name: "", credits: "", category: "Major" });
//         })
//         .catch((err) => console.error(err));
//     } else {
//       // Add new course
//       axios
//         .post("http://localhost:5000/api/courses", form)
//         .then((res) => {
//           setCourses([...courses, res.data]);
//           setForm({ code: "", name: "", credits: "", category: "Major" });
//         })
//         .catch((err) => console.error(err));
//     }
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:5000/api/courses/${id}`)
//       .then(() => setCourses(courses.filter((c) => c._id !== id)))
//       .catch((err) => console.error(err));
//   };

//   const handleEdit = (course) => {
//     setForm({
//       code: course.code,
//       name: course.name,
//       credits: course.credits,
//       category: course.category,
//     });
//     setEditing(course._id);
//   };

//   // Search + Pagination
//   const filtered = courses.filter(
//     (c) =>
//       c.code.toLowerCase().includes(search.toLowerCase()) ||
//       c.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="mb-6 bg-white p-4 rounded shadow space-y-4"
//       >
//         <div className="grid grid-cols-4 gap-4">
//           <input
//             type="text"
//             name="code"
//             placeholder="Course Code"
//             value={form.code}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//             disabled={editing !== null} // prevent editing code
//           />
//           <input
//             type="text"
//             name="name"
//             placeholder="Course Name"
//             value={form.name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="credits"
//             placeholder="Credits"
//             value={form.credits}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Major">Major</option>
//             <option value="Minor">Minor</option>
//             <option value="Skill">Skill-based</option>
//             <option value="Ability">Ability Enhancement</option>
//             <option value="Value">Value-added</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {editing ? "Update Course" : "Add Course"}
//         </button>
//         {editing && (
//           <button
//             type="button"
//             onClick={() => {
//               setForm({ code: "", name: "", credits: "", category: "Major" });
//               setEditing(null);
//             }}
//             className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       {/* List */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-semibold mb-2">Course List</h2>
//         <div className="mb-3">
//           <input
//             type="text"
//             placeholder="Search by code or name"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border p-2 rounded w-1/2"
//           />
//         </div>
//         <table className="w-full text-sm border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Code</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Credits</th>
//               <th className="border p-2">Category</th>
//               <th className="border p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginated.map((c) => (
//               <tr key={c._id}>
//                 <td className="border p-2">{c.code}</td>
//                 <td className="border p-2">{c.name}</td>
//                 <td className="border p-2">{c.credits}</td>
//                 <td className="border p-2">{c.category}</td>
//                 <td className="border p-2 flex gap-2">
//                   <button
//                     onClick={() => handleEdit(c)}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(c._id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex justify-center gap-2 mt-4">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 rounded border ${
//                 currentPage === i + 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-white"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





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
  const [editing, setEditing] = useState(null); // stores Mongo _id
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch courses from backend
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
      console.log("Submitting form:", form);

      const payload = { ...form, credits: Number(form.credits) }; // ensure credits is number

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
      credits: course.credits.toString(), // convert back to string for input
      category: course.category,
    });
    setEditing(course._id);
  };

  // Search + Pagination
  const filtered = courses.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg space-y-4"
      >
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            name="code"
            placeholder="Course Code"
            value={form.code}
            onChange={handleChange}
            className="border p-2 rounded"
            required
            disabled={editing !== null} // prevent editing code
          />
          <input
            type="text"
            name="name"
            placeholder="Course Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="credits"
            placeholder="Credits"
            value={form.credits}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
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
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Course List</h2>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search by code or name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
        </div>
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Code</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Credits</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((c) => (
              <tr key={c._id}>
                <td className="border p-2">{c.code}</td>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.credits}</td>
                <td className="border p-2">{c.category}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-600 hover:underline"
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
                  : "bg-white"
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
