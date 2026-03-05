import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTooth, FaEye, FaEyeSlash, FaWhatsapp } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (!form.email.trim() || !form.password) { setError('Please fill in all fields.'); return }
        setLoading(true)

        setTimeout(() => {
            const result = login(form.email.trim(), form.password)
            setLoading(false)
            if (!result.success) {
                setError(result.error)
                return
            }
            navigate('/profile')
        }, 700)
    }

    const whatsappLink = `https://wa.me/918171224519?text=${encodeURIComponent('Hello, I want to book an appointment at City Dental Clinic.')}`

    return (
        <div className="auth-page">
            <div className="auth-side">
                <div className="auth-side-content">
                    <div className="auth-logo">
                        <div className="auth-logo-icon"><FaTooth /></div>
                        <div>
                            <div className="auth-clinic-name">City Dental Clinic</div>
                            <div className="auth-clinic-loc">Dehradun, Uttarakhand</div>
                        </div>
                    </div>
                    <h2 className="auth-side-title">Access your patient dashboard</h2>
                    <p className="auth-side-desc">
                        Login to manage your appointments, track your dental history and book new visits with ease.
                    </p>
                    <div className="auth-side-features">
                        {[
                            '📅 View & Manage Appointments',
                            '❌ Cancel Bookings Anytime',
                            '📋 Your Dental History',
                            '👤 Personalised Profile',
                        ].map((f, i) => (
                            <div key={i} className="asf-item">{f}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="auth-form-side">
                <div className="auth-card">
                    <div className="auth-card-header">
                        <h1 className="auth-card-title">Welcome Back! 👋</h1>
                        <p className="auth-card-sub">Login to your patient account</p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form" noValidate>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="form-control"
                                value={form.email}
                                onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setError('') }}
                                autoComplete="email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className="pass-wrap">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="form-control"
                                    value={form.password}
                                    onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setError('') }}
                                    autoComplete="current-password"
                                />
                                <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)}>
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className={`btn btn-primary auth-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                            {loading ? <span className="spinner" /> : 'Login to My Dashboard'}
                        </button>
                    </form>

                    <div className="auth-divider"><span>or</span></div>

                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp auth-btn">
                        <FaWhatsapp /> Quick WhatsApp Booking
                    </a>

                    <p className="auth-redirect">
                        Don't have an account? <Link to="/signup">Create Account</Link>
                    </p>
                    <Link to="/" className="auth-back">← Back to Website</Link>
                </div>
            </div>
        </div>
    )
}
