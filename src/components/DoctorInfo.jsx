import { FaMedal, FaUserFriends, FaClinicMedical, FaPhoneAlt } from 'react-icons/fa'
import '../styles/DoctorInfo.css'

const highlights = [
    { icon: <FaMedal />, text: 'BDS & MDS Qualified' },
    { icon: <FaUserFriends />, text: '10+ Years Experience' },
    { icon: <FaClinicMedical />, text: 'Modern Techniques' },
    { icon: <FaPhoneAlt />, text: '24/7 Emergency Advice' },
]

export default function DoctorInfo() {
    return (
        <section id="doctor" className="doctor-info section-padding">
            <div className="container">
                <div className="doctor-grid">
                    <div className="doctor-content">
                        <div className="badge"><FaMedal /> Our Clinic</div>
                        <h2 className="section-title">
                            Expert Care You Can <span className="gradient-text">Trust</span>
                        </h2>
                        <p style={{ color: 'var(--gray-500)', lineHeight: '1.8', margin: '1.25rem 0' }}>
                            At City Dental Clinic, our team of qualified dental professionals is committed to providing
                            the highest standard of care. Our lead dentist brings over 10 years of clinical expertise
                            in a wide range of procedures — from preventive dentistry to complex oral surgeries.
                        </p>
                        <p style={{ color: 'var(--gray-500)', lineHeight: '1.8', marginBottom: '2rem' }}>
                            We believe every patient deserves personalised attention. Our approach combines
                            clinical excellence with a warm, anxiety-free environment so you always feel comfortable
                            and confident in your treatment plan.
                        </p>
                        <div className="doc-highlights">
                            {highlights.map((h, i) => (
                                <div key={i} className="doc-highlight">
                                    <span className="dh-icon">{h.icon}</span>
                                    <span className="dh-text">{h.text}</span>
                                </div>
                            ))}
                        </div>
                        <a href="tel:+918171224519" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                            <FaPhoneAlt /> Call Us Now
                        </a>
                    </div>

                    <div className="doctor-visual">
                        <div className="doc-card">
                            <div className="doc-avatar">🩺</div>
                            <div className="doc-card-body">
                                <div className="doc-badge-chips">
                                    <span className="chip chip-blue">BDS Qualified</span>
                                    <span className="chip chip-teal">10+ Years Exp.</span>
                                </div>
                                <h3 className="doc-name">Experienced Dental Team</h3>
                                <p className="doc-designation">City Dental Clinic, Dehradun</p>
                                <div className="doc-divider" />
                                <div className="doc-meta">
                                    <div className="doc-meta-item">
                                        <div className="dm-val">5000+</div>
                                        <div className="dm-label">Patients</div>
                                    </div>
                                    <div className="doc-meta-sep" />
                                    <div className="doc-meta-item">
                                        <div className="dm-val">10+</div>
                                        <div className="dm-label">Years</div>
                                    </div>
                                    <div className="doc-meta-sep" />
                                    <div className="doc-meta-item">
                                        <div className="dm-val">4.3★</div>
                                        <div className="dm-label">Rating</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="doc-features-list">
                            <div className="doc-feat-item">✅ Painless Treatment</div>
                            <div className="doc-feat-item">✅ Child-Friendly Approach</div>
                            <div className="doc-feat-item">✅ Emergency Dental Care</div>
                            <div className="doc-feat-item">✅ Affordable Pricing</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
