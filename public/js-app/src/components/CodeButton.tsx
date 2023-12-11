/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import code from '@code-wallet/elements';
import { handlePurchase, invokeIntent } from '../common/fetch';

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

function adjustHeight(contentHtml) {
  const getCodeDiv = document.querySelector<HTMLElement>('.get_code-box');
  const contentDiv = document.querySelector<HTMLElement>('.content');
  if (!getCodeDiv || !contentDiv) return
  // Get the current height of the div
  const currentHeight = contentDiv.offsetHeight;

  // Allow the browser to recalculate styles before setting the new height
  window.getComputedStyle(contentDiv).height;

  getCodeDiv.classList.add('slide-down-fade-out')

  // Listen for the transitionend event
  getCodeDiv.addEventListener('transitionend', function (event) {
    // Check if the event property matches the animated property ('height') and the target element
    if (event.propertyName === 'height' && event.target === getCodeDiv) {
      // Animation is complete, call your function here
      contentDiv.innerHTML = contentHtml
      // Set the new height based on the updated content
      contentDiv.style.height = currentHeight + "px";
    }
  });
}

function CodeButton() {
  const el = useRef<HTMLDivElement>(null);


  useEffect(() => {

    const { button } = code.elements.create('button', {
      currency: 'usd', // @todo: get currency from WC or from GC Settings
      destination: window['GetCodeAppVars'].destination,
      amount: parseFloat(window['GetCodeAppVars'].default_amount || 0),
      confirmParams: {
        success: {
          url: '/wp-json/get_code_app/verify?tx_intent={{INTENT_ID}}&nonce=' + window['GetCodeAppVars']?.nonce,
        },
        cancel: {
          url: '/wp-json/get_code_app/verify?tx_intent={{INTENT_ID}}&nonce=' + window['GetCodeAppVars']?.nonce
        }
      }
    });

    if (!button) return

    button.on('cancel', async (e) => {
      console.log(e)
      const content = await handlePurchase(e.target.value)
      if (content && content != '') {
        adjustHeight(content)
      }
      return true
    })

    button.on('success', async (e) => {
      console.log(e)
      const content = await handlePurchase(e.target.value)
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
      console.log(clientSecret)
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
