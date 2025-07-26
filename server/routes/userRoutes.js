import express from "express"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, welcome to your dashboard!` })
})

export default router
