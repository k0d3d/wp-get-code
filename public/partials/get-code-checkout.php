<?php

?>
<div>
  <p>Complete the checkout form then click</p>

  <div id="button-container"></div>
</div>
<script type="module" src="">
  import code from 'https://js.getcode.com/v1';

  const {
    button
  } = code.elements.create('button', {
    currency: 'usd', // @todo: get currency from WC or from GC Settings
    destination: window['GetCodeAppVars'].destination,
    amount: parseFloat(window['GetCodeAppVars'].cart_total || 0),
  });

  if (!button) return

  button.on('cancel', async (e) => {
    await handlePurchase(e.intent)
    return true
  })

  button.on('success', async (e) => {
    beforeCheckout(e.intent)
    isDone()
    return true
  })

  button.on('invoke', async () => {
    woo.disableOtherPaymentMethods();
    woo.disableCheckoutFormInputs();

    const response = await invokeIntent({
      currency: 'usd',
      destination: window['GetCodeAppVars'].destination,
      amount: parseFloat(window['GetCodeAppVars'].cart_total || 0), // @todo: move to serverside
    });
    const {
      clientSecret
    } = response
    button.update({
      clientSecret
    });
  })

  button.mount('#button-container');

</script>