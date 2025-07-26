import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const res = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUser(res.data.user)
      } catch (err) {
        localStorage.removeItem("token")
        setUser(null)
      }
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
