// import { useState } from "react"
// import Papa from "papaparse"

// export default function Faculty() {
//   const [faculty, setFaculty] = useState([
//     { id: 1, name: "Dr. Sharma", department: "Education", workload: 12 },
//     { id: 2, name: "Prof. Singh", department: "Mathematics", workload: 8 },
//   ])

//   const [form, setForm] = useState({ id: "", name: "", department: "", workload: "" })
//   const [editing, setEditing] = useState(null)
//   const [search, setSearch] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 5

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (editing) {
//       setFaculty(faculty.map(f => f.id === editing ? { ...form, id: editing, workload: parseInt(form.workload) } : f))
//       setEditing(null)
//     } else {
//       setFaculty([...faculty, { ...form, id: Date.now(), workload: parseInt(form.workload) }])
//     }
//     setForm({ id: "", name: "", department: "", workload: "" })
//   }

//   const handleDelete = (id) => {
//     setFaculty(faculty.filter(f => f.id !== id))
//   }

//   const handleEdit = (fac) => {
//     setForm(fac)
//     setEditing(fac.id)
//   }

//   const handleExport = () => {
//     const csv = Papa.unparse(faculty)
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
//     const url = URL.createObjectURL(blob)
//     const link = document.createElement("a")
//     link.href = url
//     link.setAttribute("download", "faculty.csv")
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   // filtering + pagination
//   const filtered = faculty.filter(f =>
//     f.name.toLowerCase().includes(search.toLowerCase()) ||
//     f.department.toLowerCase().includes(search.toLowerCase())
//   )

//   const startIndex = (currentPage - 1) * itemsPerPage
//   const paginated = filtered.slice(startIndex, startIndex + itemsPerPage)
//   const totalPages = Math.ceil(filtered.length / itemsPerPage)

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Manage Faculty</h1>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow space-y-4">
//         <div className="grid grid-cols-3 gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Faculty Name"
//             value={form.name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="department"
//             placeholder="Department"
//             value={form.department}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="workload"
//             placeholder="Workload Hours"
//             value={form.workload}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           {editing ? "Update Faculty" : "Add Faculty"}
//         </button>
//         {editing && (
//           <button
//             type="button"
//             onClick={() => { setForm({ id: "", name: "", department: "", workload: "" }); setEditing(null) }}
//             className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       {/* Search + Export */}
//       <div className="flex justify-between items-center mb-3">
//         <input
//           type="text"
//           placeholder="Search by name or department"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded w-1/2"
//         />
//         <button
//           onClick={handleExport}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Export CSV
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white p-4 rounded shadow">
//         <table className="w-full text-sm border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Department</th>
//               <th className="border p-2">Workload (hrs)</th>
//               <th className="border p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginated.map((f) => (
//               <tr key={f.id}>
//                 <td className="border p-2">{f.name}</td>
//                 <td className="border p-2">{f.department}</td>
//                 <td className="border p-2">{f.workload}</td>
//                 <td className="border p-2 flex gap-2">
//                   <button onClick={() => handleEdit(f)} className="text-blue-600 hover:underline">Edit</button>
//                   <button onClick={() => handleDelete(f.id)} className="text-red-600 hover:underline">Delete</button>
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

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: "",
    expertise: "",
    availability: "",
  });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get("http://localhost:5000/api/faculty")
      .then((res) => setFaculty(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const res = await axios.put(`http://localhost:5000/api/faculty/${editing}`, {
          ...form,
          expertise: form.expertise.split(","),
          availability: form.availability.split(","),
        });
        setFaculty(faculty.map((f) => (f._id === editing ? res.data : f)));
        setEditing(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/faculty", {
          ...form,
          expertise: form.expertise.split(","),
          availability: form.availability.split(","),
        });
        setFaculty([...faculty, res.data]);
      }
      setForm({ name: "", department: "", expertise: "", availability: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (f) => {
    setForm({
      name: f.name,
      department: f.department,
      expertise: f.expertise.join(","),
      availability: f.availability.join(","),
    });
    setEditing(f._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/faculty/${id}`);
    setFaculty(faculty.filter((f) => f._id !== id));
  };

  const filtered = faculty.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.department.toLowerCase().includes(search.toLowerCase())
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Faculty</h1>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded" required />
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} className="border p-2 rounded" required />
          <input name="expertise" placeholder="Expertise (comma separated)" value={form.expertise} onChange={handleChange} className="border p-2 rounded" />
          <input name="availability" placeholder="Availability (comma separated)" value={form.availability} onChange={handleChange} className="border p-2 rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? "Update Faculty" : "Add Faculty"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <input placeholder="Search faculty..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 mb-3 w-1/2 rounded" />
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Expertise</th>
              <th className="p-2 border">Availability</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((f) => (
              <tr key={f._id}>
                <td className="border p-2">{f.name}</td>
                <td className="border p-2">{f.department}</td>
                <td className="border p-2">{f.expertise.join(", ")}</td>
                <td className="border p-2">{f.availability.join(", ")}</td>
                <td className="border p-2 space-x-2">
                  <button onClick={() => handleEdit(f)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(f._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded border ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
