
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Optimisation du chargement avec écran de loading
const root = document.getElementById('root')
const loadingScreen = document.getElementById('loading-screen')

if (root) {
  // Créer le root React
  const reactRoot = ReactDOM.createRoot(root)
  
  // Render l'app
  reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  
  // Supprimer l'écran de chargement après que React soit monté
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out')
      setTimeout(() => {
        loadingScreen.remove()
      }, 500)
    }
  }, 1000) // Délai minimum pour une expérience fluide
}
