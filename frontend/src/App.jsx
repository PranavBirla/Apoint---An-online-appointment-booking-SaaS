import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BrowseProfessionals from './pages/BrowseProfessionals'
import ProfessionalProfile from './pages/ProfessionalProfile'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import MyAppointments from './pages/MyAppointments'
import Messages from './pages/Messages'
import Favorites from './pages/Favorites'
import Settings from './pages/Setings'
import ProfessionalSettings from './pages/ProfessionalSetings'
import PageLoader from './components/common/PageLoader'
import LandingPage from './pages/LandingPage'

import ProfessionalDashboard from './pages/ProfessionalDashboard'
import ProfessionalAppointments from './pages/ProfessionalAppointments'
import ProfessionalAvailability from './pages/ProfessionalAvailability'
import ProfessionalProfileManagement from './pages/ProfessionalProfileManagement'
import CancelAppointment from './pages/CancelAppointment'
import VerifyEmail from './pages/VerifyEmail'

import ClientRoute from './routes/ClientRoute'
import ProfessionalRoute from './routes/ProfessionalRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/loader" element={<PageLoader />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />}/>


        <Route path="/professionals" element={
          <ClientRoute>
            <BrowseProfessionals />
          </ClientRoute>} />

        <Route path="/professional/get/:id" element={
          <ClientRoute>
            <ProfessionalProfile />
          </ClientRoute>} />

        <Route path="/appointments" element={
          <ClientRoute>
            <MyAppointments />
          </ClientRoute>} />

        <Route path="/favorites" element={
          <ClientRoute>
            <Favorites />
          </ClientRoute>} />

        <Route path="/messages" element={
          <ClientRoute>
            <Messages />
          </ClientRoute>} />

        <Route path="/settings" element={
          <ClientRoute>
            <Settings />
          </ClientRoute>} />

        <Route path="/appointments/:id/cancel" element={
          <ClientRoute>
            <CancelAppointment />
          </ClientRoute>
        } />



        <Route path="/professional/settings" element={
          <ProfessionalRoute>
            <ProfessionalSettings />
          </ProfessionalRoute>} />

        <Route path="/professional/dashboard" element={
          <ProfessionalRoute>
            <ProfessionalDashboard />
          </ProfessionalRoute>} />

        <Route path="/professional/appointments" element={
          <ProfessionalRoute>
            <ProfessionalAppointments />
          </ProfessionalRoute>} />

        <Route path="/professional/availability" element={
          <ProfessionalRoute>
            <ProfessionalAvailability />
          </ProfessionalRoute>} />

        <Route path="/professional/profile" element={
          <ProfessionalRoute>
            <ProfessionalProfileManagement />
          </ProfessionalRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
