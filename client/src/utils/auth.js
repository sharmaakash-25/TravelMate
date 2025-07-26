// client/src/utils/auth.js

export const logoutUser = () => {
  localStorage.removeItem("token")
  window.location.href = "/login" // or navigate using useNavigate if inside React component
}
