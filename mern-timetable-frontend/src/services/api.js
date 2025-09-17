import axios from 'axios'

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api',
//   withCredentials: true,
// })

// MOCK API until backend is ready
const api = {
  post: async (url, body) => {
    if (url === "/auth/login") {
      if (body.email === "admin@gmail.com" && body.password === "admin123") {
        return {
          data: { token: "mock-jwt-token" }
        }
      }
      throw { response: { data: { message: "Invalid credentials" } } }
    }
    throw { response: { data: { message: "Unknown API endpoint" } } }
  }
}

export default api

