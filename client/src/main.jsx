import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import Dashboard from './pages/Dashboard.jsx'
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  
)
