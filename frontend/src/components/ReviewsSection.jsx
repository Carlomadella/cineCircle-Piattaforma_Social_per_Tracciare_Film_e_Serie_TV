import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const ReviewsSection = ({ contentId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadReviews();
    }, [contentId]);

    const loadReviews = () => {
        api.get(`/reviews/${contentId}`)
            .then((res) => setReviews(res.data))
            .catch((err) => console.error("Errore review:", err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        api.post('/reviews', { content_id: contentId, rating: parseInt(rating), text: text })
        .then(() => {
            alert("Recensione pubblicata!");
            setText("");
            setLoading(false);
            loadReviews();
        })
        .catch((err) => {
            console.error(err);
            alert("Errore pubblicazione.");
            setLoading(false);
        });
    };

    return (
        <div className="mt-4 text-white">
            <h3 className="mb-4 border-start border-4 border-danger ps-3">Recensioni ({reviews.length})</h3>

            {/* FORM */}
            {user ? (
                <div className="card mb-5 p-4" style={{ backgroundColor: '#1F1F1F', border: '1px solid #333' }}>
                    <h5 className="mb-3">Scrivi la tua opinione 🖊️</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-2 mb-3">
                                <select className="form-select bg-dark text-white border-secondary"
                                        value={rating} onChange={(e) => setRating(e.target.value)}>
                                    <option value="5">5 ⭐</option>
                                    <option value="4">4 ⭐</option>
                                    <option value="3">3 ⭐</option>
                                    <option value="2">2 ⭐</option>
                                    <option value="1">1 ⭐</option>
                                </select>
                            </div>
                            <div className="col-md-10 mb-3">
                                <input type="text" className="form-control bg-dark text-white border-secondary"
                                       placeholder="Scrivi qui la tua recensione..." 
                                       value={text} onChange={(e) => setText(e.target.value)} required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>Pubblica</button>
                    </form>
                </div>
            ) : (
                <div className="alert alert-dark mb-5 text-white-50">
                    <a href="/login" className="text-danger fw-bold">Accedi</a> per scrivere.
                </div>
            )}

            {/* LISTA RECENSIONI MIGLIORATA */}
            <div className="review-list">
                {reviews.length > 0 ? (
                    reviews.map((rev) => (
                        <div key={rev.id} className="card mb-3 border-0 border-bottom border-secondary rounded-0" style={{ backgroundColor: 'transparent' }}>
                            <div className="card-body px-0">
                                <div className="d-flex align-items-center mb-2">
                                    {/* AVATAR: Immagine o Iniziale */}
                                    {rev.profile_image ? (
                                        <img src={rev.profile_image} alt={rev.username} 
                                             className="rounded-circle me-3" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                    ) : (
                                        <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white fw-bold me-3"
                                             style={{ width: '40px', height: '40px' }}>
                                            {rev.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}

                                    {/* NOME E STELLE VICINI */}
                                    <div>
                                        <div className="d-flex align-items-center gap-2">
                                            <h6 className="card-title text-white mb-0 fw-bold">{rev.username}</h6>
                                            <span className="text-warning small">{"⭐".repeat(rev.rating)}</span>
                                        </div>
                                        {/* DATA LEGGIBILE */}
                                        <small style={{ color: '#aaa', fontSize: '0.8rem' }}>
                                            {new Date(rev.created_at).toLocaleDateString()}
                                        </small>
                                    </div>
                                </div>

                                <p className="card-text text-white-50 ps-5 ms-2">{rev.text}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white-50">Nessuna recensione ancora.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewsSection;