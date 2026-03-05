import { FaTooth, FaPhone, FaWhatsapp, FaMapMarkerAlt, FaStar, FaInstagram, FaFacebook } from 'react-icons/fa'
import '../styles/Footer.css'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <div className="fl-icon"><FaTooth /></div>
                            <div>
                                <div className="fl-main">City Dental Clinic</div>
                                <div className="fl-sub">Dehradun, Uttarakhand</div>
                            </div>
                        </div>
                        <p className="footer-desc">
                            Trusted dental care with modern equipment, sterilization protocols and compassionate patient-first approach.
                        </p>
                        <div className="footer-rating">
                            <span className="fr-stars">★★★★☆</span>
                            <span>4.3 / 5 · 141 Google Reviews</span>
                        </div>
                    </div>

                    <div className="footer-col">
                        <div className="fc-title">Quick Links</div>
                        <div className="fc-links">
                            {['home', 'about', 'services', 'appointment', 'reviews', 'contact'].map(s => (
                                <button
                                    key={s}
                                    className="fc-link"
                                    onClick={() => document.querySelector(`#${s}`)?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    → {s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="footer-col">
                        <div className="fc-title">Services</div>
                        <div className="fc-links">
                            {['Tooth Extraction', 'Wisdom Tooth', 'Root Canal', 'Dental Implants', 'Teeth Cleaning', 'Cosmetic Dentistry', 'Gum Treatment', 'Laser Dentistry'].map(s => (
                                <span key={s} className="fc-text">→ {s}</span>
                            ))}
                        </div>
                    </div>

                    <div className="footer-col">
                        <div className="fc-title">Contact Us</div>
                        <div className="footer-contacts">
                            <div className="fcon">
                                <FaMapMarkerAlt className="fcon-icon" />
                                <span>Raipur Main Raipur Chowk, Raipur Rd, near PNB, Dehradun, UK 248008</span>
                            </div>
                            <div className="fcon">
                                <FaPhone className="fcon-icon" />
                                <a href="tel:+918171224519">+91 81712 24519</a>
                            </div>
                            <div className="fcon">
                                <FaWhatsapp className="fcon-icon" />
                                <a href="https://wa.me/918171224519" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
                            </div>
                        </div>
                        <div className="footer-hours">
                            <div className="fh-row"><span>Mon – Sat</span><span>10 AM – 7 PM</span></div>
                            <div className="fh-row closed"><span>Sunday</span><span>Closed</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <span>© {year} City Dental Clinic. All rights reserved.</span>
                    <span>Made with ❤️ for better smiles in Dehradun</span>
                </div>
            </div>
        </footer>
    )
}
