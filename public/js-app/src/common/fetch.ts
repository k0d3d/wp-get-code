/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getCodeApp } from "../getCodeApp";

export const handlePurchase = async () => {
  // Example data
  const data = {
    action: 'get_code_save_purchase',
    nonce: getCodeApp.nonce, 
    user_id: getCodeApp.user_id,
    post_url: location.pathname,
    post_id: getCodeApp.post_id,
    code_tx_id: 'xyz789',
    tx_intent: 'purchase',
    tx_status: 'success',
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

    if (response.ok && responseData.success) {
      return `Record inserted with ID: ${responseData.data.record_id}`;
    } else {
      return `Error: ${responseData.data.message}`;
    }
  } catch (error) {
    return `AJAX error: ${error}`;
  }
};