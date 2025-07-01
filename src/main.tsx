
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('🚀 Démarrage de l_application...')

const root = document.getElementById('root')

if (!root) {
  console.error('❌ Element root non trouvé')
} else {
  console.log('✅ Element root trouvé, création du React root...')
  
  try {
    const reactRoot = ReactDOM.createRoot(root)
    console.log('✅ React root créé, rendu de l_app...')
    
    reactRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    
    console.log('✅ App rendue avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors du rendu:', error)
  }
}
