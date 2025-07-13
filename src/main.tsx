import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('🚀 Démarrage de l\'application...')

// Import debugger en mode développement
if (import.meta.env.DEV) {
  import('./utils/klaviyoDebugger');
}

const root = document.getElementById('root')

if (!root) {
  console.error('❌ Element root non trouvé')
  // Afficher un message d'erreur visible
  document.body.innerHTML = `
    <div style="
      display: flex; 
      align-items: center; 
      justify-content: center; 
      min-height: 100vh; 
      background: linear-gradient(135deg, #fdf2f8, #fff);
      font-family: system-ui, -apple-system, sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <div>
        <h1 style="color: #ec4899; font-size: 24px; margin-bottom: 16px;">
          ⚠️ Erreur de chargement
        </h1>
        <p style="color: #6b7280; margin-bottom: 20px;">
          L'application n'a pas pu se charger correctement.
        </p>
        <button onclick="window.location.reload()" style="
          background: #ec4899; 
          color: white; 
          border: none; 
          padding: 12px 24px; 
          border-radius: 8px; 
          cursor: pointer;
          font-size: 16px;
        ">
          Recharger la page
        </button>
      </div>
    </div>
  `
} else {
  console.log('✅ Element root trouvé, création du React root...')
  
  try {
    const reactRoot = ReactDOM.createRoot(root)
    console.log('✅ React root créé, rendu de l\'app...')
    
    // Timeout de sécurité pour détecter si l'app ne se charge pas
    const loadingTimeout = setTimeout(() => {
      console.error('❌ L\'application met trop de temps à se charger')
      if (root && !root.hasChildNodes()) {
        root.innerHTML = `
          <div style="
            display: flex; 
            align-items: center; 
            justify-content: center; 
            min-height: 100vh; 
            background: linear-gradient(135deg, #fdf2f8, #fff);
            font-family: system-ui, -apple-system, sans-serif;
            text-align: center;
            padding: 20px;
          ">
            <div>
              <h1 style="color: #ec4899; font-size: 24px; margin-bottom: 16px;">
                ⏱️ Chargement en cours...
              </h1>
              <p style="color: #6b7280; margin-bottom: 20px;">
                L'application met plus de temps que prévu à se charger.
              </p>
              <button onclick="window.location.reload()" style="
                background: #ec4899; 
                color: white; 
                border: none; 
                padding: 12px 24px; 
                border-radius: 8px; 
                cursor: pointer;
                font-size: 16px;
              ">
                Recharger la page
              </button>
            </div>
          </div>
        `
      }
    }, 10000) // 10 secondes
    
    reactRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    
    // Clear le timeout si l'app se charge correctement
    clearTimeout(loadingTimeout)
    console.log('✅ App rendue avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors du rendu:', error)
    
    // Afficher l'erreur de manière visible
    root.innerHTML = `
      <div style="
        display: flex; 
        align-items: center; 
        justify-content: center; 
        min-height: 100vh; 
        background: linear-gradient(135deg, #fdf2f8, #fff);
        font-family: system-ui, -apple-system, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <div>
          <h1 style="color: #dc2626; font-size: 24px; margin-bottom: 16px;">
            ❌ Erreur de l'application
          </h1>
          <p style="color: #6b7280; margin-bottom: 12px;">
            Une erreur est survenue lors du chargement :
          </p>
          <code style="
            background: #f3f4f6; 
            padding: 8px 12px; 
            border-radius: 4px; 
            color: #dc2626;
            display: block;
            margin-bottom: 20px;
            word-break: break-all;
          ">
            ${error.message}
          </code>
          <button onclick="window.location.reload()" style="
            background: #ec4899; 
            color: white; 
            border: none; 
            padding: 12px 24px; 
            border-radius: 8px; 
            cursor: pointer;
            font-size: 16px;
          ">
            Recharger la page
          </button>
        </div>
      </div>
    `
  }
}
