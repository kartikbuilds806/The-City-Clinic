import '../styles/Gallery.css'

const galleryItems = [
    { emoji: '🏥', label: 'Reception Area', desc: 'Welcoming & comfortable reception' },
    { emoji: '🦷', label: 'Treatment Room', desc: 'Modern dental equipment' },
    { emoji: '🔬', label: 'Sterilization Unit', desc: 'Latest autoclave sterilization' },
    { emoji: '💡', label: 'Laser Unit', desc: 'Advanced laser dentistry' },
    { emoji: '😁', label: 'Patient Smiles', desc: 'Beautiful smile transformations' },
    { emoji: '🩺', label: 'Consultation', desc: 'Personalized dental consultations' },
    { emoji: '✨', label: 'Teeth Whitening', desc: 'Professional whitening results' },
    { emoji: '🏆', label: 'Our Team', desc: 'Dedicated dental professionals' },
]

const gradients = [
    'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    'linear-gradient(135deg, #d1fae5, #a7f3d0)',
    'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    'linear-gradient(135deg, #fef9c3, #fde68a)',
    'linear-gradient(135deg, #ccfbf1, #99f6e4)',
    'linear-gradient(135deg, #fee2e2, #fecaca)',
    'linear-gradient(135deg, #e0f2fe, #bae6fd)',
]

export default function Gallery() {
    return (
        <section id="gallery" className="gallery section-padding">
            <div className="container">
                <div className="section-header">
                    <div className="badge">Gallery</div>
                    <h2 className="section-title">
                        A Peek Inside Our <span className="gradient-text">Clinic</span>
                    </h2>
                    <p className="section-subtitle">
                        Clean, modern and patient-friendly — see what makes City Dental Clinic the top choice in Dehradun.
                    </p>
                </div>

                <div className="gallery-grid">
                    {galleryItems.map((item, i) => (
                        <div
                            key={i}
                            className="gallery-item"
                            style={{ animationDelay: `${i * 0.06}s` }}
                        >
                            <div className="gallery-img" style={{ background: gradients[i] }}>
                                <span className="gallery-emoji">{item.emoji}</span>
                                <div className="gallery-overlay">
                                    <div className="go-label">{item.label}</div>
                                    <div className="go-desc">{item.desc}</div>
                                </div>
                            </div>
                            <div className="gallery-caption">
                                <span className="gc-label">{item.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
