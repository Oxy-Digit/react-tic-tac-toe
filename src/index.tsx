import React from 'react';
import ReactDOM from 'react-dom';
import Game from './pages/Game';
import { Provider } from 'react-redux';
import { store } from './toolkit/store'


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <Game />
  </Provider>
  </React.StrictMode>,
    
  document.getElementById('root')
);
