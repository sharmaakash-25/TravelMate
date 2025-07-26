import express from "express"
import Trip from "../models/Trip.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// Create a new trip
router.post("/", protect, async (req, res) => {
  try {
    const { title, destination, startDate, endDate, description } = req.body
    const trip = new Trip({
      title,
      destination,
      startDate,
      endDate,
      description,
      createdBy: req.user.id,
    })
    const savedTrip = await trip.save()
    res.status(201).json(savedTrip)
  } catch (err) {
    res.status(500).json({ error: "Server Error" })
  }
})

// Get all trips of logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const trips = await Trip.find({ createdBy: req.user.id }).sort({ createdAt: -1 })
    res.json(trips)
  } catch (err) {
    res.status(500).json({ error: "Server Error" })
  }
})

// Delete a trip
router.delete("/:id", protect, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)

    if (!trip) return res.status(404).json({ error: "Trip not found" })
    if (trip.createdBy.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" })

    await trip.remove()
    res.json({ message: "Trip deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: "Server Error" })
  }
})

export default router
