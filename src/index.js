import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import "./assets/css/index.css";
import "./assets/css/squares.css";
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './Store/store';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router >
  </Provider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);
reportWebVitals();
