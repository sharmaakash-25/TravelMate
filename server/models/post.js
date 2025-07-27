//server/models/post.js
import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    location: String,
  },
  { timestamps: true }
)

export default mongoose.model("Post", postSchema)
