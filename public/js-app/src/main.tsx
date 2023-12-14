/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { render } from 'react-dom'
import { createRoot } from 'react-dom/client';

import App from './App.tsx'
import './index.css'
import WooCommerce from './common/woo-service.ts';


const root = document.getElementById('get-code-button-container')

if (root) {
  createRoot(root!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

function initCodeCheckoutApp(e) {
  e.preventDefault();
  const woo = new WooCommerce();
  // Validating WC checkout form
  if ( !woo.validateWCCheckoutForm() ) return false;
  const root = document.getElementById('get-code-button-checkout')
  if (!root) return
  document.getElementById('init-code-checkout-app')?.remove()
  
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  )
}

window['initCodeCheckoutApp'] = initCodeCheckoutApp;

// @ts-ignore
jQuery('body').on('payment_method_selected', function (e) {
  initCodeCheckoutApp(e)
});



