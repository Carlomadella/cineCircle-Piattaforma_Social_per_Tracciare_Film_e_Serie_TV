import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import api from "../services/api"; 
import { useNavigate, Link } from "react-router-dom"; 
import emailjs from '@emailjs/browser';
import ToastNotification from '../components/ToastNotification'; // <--- Importiamo il Toast

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Stato per il Toast
    const [toastInfo, setToastInfo] = useState({ show: false, message: '', type: 'success' });

    // Chiavi .env
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const onSubmit = (data) => {
        setLoading(true);
        console.log("Registrazione...", data);

        // 1. Salvataggio Database
        api.post('/register', data)
            .then((response) => {
                console.log("Utente creato. Invio email...");

                const emailParams = {
                    to_name: data.username,
                    to_email: data.email, // <--- Questo deve corrispondere a {{to_email}} su EmailJS
                    message: "Grazie per esserti unito a CineCircle!"
                };

                return emailjs.send(serviceId, templateId, emailParams, publicKey);
            })
            .then(() => {
                // Successo Totale
                setToastInfo({ show: true, message: 'Registrazione completata! Email inviata.', type: 'success' });
                
                // Ritardiamo il redirect per far leggere il toast
                setTimeout(() => navigate('/login'), 2000);
            })
            .catch((error) => {
                console.error("Errore:", error);
                setLoading(false);

                // Gestione specifica errori
                if (error.status === 422 || (error.text && error.text.includes("recipients"))) {
                    // L'utente è stato creato ma l'email ha fallito
                    setToastInfo({ show: true, message: 'Registrazione OK (Errore invio Email). Vai al Login.', type: 'warning' });
                    setTimeout(() => navigate('/login'), 3000);
                } else if (error.response) {
                    // Errore Backend (es. email già usata)
                    setToastInfo({ show: true, message: error.response.data.message || "Errore registrazione", type: 'danger' });
                } else {
                    setToastInfo({ show: true, message: "Errore generico. Riprova.", type: 'danger' });
                }
            });
    };

    return (
        <div className="container mt-5">
            {/* Toast Notification */}
            {toastInfo.show && (
                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
                    <div className={`toast show align-items-center text-white bg-${toastInfo.type} border-0 shadow-lg`}>
                        <div className="d-flex">
                            <div className="toast-body fs-6">
                                {toastInfo.message}
                            </div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToastInfo({...toastInfo, show: false})}></button>
                        </div>
                    </div>
                </div>
            )}

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow" style={{ backgroundColor: '#1F1F1F', border: '1px solid #333' }}>
                        <div className="card-body text-white">
                            <h2 className="text-center mb-4" style={{ color: '#E50914' }}>Crea Account 📝</h2>
                            
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="form-label text-white-50">Username</label>
                                    <input type="text" className="form-control bg-dark text-white border-secondary" 
                                           {...register("username", { required: true })} />
                                    {errors.username && <small className="text-danger">Richiesto</small>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-white-50">Email</label>
                                    <input type="email" className="form-control bg-dark text-white border-secondary" 
                                           {...register("email", { required: true })} />
                                    {errors.email && <small className="text-danger">Richiesta</small>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-white-50">Password</label>
                                    <input type="password" className="form-control bg-dark text-white border-secondary" 
                                           {...register("password", { required: true, minLength: 6 })} />
                                    {errors.password && <small className="text-danger">Min 6 caratteri</small>}
                                </div>

                                <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                                    {loading ? "Elaborazione..." : "Registrati"}
                                </button>
                            </form>
                            
                            <p className="mt-3 text-center text-white-50">
                                Hai già un account? <Link to="/login" className="text-danger">Accedi qui</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;