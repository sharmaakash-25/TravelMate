import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Navbar from "./components/Navbar"

const Root = () => {
  const { user, logout } = useAuth()
  return (
    <>
      <Navbar user={user} onLogout={logout} />
      <App />
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Root />
  </AuthProvider>
)
