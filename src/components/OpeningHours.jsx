import { FaClock, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import '../styles/OpeningHours.css'

const hours = [
    { day: 'Monday', time: '10:00 AM – 7:00 PM', open: true },
    { day: 'Tuesday', time: '10:00 AM – 7:00 PM', open: true },
    { day: 'Wednesday', time: '10:00 AM – 7:00 PM', open: true },
    { day: 'Thursday', time: '10:00 AM – 7:00 PM', open: true },
    { day: 'Friday', time: '10:00 AM – 7:00 PM', open: true },
    { day: 'Saturday', time: '10:00 AM – 7:00 PM', open: true },
    { day: 'Sunday', time: 'Closed', open: false },
]

function getTodayStatus() {
    const now = new Date()
    const day = now.getDay() // 0=Sun, 6=Sat
    const hour = now.getHours()
    const isWeekday = day >= 1 && day <= 6
    const isOpen = isWeekday && hour >= 10 && hour < 19
    return { isOpen, dayName: hours[day === 0 ? 6 : day - 1]?.day }
}

export default function OpeningHours() {
    const { isOpen } = getTodayStatus()

    return (
        <section id="hours" className="opening-hours section-padding">
            <div className="container">
                <div className="hours-grid">
                    <div className="hours-left">
                        <div className="badge"><FaClock /> Working Hours</div>
                        <h2 className="section-title">
                            We Are <span className="gradient-text">{isOpen ? 'Open Now' : 'Closed Now'}</span>
                        </h2>
                        <div className={`status-badge ${isOpen ? 'open' : 'closed'}`}>
                            <span className="status-dot" />
                            {isOpen ? '✅ Open Right Now — Walk-ins Welcome!' : '🔴 Currently Closed'}
                        </div>
                        <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                            Visit us Monday through Saturday. Book in advance to skip the wait.
                        </p>

                        <div className="hours-table">
                            {hours.map((h, i) => {
                                const isToday = new Date().getDay() === (i === 6 ? 0 : i + 1)
                                return (
                                    <div key={i} className={`hours-row ${!h.open ? 'closed-day' : ''} ${isToday ? 'today' : ''}`}>
                                        <div className="hours-day">
                                            {isToday && <span className="today-dot" />}
                                            {h.day}
                                        </div>
                                        <div className={`hours-time ${!h.open ? 'closed-text' : ''}`}>
                                            {h.open ? (
                                                <><FaCheckCircle className="check-icon" /> {h.time}</>
                                            ) : (
                                                <span>🔴 {h.time}</span>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="hours-note">
                            <FaMapMarkerAlt />
                            <span>Raipur Main Raipur Chowk, Raipur Rd, near PNB, Dehradun, UK 248008</span>
                        </div>
                    </div>

                    <div className="hours-map">
                        <div className="map-wrap">
                            <iframe
                                title="City Dental Clinic Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.5!2d78.02!3d30.30!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092!2sDental%20Clinic%20Raipur%20Dehradun!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: 'var(--radius-xl)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <a
                            href="https://maps.google.com/?q=Raipur+Main+Raipur+Chowk+Raipur+Rd+near+PNB+Dehradun+Uttarakhand+248008"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                        >
                            <FaMapMarkerAlt /> Open in Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
