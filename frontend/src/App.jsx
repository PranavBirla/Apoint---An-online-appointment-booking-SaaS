import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BrowseProfessionals from './pages/BrowseProfessionals'
import ProfessionalProfile from './pages/ProfessionalProfile'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/professionals" element={<BrowseProfessionals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/professional/get/:id" element={<ProfessionalProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
