// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import api from "../services/api"

// export default function Login() {
//   const navigate = useNavigate()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await api.post("/auth/login", { email, password })
//       localStorage.setItem("token", res.data.token)
//       navigate("/") // go to dashboard
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed")
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-blue-200 relative overflow-hidden">
//       {/* Animated blobs in background */}
      
//       <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//       <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//       <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

//       {/* Glassmorphism login card */}
//       <div className="relative z-10 w-full max-w-md bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Admin Login
//         </h1>
//         {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none bg-white/60"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none bg-white/60"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-sm text-center text-gray-700 mt-4">
//           Don’t have an account?{" "}
//           <a
//             href="/register"
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   )
// }


import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      navigate("/") // go to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-blue-200 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-8">
        {/* App Branding */}
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 via-indigo-300 to-indigo-100 bg-clip-text text-transparent mb-2">
          Timetable.ai
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          AI-Powered Smart Timetable Generator
        </p>

        {/* Login Form */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Admin Login
        </h2>
        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-700 mt-4">
           Don’t have an account?{" "}
          <a            href="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up
          </a>
       </p>
      </div>
    </div>
  )
}
