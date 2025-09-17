// import { useState } from "react"
// import Papa from "papaparse"

// export default function Rooms() {
//   const [rooms, setRooms] = useState([
//     { id: 1, name: "Room 101", capacity: 40, type: "Classroom" },
//     { id: 2, name: "Lab A", capacity: 25, type: "Laboratory" },
//   ])

//   const [form, setForm] = useState({ id: "", name: "", capacity: "", type: "Classroom" })
//   const [editing, setEditing] = useState(null)
//   const [search, setSearch] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 5

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (editing) {
//       setRooms(rooms.map(r => r.id === editing ? { ...form, id: editing, capacity: parseInt(form.capacity) } : r))
//       setEditing(null)
//     } else {
//       setRooms([...rooms, { ...form, id: Date.now(), capacity: parseInt(form.capacity) }])
//     }
//     setForm({ id: "", name: "", capacity: "", type: "Classroom" })
//   }

//   const handleDelete = (id) => setRooms(rooms.filter(r => r.id !== id))
//   const handleEdit = (room) => { setForm(room); setEditing(room.id) }

//   const handleExport = () => {
//     const csv = Papa.unparse(rooms)
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
//     const url = URL.createObjectURL(blob)
//     const link = document.createElement("a")
//     link.href = url
//     link.setAttribute("download", "rooms.csv")
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   const filtered = rooms.filter(r =>
//     r.name.toLowerCase().includes(search.toLowerCase()) ||
//     r.type.toLowerCase().includes(search.toLowerCase())
//   )

//   const startIndex = (currentPage - 1) * itemsPerPage
//   const paginated = filtered.slice(startIndex, startIndex + itemsPerPage)
//   const totalPages = Math.ceil(filtered.length / itemsPerPage)

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Manage Rooms</h1>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow space-y-4">
//         <div className="grid grid-cols-3 gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Room Name"
//             value={form.name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="capacity"
//             placeholder="Capacity"
//             value={form.capacity}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Classroom">Classroom</option>
//             <option value="Laboratory">Laboratory</option>
//             <option value="Seminar Hall">Seminar Hall</option>
//           </select>
//         </div>
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           {editing ? "Update Room" : "Add Room"}
//         </button>
//       </form>

//       {/* Search + Export */}
//       <div className="flex justify-between mb-3">
//         <input
//           type="text"
//           placeholder="Search by name or type"
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
//               <th className="border p-2">Capacity</th>
//               <th className="border p-2">Type</th>
//               <th className="border p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginated.map(r => (
//               <tr key={r.id}>
//                 <td className="border p-2">{r.name}</td>
//                 <td className="border p-2">{r.capacity}</td>
//                 <td className="border p-2">{r.type}</td>
//                 <td className="border p-2 flex gap-2">
//                   <button onClick={() => handleEdit(r)} className="text-blue-600 hover:underline">Edit</button>
//                   <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:underline">Delete</button>
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

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomNumber: "",
    capacity: "",
    type: "Classroom",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/rooms")
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      const res = await axios.put(`http://localhost:5000/api/rooms/${editing}`, form);
      setRooms(rooms.map((r) => (r._id === editing ? res.data : r)));
      setEditing(null);
    } else {
      const res = await axios.post("http://localhost:5000/api/rooms", form);
      setRooms([...rooms, res.data]);
    }
    setForm({ roomNumber: "", capacity: "", type: "Classroom" });
  };

  const handleEdit = (r) => {
    setForm({ roomNumber: r.roomNumber, capacity: r.capacity, type: r.type });
    setEditing(r._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/rooms/${id}`);
    setRooms(rooms.filter((r) => r._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Rooms</h1>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <input name="roomNumber" placeholder="Room Number" value={form.roomNumber} onChange={handleChange} className="border p-2 rounded" required />
          <input type="number" name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} className="border p-2 rounded" required />
          <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
            <option>Classroom</option>
            <option>Lab</option>
            <option>Seminar</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? "Update Room" : "Add Room"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Room Number</th>
              <th className="p-2 border">Capacity</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r._id}>
                <td className="border p-2">{r.roomNumber}</td>
                <td className="border p-2">{r.capacity}</td>
                <td className="border p-2">{r.type}</td>
                <td className="border p-2 space-x-2">
                  <button onClick={() => handleEdit(r)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(r._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
