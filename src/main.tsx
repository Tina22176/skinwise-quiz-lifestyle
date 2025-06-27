import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Optimisation du chargement
const root = document.getElementById('root')

if (root) {
  // Suppression du loading state une fois React chargé
  const loadingElement = root.querySelector('.loading-critical')
  if (loadingElement) {
    loadingElement.remove()
  }
  
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
