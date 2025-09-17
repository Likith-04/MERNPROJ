export default function Dashboard(){
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600">
        Welcome — this is the MERN timetable frontend skeleton. Use the nav to open the Timetable view.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">Courses</div>
        <div className="p-4 bg-white shadow rounded">Faculty</div>
        <div className="p-4 bg-white shadow rounded">Rooms</div>
      </div>
    </div>
  )
}
