import React from 'react'
import {render} from 'react-dom'
import { createRoot } from 'react-dom/client';

import App from './App.tsx'
import './index.css'


const root = document.getElementById('get-code-button-container')

createRoot(root!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


window['initApp'] = function initApp () {
  const root = document.getElementById('get-code-button-checkout')
  render(
    <React.StrictMode>
          <App />
    </React.StrictMode>,
    root
  )
}