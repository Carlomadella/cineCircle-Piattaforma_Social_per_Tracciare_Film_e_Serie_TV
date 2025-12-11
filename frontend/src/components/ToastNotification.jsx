import React, { useEffect } from 'react';

const ToastNotification = ({ message, onClose }) => {
    // Il toast sparisce da solo dopo 3 secondi
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
            <div className="toast show align-items-center text-white bg-success border-0 shadow-lg">
                <div className="d-flex">
                    <div className="toast-body fs-6">
                        <i className="fas fa-check-circle me-2"></i>
                        {message}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose}></button>
                </div>
            </div>
        </div>
    );
};

export default ToastNotification;