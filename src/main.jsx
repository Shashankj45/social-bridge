import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Removed the .jsx extension to match yours
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// This is the "Engine Start" button for your PWA
// Without this, the phone will never show the 'Install' prompt
registerSW({ 
  immediate: true,
  onRegistered(r) {
    console.log('SW Registered: ', r)
  },
  onRegisterError(error) {
    console.log('SW Registration error: ', error)
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)