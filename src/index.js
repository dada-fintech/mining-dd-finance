import React from 'react';
import ReactDOM from 'react-dom';
// import { UseWalletProvider } from 'use-wallet'
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css';
import App from './App';
import { UseWalletProvider } from 'use-wallet'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <UseWalletProvider chainId={1}>
      <App />
    </UseWalletProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
