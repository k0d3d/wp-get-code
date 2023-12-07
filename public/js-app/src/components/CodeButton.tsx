/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import code from '@code-wallet/elements';
import { handlePurchase } from '../common/fetch';

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV != "production") {
  window['GetCodeAppVars'] = {
    "nonce": "644744b619",
    "user_id": "0",
    "ajax_url": "https://localhost:8898/wp-admin/admin-ajax.php",
    "post_id": "417",
    "destination": "E8otxw1CVX9bfyddKu3ZB3BVLa4VVF9J7CTPdnUwT9jR",
    "default_amount": "0.4"
  };
}

function CodeButton() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(window['GetCodeAppVars'])
    const { button } = code.elements.create('button', {
      currency: 'usd',
      destination:  window['GetCodeAppVars'].destination,
      amount:  parseFloat(window['GetCodeAppVars'].default_amount || 0),
    });

    if (!button) return

    button.on('success', async () => {
      await handlePurchase()
      location.reload()
    });

    button.mount(el.current!);

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
