import { useState, useEffect } from 'react'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import '../styles/Reviews.css'

const LS_KEY = 'cdc_reviews'
const MAX_REVIEWS = 6

const defaultReviews = [
    { name: 'Priya Sharma', rating: 5, date: '2 weeks ago', review: 'Absolutely wonderful experience! Dr. Saini was so patient and explained everything clearly. My root canal was completely painless. The clinic is super clean and well-equipped. Highly recommend!', tag: '🦷 Root Canal' },
    { name: 'Rahul Verma', rating: 5, date: '1 month ago', review: 'The staff is incredibly friendly and welcoming. I was very anxious about my wisdom tooth removal but they made me feel completely at ease. Fast service and very affordable pricing.', tag: '😬 Wisdom Tooth' },
    { name: 'Sunita Negi', rating: 4, date: '3 weeks ago', review: 'Great dental clinic in Raipur Dehradun! The equipment is modern and the clinic is spotless. Teeth cleaning was thorough and quick. Will definitely come back for follow-ups.', tag: '✨ Teeth Cleaning' },
    { name: 'Amit Rawat', rating: 5, date: '1 month ago', review: 'Very professional team! My dental implant procedure went perfectly. The doctor has excellent hands — I barely felt any discomfort. Follow-up care instructions were also very helpful.', tag: '💎 Dental Implant' },
    { name: 'Kavita Joshi', rating: 4, date: '5 weeks ago', review: 'Calm and peaceful environment. My children were scared of dentists before, but after visiting City Dental Clinic they actually look forward to their checkups! Great with kids.', tag: '👨‍👩‍👧 Family Visit' },
    { name: 'Deepak Kumar', rating: 5, date: '2 months ago', review: "Best dental clinic I've visited in Dehradun. The hygiene standards are top-notch, the doctor is skilled and knowledgeable, and the prices are fair. 10/10 recommend.", tag: '⭐ General Checkup' },
]

// Load from localStorage or fall back to defaults
function loadReviews() {
    try {
        const stored = JSON.parse(localStorage.getItem(LS_KEY))
        if (Array.isArray(stored) && stored.length > 0) return stored
    } catch { /* ignore */ }
    return defaultReviews
}

function saveReviews(reviews) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(reviews)) } catch { /* ignore */ }
}

function StarRating({ rating, setRating, interactive = false }) {
    const [hover, setHover] = useState(0)
    return (
        <div className="star-row">
            {[1, 2, 3, 4, 5].map(s => (
                <span
                    key={s}
                    className={`star ${s <= (hover || rating) ? 'active' : ''}`}
                    onClick={() => interactive && setRating && setRating(s)}
                    onMouseEnter={() => interactive && setHover(s)}
                    onMouseLeave={() => interactive && setHover(0)}
                >★</span>
            ))}
        </div>
    )
}

export default function Reviews() {
    const [reviews, setReviews] = useState(loadReviews)
    const [form, setForm] = useState({ name: '', rating: 0, review: '' })
    const [submitted, setSubmitted] = useState(false)
    const [formError, setFormError] = useState('')

    // Persist to localStorage whenever reviews change
    useEffect(() => {
        saveReviews(reviews)
    }, [reviews])

    const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.name.trim()) { setFormError('Please enter your name'); return }
        if (!form.rating) { setFormError('Please select a star rating'); return }
        if (!form.review.trim() || form.review.length < 10) { setFormError('Please write at least 10 characters'); return }

        const newReview = {
            name: form.name.trim(),
            rating: form.rating,
            date: 'Just now',
            review: form.review.trim(),
            tag: '💬 Patient Review',
        }

        // Add to top, always keep only MAX_REVIEWS (6)
        setReviews(prev => {
            const updated = [newReview, ...prev].slice(0, MAX_REVIEWS)
            return updated
        })

        setForm({ name: '', rating: 0, review: '' })
        setSubmitted(true)
        setFormError('')
        setTimeout(() => setSubmitted(false), 4000)
    }

    return (
        <section id="reviews" className="reviews section-padding">
            <div className="container">
                <div className="reviews-header">
                    <div className="section-header">
                        <div className="badge">Patient Reviews</div>
                        <h2 className="section-title">
                            What Our Patients <span className="gradient-text">Say</span>
                        </h2>
                        <p className="section-subtitle">Real feedback from real patients who trusted us with their smiles.</p>
                    </div>
                    <div className="reviews-summary">
                        <div className="rating-big">{avgRating}</div>
                        <StarRating rating={Math.round(Number(avgRating))} />
                        <div className="rating-count">Based on {reviews.length} reviews</div>
                    </div>
                </div>

                <div className="reviews-grid">
                    {reviews.map((r, i) => (
                        <div key={`${r.name}-${i}`} className="review-card" style={{ animationDelay: `${i * 0.07}s` }}>
                            <div className="review-top">
                                <div className="review-avatar">
                                    <span>{r.name.charAt(0)}</span>
                                </div>
                                <div className="review-meta">
                                    <div className="review-name">{r.name} <FaCheckCircle className="verified-icon" /></div>
                                    <div className="review-tag">{r.tag}</div>
                                </div>
                                <div className="review-date">{r.date}</div>
                            </div>
                            <StarRating rating={r.rating} />
                            <p className="review-text">"{r.review}"</p>
                        </div>
                    ))}
                </div>

                {/* Write a Review Form */}
                <div className="review-form-wrap">
                    <h3 className="rf-title">Share Your Experience</h3>
                    <p className="rf-subtitle">Your review will be displayed immediately and saved permanently.</p>

                    {submitted && (
                        <div className="review-success">
                            <FaCheckCircle /> Thank you! Your review has been added and saved.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="review-form" noValidate>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Your Rating</label>
                                <div className="rating-input-wrap">
                                    <StarRating rating={form.rating} setRating={r => setForm(f => ({ ...f, rating: r }))} interactive />
                                    <span className="rating-label">
                                        {form.rating === 0 ? 'Click to rate' : ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][form.rating]}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Your Review</label>
                            <textarea
                                rows={3}
                                placeholder="Tell us about your experience at City Dental Clinic..."
                                className="form-control"
                                value={form.review}
                                onChange={e => setForm(f => ({ ...f, review: e.target.value }))}
                            />
                        </div>
                        {formError && <div className="form-error">{formError}</div>}
                        <button type="submit" className="btn btn-primary">
                            <FaStar /> Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
