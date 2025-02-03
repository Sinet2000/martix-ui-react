import { BrowserRouter } from 'react-router-dom';
import { AppRouting } from './routing';

const { BASE_URL } = import.meta.env;

const App = () => {
  return (
    <BrowserRouter basename={BASE_URL}>
      <AppRouting />
    </BrowserRouter>
  );
};

export { App };
