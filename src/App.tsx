import { BrowserRouter } from 'react-router-dom';

const { BASE_URL } = import.meta.env;

const App = () => {
  return <BrowserRouter basename={BASE_URL}></BrowserRouter>;
};

export { App };
