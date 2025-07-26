import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to TravelMate</h1>} />
      </Routes>
    </Router>
  )
}

export default App
