import '../styles/Services.css'

const services = [
    {
        icon: '🦷',
        title: 'Tooth Extraction',
        desc: 'Safe and painless removal of damaged, decayed or problematic teeth with minimal discomfort.',
        color: '#dbeafe',
        iconColor: '#1d4ed8',
    },
    {
        icon: '😬',
        title: 'Wisdom Tooth Removal',
        desc: 'Expert surgical extraction of impacted or misaligned wisdom teeth with post-op care guidance.',
        color: '#fce7f3',
        iconColor: '#be185d',
    },
    {
        icon: '🔬',
        title: 'Root Canal Treatment',
        desc: 'Advanced root canal therapy to save infected teeth and relieve severe toothache efficiently.',
        color: '#d1fae5',
        iconColor: '#065f46',
    },
    {
        icon: '💎',
        title: 'Dental Implants',
        desc: 'Permanent titanium implants that look and feel like natural teeth for lasting confidence.',
        color: '#ede9fe',
        iconColor: '#5b21b6',
    },
    {
        icon: '✨',
        title: 'Teeth Cleaning',
        desc: 'Professional scaling and polishing to remove tartar, plaque and stains for brighter smiles.',
        color: '#e0f2fe',
        iconColor: '#0369a1',
    },
    {
        icon: '🌟',
        title: 'Cosmetic Dentistry',
        desc: 'Teeth whitening, veneers and smile makeovers designed to enhance your natural beauty.',
        color: '#fef9c3',
        iconColor: '#a16207',
    },
    {
        icon: '🩺',
        title: 'Gum Treatment',
        desc: 'Comprehensive periodontal care for bleeding gums, gingivitis and gum recession problems.',
        color: '#fee2e2',
        iconColor: '#b91c1c',
    },
    {
        icon: '💡',
        title: 'Laser Dentistry',
        desc: 'Modern laser technology for precise, virtually painless treatments with faster healing times.',
        color: '#ccfbf1',
        iconColor: '#0f766e',
    },
]

export default function Services() {
    return (
        <section id="services" className="services section-padding">
            <div className="container">
                <div className="section-header">
                    <div className="badge">Our Specialities</div>
                    <h2 className="section-title">
                        Comprehensive <span className="gradient-text">Dental Services</span>
                    </h2>
                    <p className="section-subtitle">
                        From preventive care to advanced restorative treatments — we offer a full spectrum
                        of dental services under one roof.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className="service-card"
                            style={{ animationDelay: `${i * 0.08}s` }}
                        >
                            <div className="service-icon-wrap" style={{ background: s.color }}>
                                <span className="service-emoji" style={{ filter: `drop-shadow(0 2px 6px ${s.iconColor}40)` }}>{s.icon}</span>
                            </div>
                            <h3 className="service-title">{s.title}</h3>
                            <p className="service-desc">{s.desc}</p>
                            <button
                                className="service-cta"
                                style={{ color: s.iconColor }}
                                onClick={() => document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Book Now →
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
