//server/server.js
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import protectedRoutes from "./routes/protected.js"
import tripRoutes from "./routes/trips.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api", protectedRoutes)
app.use("/api/trips", tripRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
