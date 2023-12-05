/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';

// @ts-expect-error defined
const getCodeApp =  typeof window.getCodeApp == "undefined" ? getCodeApp : {}

const PurchaseButton = () => {
  const [responseMessage, setResponseMessage] = useState('');

  const handlePurchase = async () => {
    // Example data
    const data = {
      action: 'save_purchase',
      nonce: 'yourNonce', // Replace 'yourNonce' with the actual nonce value
      user_id: 1,
      post_url: 'http://example.com',
      post_id: 'abc123',
      code_tx_id: 'xyz789',
      tx_intent: 'purchase',
      tx_status: 'success',
    };

    try {
      const response = await fetch(getCodeApp.ajaxUrl, {
        method: 'POST',
        // @ts-ignore
        body: new URLSearchParams(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setResponseMessage(`Record inserted with ID: ${responseData.data.record_id}`);
      } else {
        setResponseMessage(`Error: ${responseData.data.message}`);
      }
    } catch (error) {
      setResponseMessage(`AJAX error: ${error}`);
    }
  };

  return (
    <div>
      <button onClick={handlePurchase}>Purchase</button>
      <p>{responseMessage}</p>
    </div>
  );
};

export default PurchaseButton;
