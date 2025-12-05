import React from 'react';
import { useForm } from "react-hook-form";
// Importiamo il file per chiamare il backend
import api from "../services/api";
// Importiamo react-router-dom per poter cambiare pagina
import { useNavigate, Link } from "react-router-dom"; 

const RegisterPage = () => {
    // Configuriamo il form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // Funzione chiamata quando premi "Registrati"
    const onSubmit = (data) => {
        console.log("Invio dati registrazione:", data);

        // Chiamata al Backend (POST /register)
        api.post('/register', data)
            .then((response) => {
                // SE VA BENE:
                console.log("Registrazione OK:", response.data);
                alert("Registrazione completata! Ora puoi fare il login.");
                navigate('/login'); // Ti sposto alla pagina di login
            })
            .catch((error) => {
                // SE VA MALE:
                console.error("Errore:", error);
                // Cerchiamo di mostrare il messaggio di errore del server, se c'è
                const messaggioErrore = error.response?.data?.message || "Errore durante la registrazione";
                alert(messaggioErrore);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Crea Account 📝</h2>
                            
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Username */}
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        {...register("username", { required: true })} 
                                    />
                                    {errors.username && <small className="text-danger">Username richiesto</small>}
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        {...register("email", { required: true })} 
                                    />
                                    {errors.email && <small className="text-danger">Email richiesta</small>}
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        {...register("password", { required: true, minLength: 6 })} 
                                    />
                                    {errors.password && <small className="text-danger">Password (min 6 caratteri)</small>}
                                </div>

                                <button type="submit" className="btn btn-primary w-100 mt-3">Registrati</button>
                            </form>
                            
                            <p className="mt-3 text-center">
                                Hai già un account? <Link to="/login">Accedi qui</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;