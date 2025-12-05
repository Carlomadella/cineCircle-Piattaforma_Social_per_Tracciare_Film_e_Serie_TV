import React from 'react';
import { useForm } from "react-hook-form";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importiamo il contesto

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth(); // Prendiamo la funzione 'login' dal contesto

    const onSubmit = (data) => {
        console.log("Invio dati login:", data);

        // Chiamata al Backend (POST /login)
        api.post('/login', data)
            .then((response) => {
                // SE VA BENE:
                console.log("Login OK:", response.data);
                
                // 1. Salviamo i dati nel contesto globale (e nel localStorage)
                // response.data.user e response.data.token arrivano dal backend
                login(response.data.user, response.data.token);

                alert("Benvenuto " + response.data.user.username + "!");
                
                // 2. Portiamo l'utente alla Home (o al Profilo)
                navigate('/'); 
            })
            .catch((error) => {
                // SE VA MALE:
                console.error("Errore:", error);
                const messaggioErrore = error.response?.data?.message || "Email o password errati";
                alert(messaggioErrore);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Accedi 🔐</h2>
                            
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        {...register("email", { required: true })} 
                                    />
                                    {errors.email && <small className="text-danger">Inserisci l'email</small>}
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        {...register("password", { required: true })} 
                                    />
                                    {errors.password && <small className="text-danger">Inserisci la password</small>}
                                </div>

                                <button type="submit" className="btn btn-success w-100 mt-3">Login</button>
                            </form>

                            <p className="mt-3 text-center">
                                Non hai un account? <Link to="/register">Registrati qui</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;