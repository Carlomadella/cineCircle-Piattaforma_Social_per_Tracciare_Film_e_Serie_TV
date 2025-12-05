import React from 'react';
import { Link } from 'react-router-dom';

const ContentCard = ({ content }) => {
    const imageUrl = content.poster_url || "https://via.placeholder.com/300x450?text=No+Image";

    return (
        <div className="col-card">
            <div className="card h-100 shadow border-0" style={{ backgroundColor: '#1F1F1F' }}>
                {/* Locandina */}
                <Link to={`/content/${content.id}`}>
                    <img 
                        src={imageUrl} 
                        className="card-img-top" 
                        alt={content.title}
                        style={{ height: '280px', objectFit: 'cover' }}
                    />
                </Link>
                
                <div className="card-body p-2">
                    {/* Titolo */}
                    <h6 className="card-title text-truncate mb-1">
                        <Link to={`/content/${content.id}`} className="text-white text-decoration-none">
                            {content.title}
                        </Link>
                    </h6>
                    
                    {/* Info Extra: Qui forziamo il colore bianco sporco */}
                    <div className="d-flex justify-content-between align-items-center small" style={{ color: '#ffffffff' }}>
                        <span>{content.year}</span>
                        <span className="d-flex align-items-center">
                            {/* Stella Gialla */}
                            <i className="fas fa-star text-warning me-1"></i>
                            {content.average_rating || 0}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;