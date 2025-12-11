import React from 'react';
import { Link } from 'react-router-dom';

const ContentCarousel = ({ title, contents }) => {
    if (!contents || contents.length === 0) return null;

    return (
        <div className="my-5 position-relative">
            <h3 className="mb-3 border-start border-4 border-danger ps-3 fw-bold text-white">
                {title}
            </h3>

            <div className="horizontal-scroll-container px-2">
                {contents.map((content) => (
                    <div key={content.id} className="col-card">
                        <div className="card h-100 border-0 text-white overflow-hidden">
                            {/* Link e Immagine */}
                            <Link to={`/content/${content.id}`}>
                                <img 
                                    src={content.poster_url || "https://via.placeholder.com/200x300"} 
                                    className="card-img-top" 
                                    alt={content.title}
                                    style={{ height: '280px', objectFit: 'cover' }}
                                />
                            </Link>
                            
                            {/* INFO NORMALI (Sempre visibili o solo titolo) */}
                            <div className="card-body p-2 bg-dark">
                                <h6 className="card-title text-truncate small mb-0 text-white">
                                    {content.title}
                                </h6>
                            </div>

                            {/* INFO HOVER (Appaiono quando passi sopra) */}
                            <div className="hover-details">
                                <div className="d-flex justify-content-between align-items-center small mb-2">
                                    <span className="text-warning fw-bold">★ {content.average_rating}</span>
                                    <span className="text-muted">{content.year}</span>
                                </div>
                                <p className="small text-white-50 mb-0" style={{fontSize: '0.75rem', lineHeight: '1.2'}}>
                                    Clicca per dettagli
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentCarousel;