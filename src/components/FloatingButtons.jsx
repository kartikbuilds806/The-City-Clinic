import { useState } from 'react'
import '../styles/FloatingButtons.css'
import { FaWhatsapp, FaPhone, FaTimes } from 'react-icons/fa'

export default function FloatingButtons() {
    const [showTooltip, setShowTooltip] = useState(false)
    const whatsappLink = `https://wa.me/918171224519?text=${encodeURIComponent('Hello! I have a quick question about City Dental Clinic.')}`

    return (
        <div className="floating-buttons">
            <div style={{ position: 'relative' }}>
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="float-btn float-whatsapp"
                    aria-label="WhatsApp"
                    onMouseEnter={() => setShowTooltip('wa')}
                    onMouseLeave={() => setShowTooltip(false)}
                    title="Chat on WhatsApp"
                >
                    <FaWhatsapp />
                </a>
                {showTooltip === 'wa' && (
                    <div className="float-tooltip">💬 WhatsApp Us</div>
                )}
                <div className="float-ring float-ring-wa" />
            </div>

            <div style={{ position: 'relative' }}>
                <a
                    href="tel:+918171224519"
                    className="float-btn float-call"
                    aria-label="Call us"
                    onMouseEnter={() => setShowTooltip('call')}
                    onMouseLeave={() => setShowTooltip(false)}
                    title="Call the clinic"
                >
                    <FaPhone />
                </a>
                {showTooltip === 'call' && (
                    <div className="float-tooltip">📞 Call Clinic</div>
                )}
            </div>
        </div>
    )
}
