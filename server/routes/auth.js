import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

import express from "express"
import { registerUser, loginUser, getMe } from "../controllers/authController.js"

import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({ username, email, password: hashedPassword })
    await user.save()

    res.status(201).json("User registered successfully")
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json("User not found")

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json("Invalid credentials")

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// @route   GET /api/auth/me
// @desc    Get current logged-in user
// @access  Private
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json({ user })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

export default router
