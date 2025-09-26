// import { Routes, Route } from 'react-router-dom'
// import Dashboard from './pages/Dashboard'
// import Timetable from './pages/Timetable'
// import Login from './pages/Login'
// import NavBar from './components/NavBar'
// import ProtectedRoute from './components/ProtectedRoute'
// import Courses from './pages/Courses'
// import Faculty from './pages/Faculty'
// import Rooms from './pages/Rooms'
// import Students from './pages/Students'



// export default function App() {
//   return (
//     <div className="min-h-screen">
//       <NavBar />
//       <main className="p-6 max-w-7xl mx-auto">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/timetable" element={<Timetable />} />
//           <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//           <Route path="/timetable" element={<ProtectedRoute><Timetable /></ProtectedRoute>} />
//           <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
//           <Route path="/faculty" element={<ProtectedRoute><Faculty /></ProtectedRoute>} />
//           <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
//           <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
//         </Routes>
//       </main>
//     </div>
//   )
// }

// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Students from "./pages/Students";
import Rooms from "./pages/Rooms";
import Timetable from "./pages/Timetable";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* All protected routes share the Layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/students" element={<Students />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/timetable" element={<Timetable />} />
      </Route>

      {/* fallback: redirect to dashboard (optional) */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
}
