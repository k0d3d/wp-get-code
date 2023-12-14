/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { render } from 'react-dom'
import { createRoot } from 'react-dom/client';

import App from './App.tsx'
import './index.css'


const root = document.getElementById('get-code-button-container')

if (root) {
  createRoot(root!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

function initApp() {
  const root = document.getElementById('get-code-button-checkout')
  if (!root) return
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  )
}

// @ts-ignore
jQuery('body').on('payment_method_selected', function () {
  initApp()
});



