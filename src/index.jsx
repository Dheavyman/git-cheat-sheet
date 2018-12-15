import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import './style.scss';
import App from './components/App';
import store from './store';
import { fetchCheats } from './actions/cheats';

store.dispatch(fetchCheats())

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
