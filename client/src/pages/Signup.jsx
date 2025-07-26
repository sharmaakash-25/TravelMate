import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()

  const handleSignup = async e => {
    e.preventDefault()
    try {
      await axios.post("/api/auth/register", form)
      navigate("/login")
    } catch (err) {
      alert("Signup failed")
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" required />
      <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" required />
      <button type="submit">Signup</button>
    </form>
  )
}

export default Signup
