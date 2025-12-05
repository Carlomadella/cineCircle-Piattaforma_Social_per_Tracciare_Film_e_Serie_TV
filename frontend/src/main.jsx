import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Importiamo Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Importiamo il nostro CSS personalizzato
import './index.css'
// Importiamo Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
