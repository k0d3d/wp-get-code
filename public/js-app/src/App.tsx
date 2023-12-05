import CodeButton from './components/CodeButton';
import { getCodeApp } from './getCodeApp';

function App() {


  return (
    <>
    <CodeButton amount={0.5} destination={getCodeApp.destination} />
    </>
  );
}

export default App
