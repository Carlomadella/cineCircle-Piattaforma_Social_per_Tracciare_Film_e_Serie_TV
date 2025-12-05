import React from 'react';
import { Link } from 'react-router-dom';

const ContentCarousel = ({ title, contents }) => {
    
    if (!contents || contents.length === 0) return null;

    return (
        <div className="my-5">
            {/* Titolo della Sezione con bordo colorato a sinistra */}
            <h3 className="mb-4 border-start border-4 border-danger ps-3 fw-bold text-light">
                {title}
            </h3>

            {/* Contenitore Scorrevole */}
            <div className="horizontal-scroll-container">
                {contents.map((content) => (
                    <div key={content.id} className="col-card">
                        <div className="card h-100 shadow border-0 bg-dark text-white">
                            {/* Link e Immagine */}
                            <Link to={`/content/${content.id}`}>
                                <img 
                                    src={content.poster_url || "https://via.placeholder.com/200x300"} 
                                    className="card-img-top" 
                                    alt={content.title}
                                    style={{ height: '280px', objectFit: 'cover' }}
                                />
                            </Link>
                            
                            {/* Info minime */}
                            <div className="card-body p-2">
                                <h5 className="card-title mb-1" >
                                    {content.title}
                                </h5>
                                <div className="d-flex justify-content-between small ">
                                    <span>{content.year}</span>
                                    <span style={{color: "gold"}}>★ {content.average_rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentCarousel;