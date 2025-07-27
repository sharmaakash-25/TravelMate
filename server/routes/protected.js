//server/routes/protected.js

import express from "express"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/dashboard", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, this is your dashboard.` })
})

export default router
