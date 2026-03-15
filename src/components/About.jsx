import { FaShieldAlt, FaMicroscope, FaUserMd, FaAward, FaHeart } from 'react-icons/fa'
import '../styles/About.css'
import clinicPhoto from '../assets/frontdoor.webp'

const features = [
    { icon: <FaShieldAlt />, title: 'Sterile & Safe', desc: 'We follow strict sterilization protocols for all instruments and surfaces.' },
    { icon: <FaMicroscope />, title: 'Modern Equipment', desc: 'State-of-the-art dental equipment for accurate diagnosis and painless treatment.' },
    { icon: <FaHeart />, title: 'Patient Comfort', desc: 'Anxiety-free environment, gentle approach and personalised care for every patient.' },
    { icon: <FaAward />, title: '10+ Years Experience', desc: 'Trusted by thousands of families with over a decade of quality dental services.' },
]

export default function About() {
    return (
        <section id="about" className="about section-padding">
            <div className="container">
                <div className="about-grid">
                    <div className="about-visual">
                        <div className="about-img-wrap">
                            <div className="about-img-placeholder">
                                <img
                                    src={clinicPhoto}
                                    alt="City Dental Clinic"
                                    className="about-real-img"
                                />
                                <div className="about-img-pill">Since 2017</div>
                            </div>
                            <div className="about-stat-card">
                                <div className="asc-value">5,000<span>+</span></div>
                                <div className="asc-label">Happy Patients</div>
                            </div>
                            <div className="about-stat-card about-stat-card-2">
                                <div className="asc-value">4.3<span>★</span></div>
                                <div className="asc-label">Google Rating</div>
                            </div>
                        </div>
                    </div>

                    <div className="about-content">
                        <div className="badge">
                            <FaUserMd /> About Us
                        </div>
                        <h2 className="section-title">
                            Welcome to <span className="gradient-text">City Dental Clinic</span>
                        </h2>
                        <p className="section-subtitle" style={{ marginBottom: '1.5rem' }}>
                            Located in the heart of Raipur, Dehradun, City Dental Clinic has been serving the community
                            with compassionate, affordable and high-quality dental care for over 10 years.
                        </p>
                        <p style={{ color: 'var(--gray-500)', lineHeight: '1.8', marginBottom: '2rem' }}>
                            Our mission is simple — to give every patient a smile they're proud of.
                            Whether it's a routine cleaning or a complex dental implant, our team approaches
                            every procedure with precision, empathy and the latest clinical techniques.
                        </p>

                        <div className="about-features">
                            {features.map((f, i) => (
                                <div key={i} className="about-feature">
                                    <div className="af-icon">{f.icon}</div>
                                    <div>
                                        <div className="af-title">{f.title}</div>
                                        <div className="af-desc">{f.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ marginTop: '2rem' }}
                            onClick={() => document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Book an Appointment
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
