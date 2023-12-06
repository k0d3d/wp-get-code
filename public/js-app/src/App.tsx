import CodeButton from './components/CodeButton';
import { getCodeApp } from './getCodeApp';

function App() {


  return (
    <>
    <CodeButton amount={getCodeApp.default_amount || 0.5} destination={getCodeApp.destination || 'E8otxw1CVX9bfyddKu3ZB3BVLa4VVF9J7CTPdnUwT9jR'} />
    </>
  );
}

export default App
