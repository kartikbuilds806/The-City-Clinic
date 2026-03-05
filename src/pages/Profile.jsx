import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
    FaUser, FaCalendarAlt, FaTimes, FaPhone, FaEnvelope, FaTooth,
    FaSignOutAlt, FaCheckCircle, FaClipboardList, FaBan, FaClock,
    FaWhatsapp, FaArrowLeft
} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import '../styles/Profile.css'

const TABS = [
    { id: 'profile', label: 'My Profile', icon: <FaUser /> },
    { id: 'bookings', label: 'My Bookings', icon: <FaCalendarAlt /> },
    { id: 'cancelled', label: 'Cancelled', icon: <FaBan /> },
]

const STATUS_COLOR = {
    Pending: { bg: '#fef9c3', color: '#a16207', dot: '#eab308' },
    Confirmed: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
    Cancelled: { bg: '#fee2e2', color: '#b91c1c', dot: '#ef4444' },
}

function formatDate(isoStr) {
    if (!isoStr) return '—'
    const d = new Date(isoStr)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function CancelModal({ appt, onConfirm, onClose }) {
    const [reason, setReason] = useState('')
    const reasons = [
        'Change of plans',
        'Health improved',
        'Will reschedule',
        'Emergency',
        'Other',
    ]
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Cancel Appointment</h3>
                    <button className="modal-close" onClick={onClose}><FaTimes /></button>
                </div>
                <div className="modal-body">
                    <p className="modal-appt-info">
                        <FaCalendarAlt /> <strong>{appt.date}</strong> at <strong>{appt.time}</strong>
                    </p>
                    <p className="modal-label">Reason for cancellation:</p>
                    <div className="reason-chips">
                        {reasons.map(r => (
                            <button
                                key={r}
                                className={`reason-chip ${reason === r ? 'selected' : ''}`}
                                onClick={() => setReason(r)}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline" onClick={onClose}>Keep Appointment</button>
                    <button
                        className="btn btn-danger"
                        onClick={() => onConfirm(appt.id, reason || 'No reason provided')}
                    >
                        <FaBan /> Confirm Cancellation
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function Profile() {
    const { currentUser, logout, getUserAppointments, cancelAppointment } = useAuth()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('profile')
    const [cancelTarget, setCancelTarget] = useState(null)
    const [showCancelSuccess, setShowCancelSuccess] = useState(false)
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        if (!currentUser) { navigate('/login'); return }
        setAppointments(getUserAppointments())
    }, [currentUser])

    // Refresh appointments after any change
    const refreshAppts = () => setAppointments(getUserAppointments())

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleCancelConfirm = (apptId, reason) => {
        // Find the appointment before cancelling so we can include its details
        const appt = appointments.find(a => a.id === apptId)
        cancelAppointment(apptId, reason)
        setCancelTarget(null)
        setShowCancelSuccess(true)
        setTimeout(() => setShowCancelSuccess(false), 3500)
        refreshAppts()

        // Send WhatsApp cancellation notification to clinic
        if (appt) {
            const msg = encodeURIComponent(
                `❌ *Appointment Cancellation Notice*\n\n` +
                `*Patient Name:* ${currentUser.name}\n` +
                `*Phone:* ${currentUser.phone || appt.phone || 'N/A'}\n` +
                `*Appointment Date:* ${appt.date}\n` +
                `*Appointment Time:* ${appt.time}\n` +
                `*Reason for Cancellation:* ${reason}\n\n` +
                `Please update your records accordingly. Thank you! 🙏`
            )
            window.open(`https://wa.me/918171224519?text=${msg}`, '_blank')
        }
    }

    if (!currentUser) return null

    const allAppts = appointments
    const activeAppts = allAppts.filter(a => a.status !== 'Cancelled')
    const cancelledAppts = allAppts.filter(a => a.status === 'Cancelled')
    const initials = currentUser.name?.slice(0, 2).toUpperCase() || 'PA'
    const memberSince = formatDate(currentUser.createdAt)

    return (
        <div className="profile-page">
            {/* Sidebar */}
            <aside className="profile-sidebar">
                <Link to="/" className="ps-logo">
                    <div className="ps-logo-icon"><FaTooth /></div>
                    <div>
                        <div className="ps-logo-name">City Dental</div>
                        <div className="ps-logo-sub">Clinic</div>
                    </div>
                </Link>

                <div className="ps-avatar-wrap">
                    <div className="ps-avatar">{initials}</div>
                    <div className="ps-name">{currentUser.name}</div>
                    <div className="ps-email">{currentUser.email}</div>
                    <div className="ps-member-since">Member since {memberSince}</div>
                </div>

                <nav className="ps-nav">
                    {TABS.map(t => (
                        <button
                            key={t.id}
                            className={`ps-nav-item ${activeTab === t.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(t.id)}
                        >
                            <span className="psni-icon">{t.icon}</span>
                            <span className="psni-label">{t.label}</span>
                            {t.id === 'bookings' && activeAppts.length > 0 && (
                                <span className="psni-count">{activeAppts.length}</span>
                            )}
                            {t.id === 'cancelled' && cancelledAppts.length > 0 && (
                                <span className="psni-count cancelled">{cancelledAppts.length}</span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="ps-actions">
                    <Link to="/" className="ps-action-btn">
                        <FaArrowLeft /> Back to Website
                    </Link>
                    <button className="ps-action-btn logout" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="profile-main">
                {/* Cancel Success Toast */}
                {showCancelSuccess && (
                    <div className="profile-toast">
                        <FaCheckCircle className="pt-icon" />
                        <div>
                            <div className="pt-title">Appointment Cancelled</div>
                            <div className="pt-msg">Your appointment has been successfully cancelled.</div>
                        </div>
                    </div>
                )}

                {/* ── TAB: PROFILE ───────────────────────────────────────── */}
                {activeTab === 'profile' && (
                    <div className="tab-content">
                        <div className="tab-header">
                            <h1 className="tab-title">My Profile</h1>
                            <p className="tab-subtitle">Your personal information and account details</p>
                        </div>

                        <div className="profile-cards-row">
                            <div className="profile-info-card">
                                <div className="pic-avatar">{initials}</div>
                                <div className="pic-badge">Patient Account</div>
                                <div className="pic-stat-row">
                                    <div className="pic-stat">
                                        <div className="pic-stat-val">{allAppts.length}</div>
                                        <div className="pic-stat-label">Total Bookings</div>
                                    </div>
                                    <div className="pic-stat-sep" />
                                    <div className="pic-stat">
                                        <div className="pic-stat-val">{activeAppts.length}</div>
                                        <div className="pic-stat-label">Active</div>
                                    </div>
                                    <div className="pic-stat-sep" />
                                    <div className="pic-stat">
                                        <div className="pic-stat-val">{cancelledAppts.length}</div>
                                        <div className="pic-stat-label">Cancelled</div>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-details-card">
                                <h3 className="pdc-title">Personal Information</h3>
                                <div className="pdc-fields">
                                    <div className="pdc-field">
                                        <div className="pdc-field-icon"><FaUser /></div>
                                        <div>
                                            <div className="pdc-label">Full Name</div>
                                            <div className="pdc-value">{currentUser.name}</div>
                                        </div>
                                    </div>
                                    <div className="pdc-field">
                                        <div className="pdc-field-icon"><FaEnvelope /></div>
                                        <div>
                                            <div className="pdc-label">Email Address</div>
                                            <div className="pdc-value">{currentUser.email}</div>
                                        </div>
                                    </div>
                                    <div className="pdc-field">
                                        <div className="pdc-field-icon"><FaPhone /></div>
                                        <div>
                                            <div className="pdc-label">Phone Number</div>
                                            <div className="pdc-value">{currentUser.phone || 'Not provided'}</div>
                                        </div>
                                    </div>
                                    <div className="pdc-field">
                                        <div className="pdc-field-icon"><FaCalendarAlt /></div>
                                        <div>
                                            <div className="pdc-label">Member Since</div>
                                            <div className="pdc-value">{memberSince}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pdc-cta-row">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setActiveTab('bookings')}
                                    >
                                        <FaCalendarAlt /> View My Bookings
                                    </button>
                                    <a
                                        href={`https://wa.me/918171224519?text=${encodeURIComponent(`Hello, I am ${currentUser.name}. I would like to book an appointment.`)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="btn btn-whatsapp"
                                    >
                                        <FaWhatsapp /> Book via WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── TAB: MY BOOKINGS ───────────────────────────────────── */}
                {activeTab === 'bookings' && (
                    <div className="tab-content">
                        <div className="tab-header">
                            <h1 className="tab-title">My Bookings</h1>
                            <p className="tab-subtitle">All your appointment requests at City Dental Clinic</p>
                        </div>

                        {activeAppts.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📅</div>
                                <h3>No Appointments Yet</h3>
                                <p>You haven't booked any appointments yet. Book one now!</p>
                                <Link to="/#appointment" className="btn btn-primary" onClick={() => {
                                    navigate('/')
                                    setTimeout(() => document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' }), 300)
                                }}>
                                    Book an Appointment
                                </Link>
                            </div>
                        ) : (
                            <div className="appt-list">
                                {activeAppts.map(appt => {
                                    const sc = STATUS_COLOR[appt.status] || STATUS_COLOR.Pending
                                    return (
                                        <div key={appt.id} className="appt-card">
                                            <div className="ac-left">
                                                <div className="ac-date-box">
                                                    <div className="ac-date-day">{new Date(appt.date).getDate() || appt.date?.split('-')[2]}</div>
                                                    <div className="ac-date-mon">{appt.date ? new Date(appt.date + 'T00:00').toLocaleString('en-IN', { month: 'short' }) : '—'}</div>
                                                </div>
                                            </div>
                                            <div className="ac-body">
                                                <div className="ac-row1">
                                                    <div className="ac-tooth-icon">🦷</div>
                                                    <div className="ac-service">{appt.message || 'General Consultation'}</div>
                                                    <span className="ac-status" style={{ background: sc.bg, color: sc.color }}>
                                                        <span className="ac-status-dot" style={{ background: sc.dot }} />
                                                        {appt.status}
                                                    </span>
                                                </div>
                                                <div className="ac-details">
                                                    <span><FaCalendarAlt /> {appt.date}</span>
                                                    <span><FaClock /> {appt.time}</span>
                                                    {appt.phone && <span><FaPhone /> {appt.phone}</span>}
                                                </div>
                                                <div className="ac-booked">Booked on {formatDate(appt.bookedAt)}</div>
                                            </div>
                                            {appt.status !== 'Cancelled' && (
                                                <div className="ac-actions">
                                                    <button
                                                        className="btn-cancel"
                                                        onClick={() => setCancelTarget(appt)}
                                                    >
                                                        <FaBan /> Cancel
                                                    </button>
                                                    <a
                                                        href={`https://wa.me/918171224519?text=${encodeURIComponent(`Hello, I am ${currentUser.name}. I have an appointment on ${appt.date} at ${appt.time}. I would like to enquire.`)}`}
                                                        target="_blank" rel="noopener noreferrer"
                                                        className="btn-wa-small"
                                                    >
                                                        <FaWhatsapp />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        <div className="tab-book-cta">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    navigate('/')
                                    setTimeout(() => document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' }), 300)
                                }}
                            >
                                <FaCalendarAlt /> Book New Appointment
                            </button>
                        </div>
                    </div>
                )}

                {/* ── TAB: CANCELLED ─────────────────────────────────────── */}
                {activeTab === 'cancelled' && (
                    <div className="tab-content">
                        <div className="tab-header">
                            <h1 className="tab-title">Cancelled Appointments</h1>
                            <p className="tab-subtitle">Appointments that were cancelled</p>
                        </div>

                        {cancelledAppts.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">✅</div>
                                <h3>No Cancelled Appointments</h3>
                                <p>Great! You haven't cancelled any appointments.</p>
                            </div>
                        ) : (
                            <div className="appt-list">
                                {cancelledAppts.map(appt => (
                                    <div key={appt.id} className="appt-card cancelled">
                                        <div className="ac-left">
                                            <div className="ac-date-box cancelled-box">
                                                <div className="ac-date-day">{appt.date?.split('-')[2]}</div>
                                                <div className="ac-date-mon">{appt.date ? new Date(appt.date + 'T00:00').toLocaleString('en-IN', { month: 'short' }) : '—'}</div>
                                            </div>
                                        </div>
                                        <div className="ac-body">
                                            <div className="ac-row1">
                                                <div className="ac-tooth-icon" style={{ filter: 'grayscale(1)', opacity: 0.5 }}>🦷</div>
                                                <div className="ac-service" style={{ opacity: 0.6 }}>{appt.message || 'General Consultation'}</div>
                                                <span className="ac-status" style={{ background: '#fee2e2', color: '#b91c1c' }}>
                                                    <span className="ac-status-dot" style={{ background: '#ef4444' }} />
                                                    Cancelled
                                                </span>
                                            </div>
                                            <div className="ac-details">
                                                <span><FaCalendarAlt /> {appt.date}</span>
                                                <span><FaClock /> {appt.time}</span>
                                            </div>
                                            {appt.cancelReason && (
                                                <div className="ac-cancel-reason">
                                                    <FaBan /> Reason: {appt.cancelReason}
                                                </div>
                                            )}
                                            <div className="ac-booked">Cancelled on {formatDate(appt.cancelledAt)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Cancel Modal */}
            {cancelTarget && (
                <CancelModal
                    appt={cancelTarget}
                    onConfirm={handleCancelConfirm}
                    onClose={() => setCancelTarget(null)}
                />
            )}
        </div>
    )
}
