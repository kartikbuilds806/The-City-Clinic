import '../styles/Gallery.css'

import img1 from '../assets/2023-11-23 (1).webp'
import img2 from '../assets/2023-12-23.webp'
import img3 from '../assets/2023-12-25.webp'
import img4 from '../assets/2025-09-24.webp'
import img5 from '../assets/B8CC169A-7491-47A7-BD25-D264B0332A83.webp'
import img6 from '../assets/C31A0C61-3247-4DBD-9614-880655FA9BEE.webp'
import img7 from '../assets/unnamed (1).webp'
import img8 from '../assets/unnamed (2).webp'
import img9 from '../assets/unnamed.webp'

const galleryItems = [
    { img: img1, label: 'Clinic Interior',    desc: 'Welcoming & comfortable environment' },
    { img: img2, label: 'Treatment Room',     desc: 'Modern dental equipment' },
    { img: img3, label: 'Sterilization Unit', desc: 'Latest autoclave sterilization' },
    { img: img4, label: 'Laser Unit',         desc: 'Advanced laser dentistry' },
    { img: img5, label: 'Patient Smiles',     desc: 'Beautiful smile transformations' },
    { img: img6, label: 'Consultation',       desc: 'Personalized dental consultations' },
    { img: img7, label: 'Teeth Whitening',    desc: 'Professional whitening results' },
    { img: img8, label: 'Our Team',           desc: 'Dedicated dental professionals' },
    { img: img9, label: 'Reception Area',     desc: 'Clean & hygienic reception' },
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
                            style={{ animationDelay: `${i * 0.08}s` }}
                        >
                            <div className="gallery-img-wrap">
                                <img
                                    src={item.img}
                                    alt={item.label}
                                    className="gallery-photo"
                                    loading="lazy"
                                />
                                <div className="gallery-overlay">
                                    <div className="go-label">{item.label}</div>
                                    <div className="go-desc">{item.desc}</div>
                                </div>
                                <div className="gallery-shine" />
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
