import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock } from 'react-icons/fa'
import '../styles/Contact.css'

export default function Contact() {
    const whatsappLink = `https://wa.me/918171224519?text=${encodeURIComponent('Hello! I would like to enquire about City Dental Clinic.')}`

    return (
        <section id="contact" className="contact section-padding">
            <div className="container">
                <div className="section-header">
                    <div className="badge">Get In Touch</div>
                    <h2 className="section-title">
                        Contact <span className="gradient-text">City Dental Clinic</span>
                    </h2>
                    <p className="section-subtitle">
                        We're here to help. Reach out via phone, WhatsApp or visit us in person.
                    </p>
                </div>

                <div className="contact-grid">
                    <div className="contact-cards">
                        <div className="contact-card">
                            <div className="cc-icon address-icon"><FaMapMarkerAlt /></div>
                            <div>
                                <div className="cc-title">Our Address</div>
                                <div className="cc-val">Raipur Main Raipur Chowk, Raipur Rd,<br />near PNB, Dehradun,<br />Uttarakhand — 248008</div>
                                <a
                                    href="https://maps.google.com/?q=Raipur+Main+Raipur+Chowk+Raipur+Rd+near+PNB+Dehradun+Uttarakhand+248008"
                                    className="cc-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open in Maps →
                                </a>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="cc-icon phone-icon"><FaPhone /></div>
                            <div>
                                <div className="cc-title">Phone</div>
                                <a href="tel:+918171224519" className="cc-val-link">+91 81712 24519</a>
                                <div className="cc-note">Available Mon–Sat, 10 AM – 7 PM</div>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="cc-icon wa-icon"><FaWhatsapp /></div>
                            <div>
                                <div className="cc-title">WhatsApp</div>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="cc-val-link">
                                    Chat on WhatsApp
                                </a>
                                <div className="cc-note">Quick queries & appointment booking</div>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="cc-icon time-icon"><FaClock /></div>
                            <div>
                                <div className="cc-title">Working Hours</div>
                                <div className="cc-val">Monday – Saturday</div>
                                <div className="cc-sub">10:00 AM – 7:00 PM</div>
                                <div className="cc-closed">Sunday: Closed</div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-map-wrap">
                        <iframe
                            title="City Dental Clinic Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.5!2d78.02!3d30.30!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092!2sDental%20Clinic%20Raipur%20Dehradun!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div className="map-cta-row">
                            <a href="tel:+918171224519" className="btn btn-primary">
                                <FaPhone /> Call Now
                            </a>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                                <FaWhatsapp /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
