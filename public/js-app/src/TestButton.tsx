/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';

// @ts-expect-error defined
const getCodeApp =  typeof window.GetCodeAppVars != "undefined" ? window.GetCodeAppVars : {}

const PurchaseButton = () => {
  const [responseMessage, setResponseMessage] = useState('');

  const handlePurchase = async () => {
    // Example data
    const data = {
      action: 'get_code_save_purchase',
      nonce: getCodeApp.nonce, 
      user_id: getCodeApp.user_id,
      post_url: location.href,
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
