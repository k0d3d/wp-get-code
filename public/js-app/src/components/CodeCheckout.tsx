/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';
import code from '@code-wallet/elements';
import { handlePurchase, invokeIntent } from '../common/fetch';
import WooCommerce from '../common/woo-service';

const woo = new WooCommerce()

function beforeCheckout (tx_intent) {
  const checkoutForm = document.querySelector('form.checkout');

  if (checkoutForm) {
      // Check if the checkout form exists

      const hiddenIntentInput = document.createElement('input');
      hiddenIntentInput.type = 'hidden';
      hiddenIntentInput.name = 'tx_intent';
      hiddenIntentInput.value = tx_intent || 'your_default_value';

      
      const hiddenNonceInput = document.createElement('input');
      hiddenNonceInput.type = 'hidden';
      hiddenNonceInput.name = 'code_checkout_nonce';
      hiddenNonceInput.value = window['GetCodeAppVars'].nonce || 'your_default_value';
      
      checkoutForm.appendChild(hiddenNonceInput);
      checkoutForm.appendChild(hiddenIntentInput);
  }
}

function CodeCheckout() {
  const el = useRef<HTMLDivElement>(null);


  const isDone = useCallback(
    () => {
      woo.enableOtherPaymentMethods();
      woo.enableCheckoutFormInputs();

      woo.triggerWCOrder();

    }, []);

  useEffect(() => {

    const { button } = code.elements.create('button', {
      currency: 'usd', // @todo: get currency from WC or from GC Settings
      destination: window['GetCodeAppVars'].destination,
      amount: parseFloat(window['GetCodeAppVars'].cart_total || 0),
    });

    if (!button) return

    button.on('cancel', async (e) => {
      beforeCheckout(e.intent)
      isDone()
      return true
    })

    button.on('success', async (e) => {
      await handlePurchase(e.intent)
      return true
    })

    button.on('invoke', async () => {
      woo.disableOtherPaymentMethods();
      woo.disableCheckoutFormInputs();

      // Validating WC checkout form
      if ( !woo.validateWCCheckoutForm() ) return false;
      const response = await invokeIntent({
        currency: 'usd',
        destination: window['GetCodeAppVars'].destination,
        amount: parseFloat(window['GetCodeAppVars'].cart_total || 0), // @todo: move to serverside
      });
      const { clientSecret } = response
      button.update({ clientSecret });
    })

    button.mount(el.current!);

  }, [isDone]);



  return (
    <>
      <div className="get-code-app">
        <div ref={el} />
      </div>
    </>
  );
}

export default CodeCheckout
