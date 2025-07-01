
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Chargement optimisé sans délai artificiel
const root = document.getElementById('root')
const loadingScreen = document.getElementById('loading-screen')

if (root) {
  // Créer le root React
  const reactRoot = ReactDOM.createRoot(root)
  
  // Render l'app immédiatement
  reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  
  // Supprimer l'écran de chargement dès que React est monté
  if (loadingScreen) {
    loadingScreen.classList.add('fade-out')
    setTimeout(() => {
      loadingScreen.remove()
    }, 200) // Délai réduit à 200ms juste pour la transition
  }
}
