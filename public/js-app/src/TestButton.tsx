/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { handlePurchase } from './common/fetch';

const PurchaseButton = () => {
  const [responseMessage, setResponseMessage] = useState('');

  const handleClick = async () => {
    const clickResponse = await handlePurchase()
    setResponseMessage(clickResponse)
  }

  return (
    <div>
      <button onClick={() => handleClick()}>Purchase</button>
      <p>{responseMessage}</p>
    </div>
  );
};

export default PurchaseButton;
