/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import code from '@code-wallet/elements';
import { handlePurchase, invokeIntent } from '../common/fetch';
import { adjustHeight } from '../common/utils';



function CodeButton() {
  const el = useRef<HTMLDivElement>(null);


  useEffect(() => {

    const { button } = code.elements.create('button', {
      currency: 'usd', // @todo: get currency from WC or from GC Settings
      destination: window['GetCodeAppVars'].destination,
      amount: parseFloat(window['GetCodeAppVars'].default_amount || 0),
    });

    if (!button) return

    button.on('cancel', async (e) => {
      const content = await handlePurchase(e.intent)
      if (content && content != '') {  // @todo: remove this
        adjustHeight(content)
      }
      return true
    })

    button.on('success', async (e) => {
      const content = await handlePurchase(e.intent)
      if (content && content != '') {
        adjustHeight(content)
      }
      return true
    })

    button.on('invoke', async () => {
      const response = await invokeIntent({
        currency: 'usd',
        destination: window['GetCodeAppVars'].destination,
        amount: parseFloat(window['GetCodeAppVars'].default_amount || 0),
      });
      const { clientSecret } = response
      button.update({ clientSecret });
    })

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
