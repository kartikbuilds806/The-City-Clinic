import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaTooth, FaBars, FaTimes, FaPhone, FaUser, FaSignOutAlt, FaCalendarAlt, FaChevronDown } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import '../styles/Navbar.css'

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#appointment', label: 'Appointment' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const userMenuRef = useRef(null)
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close user menu on outside click
    useEffect(() => {
        const handler = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setShowUserMenu(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleNavClick = (href) => {
        setIsOpen(false)
        if (window.location.pathname !== '/') {
            navigate('/')
            setTimeout(() => {
                const el = document.querySelector(href)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 350)
        } else {
            const el = document.querySelector(href)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleLogout = () => {
        logout()
        setShowUserMenu(false)
        navigate('/')
    }

    const initials = currentUser?.name?.slice(0, 2).toUpperCase() || 'PA'

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-inner">
                <Link to="/" className="nav-logo">
                    <div className="logo-icon"><FaTooth /></div>
                    <div className="logo-text">
                        <span className="logo-main">City Dental</span>
                        <span className="logo-sub">Clinic</span>
                    </div>
                </Link>

                <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
                    {navLinks.map(link => (
                        <button
                            key={link.href}
                            className="nav-link"
                            onClick={() => handleNavClick(link.href)}
                        >
                            {link.label}
                        </button>
                    ))}

                    {/* Auth area in mobile drawer */}
                    <div className="nav-auth-links">
                        {currentUser ? (
                            <>
                                <Link to="/profile" className="nav-link" onClick={() => setIsOpen(false)}>My Profile</Link>
                                <button className="nav-link" onClick={() => { handleLogout(); setIsOpen(false) }}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link to="/signup" className="btn btn-primary nav-cta" onClick={() => setIsOpen(false)}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Desktop right side */}
                <div className="nav-right">
                    <a href="tel:+918171224519" className="nav-phone" aria-label="Call clinic">
                        <FaPhone /> <span>+91 81712 24519</span>
                    </a>

                    {currentUser ? (
                        <div className="user-menu-wrap" ref={userMenuRef}>
                            <button className="user-avatar-btn" onClick={() => setShowUserMenu(s => !s)} aria-label="User menu">
                                <div className="nav-avatar">{initials}</div>
                                <span className="nav-username">{currentUser.name.split(' ')[0]}</span>
                                <FaChevronDown className={`nav-chevron ${showUserMenu ? 'open' : ''}`} />
                            </button>

                            {showUserMenu && (
                                <div className="user-dropdown">
                                    <div className="ud-header">
                                        <div className="ud-avatar">{initials}</div>
                                        <div>
                                            <div className="ud-name">{currentUser.name}</div>
                                            <div className="ud-email">{currentUser.email}</div>
                                        </div>
                                    </div>
                                    <div className="ud-divider" />
                                    <Link to="/profile" className="ud-item" onClick={() => setShowUserMenu(false)}>
                                        <FaUser /> My Profile
                                    </Link>
                                    <Link to="/profile" className="ud-item" onClick={() => { setShowUserMenu(false); setTimeout(() => { }, 0) }}>
                                        <FaCalendarAlt /> My Appointments
                                    </Link>
                                    <div className="ud-divider" />
                                    <button className="ud-item ud-logout" onClick={handleLogout}>
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="nav-auth-desktop">
                            <Link to="/login" className="nav-link nav-login-link">Login</Link>
                            <Link to="/signup" className="btn btn-primary nav-cta">Sign Up</Link>
                        </div>
                    )}
                </div>

                <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}
        </header>
    )
}
