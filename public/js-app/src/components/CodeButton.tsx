/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import code from '@code-wallet/elements';

type TCodeButton = {
  destination: string
  amount: number
}

function CodeButton({destination, amount}: TCodeButton) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { button } = code.elements.create('button', {
      currency: 'usd',
      destination: destination || 'E8otxw1CVX9bfyddKu3ZB3BVLa4VVF9J7CTPdnUwT9jR',
      amount: amount || 0.05,
    });

    button && button.mount(el.current!);
  }, []);

  return (
    <>
    <div className="get-code-app">
      <div ref={el} />
    </div>
    </>
  );
}

export default CodeButton
