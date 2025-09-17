import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Timetable from './pages/Timetable'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import Courses from './pages/Courses'
import Faculty from './pages/Faculty'
import Rooms from './pages/Rooms'
import Students from './pages/Students'



export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="p-6 max-w-7xl mx-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/timetable" element={<ProtectedRoute><Timetable /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/faculty" element={<ProtectedRoute><Faculty /></ProtectedRoute>} />
          <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

// import React from "react";
// import CourseList from "./components/CourseList";
// function App() {
//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">AI Timetable System</h1>
//       <CourseList />
//     </div>
//   );
// }

// export default App;
