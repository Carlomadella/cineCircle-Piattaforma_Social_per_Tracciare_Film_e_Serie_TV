// mantiene lo stato dell'utente e del token JWT

import { createContext, useState, useEffect, useContext } from 'react';
// import api from '../services/api';

// Creiamo il contesto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Oggetto utente
    const [token, setToken] = useState(localStorage.getItem('token')); // Token JWT
    const [loading, setLoading] = useState(true); // Per evitare flash mentre controlliamo il login

    // Al caricamento, controlliamo se c'è un token valido
    useEffect(() => {
        if (token) {
            // Opzionale: Qui potresti fare una chiamata /api/me per prendere i dati freschi dell'utente
            // Per ora decodifichiamo o ci fidiamo che il token sia lì
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }
        setLoading(false);
    }, [token]);

    // Funzione di Login
    const login = (userData, newToken) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Funzione di Logout
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'; // Redirect forzato
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Hook personalizzato per usare il contesto facilmente
export const useAuth = () => useContext(AuthContext);