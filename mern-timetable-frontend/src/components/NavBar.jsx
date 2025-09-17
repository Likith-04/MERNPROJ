import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold text-lg">NEP Timetable</Link>
          <Link to="/timetable" className="text-sm text-gray-600 hover:underline">Timetable</Link>
          <Link to="/courses" className="text-sm text-gray-600 hover:underline">Courses</Link>
          <Link to="/faculty" className="text-sm text-gray-600 hover:underline">Faculty</Link>
          <Link to="/rooms" className="text-sm text-gray-600 hover:underline">Rooms</Link>
          <Link to="/students" className="text-sm text-gray-600 hover:underline">Students</Link>

        </div>
        <div>
          {!token ? (
            <Link to="/login" className="px-3 py-1 rounded-md text-sm border">Login</Link>
          ) : (
            <button onClick={handleLogout} className="px-3 py-1 rounded-md text-sm border">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
