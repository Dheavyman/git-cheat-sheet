import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import App from './App';

const mockStore = configureMockStore();
const store = mockStore({
  userReducer: {
    user: {},
    isLoading: false,
    isLoggedIn: false,
    error: null,
  },
  cheatsReducer: {
    cheats: [],
    searchResult: [],
    keywords: '',
    error: null
  }
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
