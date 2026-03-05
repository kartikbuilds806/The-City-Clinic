import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import DoctorInfo from './components/DoctorInfo'
import OpeningHours from './components/OpeningHours'
import Appointment from './components/Appointment'
import Reviews from './components/Reviews'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <DoctorInfo />
      <OpeningHours />
      <Appointment />
      <Reviews />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingButtons />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
