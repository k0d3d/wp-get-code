import code from '@code-wallet/elements';
import { handlePurchase, invokeIntent } from './common/fetch';
import WooCommerce from './common/woo-service';
import { adjustHeight } from './common/utils';

const woo = new WooCommerce()

function beforeCheckout(tx_intent) {
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

const isDone = () => {
  woo.enableOtherPaymentMethods();
  woo.enableCheckoutFormInputs();

  woo.triggerWCOrder();

}


async function main(amount, isPaywall = false) {
  debugger
  const {
    button
    // @ts-ignore
  } = code.elements.create('button', {
    currency: 'usd', // @todo: get currency from WC or from GC Settings
    destination: window['GetCodeAppVars'].destination,
    amount: parseFloat(amount),
  });

  if (!button) return

  button.on('cancel', async (e) => {
    await handlePurchase(e.intent)
    return true
  })

  button.on('success', async (e) => {
    if (isPaywall) {
      const content = await handlePurchase(e.intent)
      if (content && content != '') {
        adjustHeight(content)
      }
    } else {
      beforeCheckout(e.intent)
    }
    isDone()
    return true
  })

  button.on('invoke', async () => {
    if (!isPaywall) {
      woo.disableOtherPaymentMethods();
      woo.disableCheckoutFormInputs();
    }

    const response = await invokeIntent({
      currency: 'usd',
      destination: window['GetCodeAppVars'].destination,
      amount: parseFloat(amount), // @todo: move to serverside
    });
    const {
      clientSecret
    } = response
    button.update({
      clientSecret
    });
  })

  button.mount('#button-container');
}


window['main'] = main