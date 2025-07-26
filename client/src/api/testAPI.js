// client/src/api/testAPI.js
import axios from "axios"

export const testAPI = async () => {
  const res = await axios.get("/")
  console.log(res.data)
}
