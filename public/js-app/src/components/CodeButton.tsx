/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import code from '@code-wallet/elements';
import { handlePurchase } from '../common/fetch';

type TCodeButton = {
  destination: string
  amount: number
}

function CodeButton({ destination, amount }: TCodeButton) {
  const el = useRef<HTMLDivElement>(null);
  console.log(destination, amount)
  useEffect(() => {
    const { button } = code.elements.create('button', {
      currency: 'usd',
      destination: destination,
      amount: amount || 0.5,
    });

    if (!button) return

    button.on('success', async () => {
      await handlePurchase()
      location.reload()
    });

    button.mount(el.current!);

  }, [amount, destination]);

  return (
    <>
      <div className="get-code-app">
        <div ref={el} />
      </div>
    </>
  );
}

export default CodeButton
