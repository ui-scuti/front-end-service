import './index.css';

import * as serviceWorker from './serviceWorker';
import App from './App';
import { LocalStorage } from './services';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { StorageKeys } from './constants'
import { ToastProvider } from 'react-toast-notifications';
import store from './store/store';

ReactDOM.render(<Provider store={store}>
  {/* <GlobalStyles/> */}
  <ToastProvider>
    <App />
  </ToastProvider>
</Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
