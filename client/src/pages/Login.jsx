import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      navigate("/")
    } catch (err) {
      alert("Login failed")
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
