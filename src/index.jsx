import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import './index.scss';

const MyApplication = () => {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyApplication />);
