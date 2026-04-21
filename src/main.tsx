import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from '@propelauth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18n'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

const authUrl = import.meta.env.VITE_AUTH_URL
if (!authUrl) {
  throw new Error('Missing VITE_AUTH_URL env var')
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider authUrl={authUrl} minSecondsBeforeRefresh={120}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
