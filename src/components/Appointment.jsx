import { useState, useEffect } from 'react'
import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaWhatsapp, FaCommentMedical } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Appointment.css'


const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
]

const initialForm = { name: '', phone: '', email: '', date: '', time: '', message: '' }

export default function Appointment() {
    const { currentUser, bookAppointment } = useAuth()
    const [form, setForm] = useState(initialForm)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    // Pre-fill form when user is logged in
    useEffect(() => {
        if (currentUser) {
            setForm(f => ({
                ...f,
                name: currentUser.name || f.name,
                phone: currentUser.phone || f.phone,
                email: currentUser.email || f.email,
            }))
        }
    }, [currentUser])

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid phone required'
        if (!form.date) e.date = 'Please select a date'
        if (!form.time) e.time = 'Please select a time'
        return e
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(f => ({ ...f, [name]: value }))
        if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) { setErrors(errs); return }

        const msg = encodeURIComponent(
            `🦷 *New Appointment Request*\n\n` +
            `*Name:* ${form.name}\n` +
            `*Phone:* ${form.phone}\n` +
            `*Email:* ${form.email || 'Not provided'}\n` +
            `*Date:* ${form.date}\n` +
            `*Time:* ${form.time}\n` +
            `*Dental Issue:* ${form.message || 'Not specified'}`
        )
        window.open(`https://wa.me/918171224519?text=${msg}`, '_blank')

        // Save to user's profile if logged in
        if (currentUser) {
            bookAppointment({
                name: form.name,
                phone: form.phone,
                email: form.email,
                date: form.date,
                time: form.time,
                message: form.message,
            })
        }

        setSubmitted(true)
        setForm(f => ({
            ...initialForm,
            name: currentUser?.name || '',
            phone: currentUser?.phone || '',
            email: currentUser?.email || '',
        }))
        setTimeout(() => setSubmitted(false), 5000)
    }

    const today = new Date().toISOString().split('T')[0]

    return (
        <section id="appointment" className="appointment section-padding">
            <div className="container">
                <div className="appt-wrapper">
                    <div className="appt-info">
                        <div className="badge"><FaCalendarAlt /> Book Appointment</div>
                        <h2 className="section-title" style={{ color: 'white' }}>
                            Schedule Your <span style={{ color: '#7dd3fc' }}>Dental Visit</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.8', margin: '1rem 0 2rem' }}>
                            Book your appointment online in just a few minutes. Your details will be sent directly
                            to our WhatsApp for quick confirmation.
                        </p>

                        <div className="appt-info-items">
                            <div className="appt-info-item">
                                <span className="aii-icon">📍</span>
                                <div>
                                    <div className="aii-title">Address</div>
                                    <div className="aii-val">Raipur Main Raipur Chowk, near PNB, Dehradun</div>
                                </div>
                            </div>
                            <div className="appt-info-item">
                                <span className="aii-icon">⏰</span>
                                <div>
                                    <div className="aii-title">Hours</div>
                                    <div className="aii-val">Mon–Sat: 10 AM – 7 PM</div>
                                </div>
                            </div>
                            <div className="appt-info-item">
                                <span className="aii-icon">📞</span>
                                <div>
                                    <div className="aii-title">Phone</div>
                                    <div className="aii-val">+91 81712 24519</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="appt-form-wrap">
                        {submitted && (
                            <div className="appt-success">
                                <div className="success-icon">✅</div>
                                <h3>Appointment Successfully Booked!</h3>
                                <p>Our clinic will contact you shortly to confirm your appointment.</p>
                                {currentUser && (
                                    <Link to="/profile" className="appt-profile-link">
                                        📋 View in My Bookings →
                                    </Link>
                                )}
                            </div>
                        )}

                        <h3 className="form-heading">Fill in Your Details</h3>
                        <form onSubmit={handleSubmit} className="appt-form" noValidate>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="appt-name"><FaUser /> Full Name</label>
                                    <input
                                        id="appt-name"
                                        type="text"
                                        name="name"
                                        placeholder="Your full name"
                                        className={`form-control ${errors.name ? 'input-error' : ''}`}
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <span className="err-msg">{errors.name}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="appt-phone"><FaPhone /> Phone Number</label>
                                    <input
                                        id="appt-phone"
                                        type="tel"
                                        name="phone"
                                        placeholder="+91 XXXXX XXXXX"
                                        className={`form-control ${errors.phone ? 'input-error' : ''}`}
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && <span className="err-msg">{errors.phone}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="appt-email"><FaEnvelope /> Email (Optional)</label>
                                <input
                                    id="appt-email"
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    className="form-control"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="appt-date"><FaCalendarAlt /> Appointment Date</label>
                                    <input
                                        id="appt-date"
                                        type="date"
                                        name="date"
                                        min={today}
                                        className={`form-control ${errors.date ? 'input-error' : ''}`}
                                        value={form.date}
                                        onChange={handleChange}
                                    />
                                    {errors.date && <span className="err-msg">{errors.date}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="appt-time">⏰ Preferred Time</label>
                                    <select
                                        id="appt-time"
                                        name="time"
                                        className={`form-control ${errors.time ? 'input-error' : ''}`}
                                        value={form.time}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select time slot</option>
                                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    {errors.time && <span className="err-msg">{errors.time}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="appt-msg"><FaCommentMedical /> Dental Issue / Message</label>
                                <textarea
                                    id="appt-msg"
                                    name="message"
                                    rows={3}
                                    placeholder="Describe your dental issue or any special requirements..."
                                    className="form-control"
                                    value={form.message}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-whatsapp appt-submit">
                                <FaWhatsapp /> Book via WhatsApp
                            </button>
                            <p className="appt-note">
                                📋 Details will be sent to our WhatsApp for quick confirmation.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
