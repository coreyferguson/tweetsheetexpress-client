
import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './core/Provider';
import Routes from './core/Routes';

ReactDOM.render(
  <Provider>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
