import { useEffect, useRef } from 'react'
import { FaWhatsapp, FaCalendarAlt, FaStar, FaShieldAlt, FaSmile } from 'react-icons/fa'
import '../styles/Hero.css'

const stats = [
    { icon: <FaStar />, value: '4.3★', label: '141 Reviews' },
    { icon: <FaSmile />, value: '5000+', label: 'Happy Patients' },
    { icon: <FaShieldAlt />, value: '100%', label: 'Safe & Sterile' },
]

export default function Hero() {
    const whatsappLink = `https://wa.me/918171224519?text=${encodeURIComponent('Hello, I would like to consult with City Dental Clinic.')}`

    return (
        <section id="home" className="hero">
            <div className="hero-bg-overlay" />
            <div className="hero-particles">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`particle particle-${i + 1}`} />
                ))}
            </div>

            <div className="container hero-content">
                <div className="hero-badge animate-fadeInUp">
                    <FaStar className="badge-icon" />
                    Top Rated Dental Clinic in Dehradun
                </div>

                <h1 className="hero-title animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    Your Smile, Our
                    <span className="hero-title-highlight"> Priority</span>
                    <br />
                    <span className="hero-tagline">Healthy, Happy &amp; Brighter Smile</span>
                </h1>

                <p className="hero-desc animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    Advanced dental care with modern technology, compassionate team and
                    sterilized protocols — right here in Dehradun.
                </p>

                <div className="hero-actions animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                    <button
                        className="btn btn-primary hero-btn"
                        onClick={() => {
                            const el = document.querySelector('#appointment')
                            if (el) el.scrollIntoView({ behavior: 'smooth' })
                        }}
                    >
                        <FaCalendarAlt /> Book Appointment
                    </button>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp hero-btn"
                    >
                        <FaWhatsapp /> WhatsApp Consultation
                    </a>
                </div>

                <div className="hero-stats animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
                    {stats.map((s, i) => (
                        <div key={i} className="hero-stat">
                            <span className="stat-icon">{s.icon}</span>
                            <div>
                                <div className="stat-value">{s.value}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="hero-scroll-indicator">
                <div className="scroll-line" />
                <span>Scroll Down</span>
            </div>
        </section>
    )
}
