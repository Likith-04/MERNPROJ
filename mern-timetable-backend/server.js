import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
import courseRoutes from "./routes/courseRoutes.js"
import facultyRoutes from "./routes/facultyRoutes.js"
import roomRoutes from "./routes/roomRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import scheduleRoutes from "./routes/scheduleRoutes.js"

app.use("/api/courses", courseRoutes)
app.use("/api/faculty", facultyRoutes)
app.use("/api/rooms", roomRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/schedules", scheduleRoutes)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
