import ContextProvider from 'state/ProviderComposer';
import Form from './Form/Form';

const App = () => {
  return (
    <ContextProvider>
      <Form />
    </ContextProvider>
  );
};

export default App;
