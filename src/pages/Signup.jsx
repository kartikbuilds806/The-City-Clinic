import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTooth, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

export default function Signup() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
    const [showPass, setShowPass] = useState(false)
    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [createdName, setCreatedName] = useState('')
    const { signup } = useAuth()
    const navigate = useNavigate()

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.includes('@')) e.email = 'Valid email required'
        if (form.phone.length < 10) e.phone = 'Valid phone number required'
        if (form.password.length < 8) e.password = 'Min 8 characters required'
        if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
        return e
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setApiError('')
        const errs = validate()
        if (Object.keys(errs).length > 0) { setErrors(errs); return }
        setLoading(true)

        setTimeout(() => {
            const result = signup({
                name: form.name.trim(),
                email: form.email.trim().toLowerCase(),
                phone: form.phone.trim(),
                password: form.password,
            })
            setLoading(false)
            if (!result.success) {
                setApiError(result.error)
                return
            }
            setCreatedName(form.name)
            setSuccess(true)
            setTimeout(() => navigate('/profile'), 3000)
        }, 800)
    }

    const handleChange = (key) => (e) => {
        setForm(f => ({ ...f, [key]: e.target.value }))
        if (errors[key]) setErrors(er => ({ ...er, [key]: '' }))
    }

    if (success) {
        return (
            <div className="auth-success-screen">
                <div className="asm-card">
                    <div className="asm-icon">🎉</div>
                    <h2>Congratulations!</h2>
                    <p>Your account has been successfully created.</p>
                    <p className="asm-sub">Welcome to City Dental Clinic, {createdName}! 🦷</p>
                    <div className="asm-redirect">
                        <span className="asm-spinner" /> Redirecting to your profile...
                    </div>
                    <Link to="/profile" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                        Go to My Profile →
                    </Link>
                </div>
            </div>
        )
    }

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
                    <h2 className="auth-side-title">Create your patient account</h2>
                    <p className="auth-side-desc">
                        Join thousands of happy patients. Get a personal dashboard to manage all your dental appointments.
                    </p>
                    <div className="auth-side-features">
                        {[
                            '🆓 Free Registration',
                            '📅 Book & Track Appointments',
                            '❌ Cancel Anytime',
                            '📋 Dental Visit History',
                            '💬 WhatsApp Notifications',
                        ].map((f, i) => (
                            <div key={i} className="asf-item">{f}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="auth-form-side">
                <div className="auth-card">
                    <div className="auth-card-header">
                        <h1 className="auth-card-title">Create Account</h1>
                        <p className="auth-card-sub">Join City Dental Clinic today</p>
                    </div>

                    {apiError && <div className="auth-error">{apiError}</div>}

                    <form onSubmit={handleSubmit} className="auth-form" noValidate>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Your full name"
                                className={`form-control ${errors.name ? 'input-error' : ''}`}
                                value={form.name} onChange={handleChange('name')} />
                            {errors.name && <span className="err-msg">{errors.name}</span>}
                        </div>

                        <div className="auth-row">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="your@email.com"
                                    className={`form-control ${errors.email ? 'input-error' : ''}`}
                                    value={form.email} onChange={handleChange('email')} />
                                {errors.email && <span className="err-msg">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="+91 XXXXX XXXXX"
                                    className={`form-control ${errors.phone ? 'input-error' : ''}`}
                                    value={form.phone} onChange={handleChange('phone')} />
                                {errors.phone && <span className="err-msg">{errors.phone}</span>}
                            </div>
                        </div>

                        <div className="auth-row">
                            <div className="form-group">
                                <label>Password</label>
                                <div className="pass-wrap">
                                    <input type={showPass ? 'text' : 'password'} placeholder="Min 8 characters"
                                        className={`form-control ${errors.password ? 'input-error' : ''}`}
                                        value={form.password} onChange={handleChange('password')} />
                                    <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)}>
                                        {showPass ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <span className="err-msg">{errors.password}</span>}
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" placeholder="Repeat password"
                                    className={`form-control ${errors.confirm ? 'input-error' : ''}`}
                                    value={form.confirm} onChange={handleChange('confirm')} />
                                {errors.confirm && <span className="err-msg">{errors.confirm}</span>}
                            </div>
                        </div>

                        <button type="submit" className={`btn btn-primary auth-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                            {loading ? <span className="spinner" /> : <><FaCheckCircle /> Create Account</>}
                        </button>
                    </form>

                    <p className="auth-redirect">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                    <Link to="/" className="auth-back">← Back to Website</Link>
                </div>
            </div>
        </div>
    )
}
