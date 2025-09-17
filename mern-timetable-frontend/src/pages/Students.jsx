// import { useState } from "react"
// import Papa from "papaparse"

// export default function Students() {
//   const [students, setStudents] = useState([
//     { id: 1, name: "Amit Kumar", roll: "21ED001", program: "B.Ed", semester: 3 },
//     { id: 2, name: "Neha Verma", roll: "21FYUP045", program: "FYUP", semester: 2 },
//   ])

//   const [form, setForm] = useState({ id: "", name: "", roll: "", program: "B.Ed", semester: "" })
//   const [editing, setEditing] = useState(null)
//   const [search, setSearch] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 5

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (editing) {
//       setStudents(students.map(s => s.id === editing ? { ...form, id: editing, semester: parseInt(form.semester) } : s))
//       setEditing(null)
//     } else {
//       setStudents([...students, { ...form, id: Date.now(), semester: parseInt(form.semester) }])
//     }
//     setForm({ id: "", name: "", roll: "", program: "B.Ed", semester: "" })
//   }

//   const handleDelete = (id) => setStudents(students.filter(s => s.id !== id))
//   const handleEdit = (stu) => { setForm(stu); setEditing(stu.id) }

//   const handleExport = () => {
//     const csv = Papa.unparse(students)
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
//     const url = URL.createObjectURL(blob)
//     const link = document.createElement("a")
//     link.href = url
//     link.setAttribute("download", "students.csv")
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   const filtered = students.filter(s =>
//     s.name.toLowerCase().includes(search.toLowerCase()) ||
//     s.roll.toLowerCase().includes(search.toLowerCase()) ||
//     s.program.toLowerCase().includes(search.toLowerCase())
//   )

//   const startIndex = (currentPage - 1) * itemsPerPage
//   const paginated = filtered.slice(startIndex, startIndex + itemsPerPage)
//   const totalPages = Math.ceil(filtered.length / itemsPerPage)

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Manage Students</h1>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow space-y-4">
//         <div className="grid grid-cols-4 gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Student Name"
//             value={form.name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="roll"
//             placeholder="Roll No"
//             value={form.roll}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <select
//             name="program"
//             value={form.program}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="B.Ed">B.Ed</option>
//             <option value="M.Ed">M.Ed</option>
//             <option value="FYUP">FYUP</option>
//             <option value="ITEP">ITEP</option>
//           </select>
//           <input
//             type="number"
//             name="semester"
//             placeholder="Semester"
//             value={form.semester}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           {editing ? "Update Student" : "Add Student"}
//         </button>
//       </form>

//       {/* Search + Export */}
//       <div className="flex justify-between mb-3">
//         <input
//           type="text"
//           placeholder="Search by name, roll, or program"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded w-1/2"
//         />
//         <button onClick={handleExport} className="bg-green-600 text-white px-4 py-2 rounded">
//           Export CSV
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white p-4 rounded shadow">
//         <table className="w-full text-sm border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Roll No</th>
//               <th className="border p-2">Program</th>
//               <th className="border p-2">Semester</th>
//               <th className="border p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginated.map(s => (
//               <tr key={s.id}>
//                 <td className="border p-2">{s.name}</td>
//                 <td className="border p-2">{s.roll}</td>
//                 <td className="border p-2">{s.program}</td>
//                 <td className="border p-2">{s.semester}</td>
//                 <td className="border p-2 flex gap-2">
//                   <button onClick={() => handleEdit(s)} className="text-blue-600 hover:underline">Edit</button>
//                   <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:underline">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center gap-2 mt-4">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 rounded border ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }




import { useState, useEffect } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    program: "",
    electives: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      const res = await axios.put(`http://localhost:5000/api/students/${editing}`, {
        ...form,
        electives: form.electives.split(","),
      });
      setStudents(students.map((s) => (s._id === editing ? res.data : s)));
      setEditing(null);
    } else {
      const res = await axios.post("http://localhost:5000/api/students", {
        ...form,
        electives: form.electives.split(","),
      });
      setStudents([...students, res.data]);
    }
    setForm({ name: "", rollNumber: "", program: "", electives: "" });
  };

  const handleEdit = (s) => {
    setForm({
      name: s.name,
      rollNumber: s.rollNumber,
      program: s.program,
      electives: s.electives.join(","),
    });
    setEditing(s._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    setStudents(students.filter((s) => s._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded" required />
          <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} className="border p-2 rounded" required />
          <input name="program" placeholder="Program" value={form.program} onChange={handleChange} className="border p-2 rounded" required />
          <input name="electives" placeholder="Electives (comma separated)" value={form.electives} onChange={handleChange} className="border p-2 rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? "Update Student" : "Add Student"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Roll Number</th>
              <th className="p-2 border">Program</th>
              <th className="p-2 border">Electives</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.rollNumber}</td>
                <td className="border p-2">{s.program}</td>
                <td className="border p-2">{s.electives.join(", ")}</td>
                <td className="border p-2 space-x-2">
                  <button onClick={() => handleEdit(s)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(s._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
