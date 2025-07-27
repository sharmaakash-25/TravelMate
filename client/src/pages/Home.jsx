//client/src/pages/Home.jsx

import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Home = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate("/login")
  }, [user])

  return (
    <div>
      <h1>Welcome to TravelMate, {user?.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
