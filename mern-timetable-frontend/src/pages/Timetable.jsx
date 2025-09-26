import React, { useEffect, useState } from "react";
import axios from "axios";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const slotsPerDay = 8; // should match backend's timeslotsPerDay

export default function Timetable() {
  const [schedule, setSchedule] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);

  // fetch demo timetable
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/schedules/demo")
      .then((res) => setSchedule(res.data))
      .catch((err) => console.error("Error fetching schedule:", err));
  }, []);

  const openEdit = (entry, day, slot) => {
    // if cell empty, create a new draft entry
    if (!entry) {
      entry = { day, slot, courseCode: "", courseName: "", facultyName: "", roomName: "" };
    }
    setEditingEntry(entry);
  };

  const handleSave = async () => {
    const updatedEntries = [...schedule.entries];
    const idx = updatedEntries.findIndex(
      (e) => e.day === editingEntry.day && e.slot === editingEntry.slot
    );

    if (idx >= 0) {
      updatedEntries[idx] = editingEntry; // replace
    } else {
      updatedEntries.push(editingEntry); // add new
    }

    const updatedSchedule = { ...schedule, entries: updatedEntries };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/schedules/${schedule._id}`,
        updatedSchedule
      );
      setSchedule(res.data);
      setEditingEntry(null);
    } catch (err) {
      console.error("Error saving schedule:", err);
    }
  };

  if (!schedule) return <div className="p-4 text-gray-700">Loading timetable...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{schedule.name}</h2>
      <div className="flex gap-3 mb-4">
  <button
    onClick={async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/schedules/demo");
        setSchedule(res.data);
      } catch (err) {
        console.error("Error generating demo:", err);
      }
    }}
    className="px-4 py-2 bg-indigo-700 text-white rounded shadow hover:bg-indigo-500"
  >
    Generate Demo
  </button>

  <button
    onClick={() => document.getElementById("exportMenu").classList.toggle("hidden")}
    className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-800"
  >
    Export
  </button>

  {/* Export dropdown */}
  <div
    id="exportMenu"
    className="hidden absolute mt-12 bg-white shadow-lg rounded p-2"
  >
    <button
      onClick={() => handleExport("pdf")}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      Export as PDF
    </button>
    <button
      onClick={() => handleExport("excel")}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      Export as Excel
    </button>
  </div>
</div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
  <table className="table-auto border-collapse border border-gray-300 w-full bg-white">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100">Day / Slot</th>
              {Array.from({ length: slotsPerDay }, (_, i) => (
                <th key={i} className="border p-2 bg-gray-100">
                  Slot {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((dayName, dayIndex) => (
              <tr key={dayIndex}>
                <td className="border p-2 font-medium bg-gray-50">{dayName}</td>
                {Array.from({ length: slotsPerDay }, (_, slotIndex) => {
                  const entry = schedule.entries.find(
                    (e) => e.day === dayIndex && e.slot === slotIndex
                  );
                  return (
                    <td
                      key={slotIndex}
                      className="border p-2 cursor-pointer hover:bg-blue-50"
                      onClick={() => openEdit(entry, dayIndex, slotIndex)}
                    >
                      {entry ? (
                        <div>
                          <div className="font-semibold">{entry.courseCode}</div>
                          <div className="text-sm text-gray-600">{entry.facultyName}</div>
                          <div className="text-xs text-gray-500">{entry.roomName}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">+ Add</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Edit Entry (Day {editingEntry.day + 1}, Slot {editingEntry.slot + 1})
            </h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Course Code"
                value={editingEntry.courseCode}
                onChange={(e) => setEditingEntry({ ...editingEntry, courseCode: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Course Name"
                value={editingEntry.courseName}
                onChange={(e) => setEditingEntry({ ...editingEntry, courseName: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Faculty Name"
                value={editingEntry.facultyName}
                onChange={(e) => setEditingEntry({ ...editingEntry, facultyName: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Room Name"
                value={editingEntry.roomName}
                onChange={(e) => setEditingEntry({ ...editingEntry, roomName: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setEditingEntry(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
