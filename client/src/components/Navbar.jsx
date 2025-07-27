//client/src/components/Navbar.jsx

import React from "react"
import { useNavigate } from "react-router-dom"

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate()
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
      <h1 onClick={() => navigate("/")}>TravelMate</h1>
      {user ? (
        <div>
          <span>Hi, {user.username}</span>
          <button onClick={onLogout} style={{ marginLeft: "1rem" }}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")} style={{ marginLeft: "0.5rem" }}>
            Signup
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
