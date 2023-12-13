import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('get-code-button-container')

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


window['initApp'] = function initApp () {
  const root = document.getElementById('get-code-button-checkout')
  ReactDOM.createRoot(root!).render(
    <React.StrictMode>
      <p>Happy people</p>
    </React.StrictMode>,
  )
}