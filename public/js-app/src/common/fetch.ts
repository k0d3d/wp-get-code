/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getCodeApp } from "../getCodeApp";

export const handlePurchase = async (intent) => {
  // Example data
  const data = {
    action: 'get_code_complete_purchase',
    nonce: getCodeApp.nonce, 
    tx_intent: intent || 'purchase',
  };

  try {
    const response = await fetch(getCodeApp.ajax_url, {
      method: 'POST',
      // @ts-ignore
      body: new URLSearchParams(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseData = await response.text();

    if (response.ok && responseData) {
      return responseData
    } else {
      return ``;
    }
  } catch (error) {
    return `AJAX error: ${error}`;
  }
};

export const invokeIntent = async ({
  amount,
  currency,
  destination
}) => {
  // Example data
  const data = {
    action: 'get_code_save_purchase',
    nonce: getCodeApp.nonce, 
    user_id: getCodeApp.user_id,
    post_url: location.pathname,
    post_id: getCodeApp.post_id,
    amount,
    currency,
    destination,
  };

  try {
    const response = await fetch(getCodeApp.ajax_url, {
      method: 'POST',
      // @ts-ignore
      body: new URLSearchParams(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseData = await response.json();
    return responseData.data

  } catch (error) {
    return `AJAX error: ${error}`;
  }
};