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

const isLoaded = {
  status: false
};

function initApp() {
  const root = document.getElementById('get-code-button-checkout')
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  )
}

// @ts-ignore
document.querySelector('body').on('payment_method_selected', function () {
  console.log('payment_method_selected was updated');
  if (!isLoaded.status) {
    initApp()
    isLoaded.status = true
  }
});


