import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from '@propelauth/react'
import './i18n'
import App from './App'
import './index.css'

const authUrl = import.meta.env.VITE_AUTH_URL
if (!authUrl) {
  throw new Error('Missing VITE_AUTH_URL env var')
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider authUrl={authUrl} minSecondsBeforeRefresh={120}>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
