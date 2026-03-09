import '../styles/Gallery.css'

import img1 from '../assets/reception.webp'
import img2 from '../assets/waiting-area.webp'
import img3 from '../assets/treatment.webp'
import img4 from '../assets/treatment-room2.webp'
import img5 from '../assets/laserunit.webp'
import img6 from '../assets/balconyarea.webp'

const galleryItems = [
    { img: img1, label: 'Reception Area',     desc: 'Clean & hygienic reception' },
    { img: img2, label: 'Waiting Area',       desc: 'Comfortable waiting lounge' },
    { img: img3, label: 'Treatment Room',     desc: 'Modern dental equipment' },
    { img: img4, label: 'Treatment Chair',    desc: 'Advanced patient chair' },
    { img: img5, label: 'Laser Unit',         desc: 'Latest laser technology' },
    { img: img6, label: 'Balcony Area',       desc: 'Relaxing outdoor view' },
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
