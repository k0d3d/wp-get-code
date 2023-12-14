import CodeButton from './components/CodeButton';
import CodeCheckout from './components/CodeCheckout';

function App() {
  const isCheckout = window['GetCodeAppVars'].is_checkout && window['GetCodeAppVars'].is_checkout == '1' ? true : false
  return (
    <>
      {
        isCheckout ? (
          <CodeCheckout />
        ) : (
          <CodeButton />
        )
      }
    </>
  );
}

export default App
