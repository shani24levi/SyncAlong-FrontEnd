import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import "./assets/css/index.css";
import "./assets/css/squares.css";
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './Store/store';

import setAuthToken from './Utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser } from './Store/actions/authAction';


// Check for token
if (localStorage.user) {
  setAuthToken(localStorage.user);
  const decoded = jwt_decode(localStorage.user);
  console.log('decoded', decoded);
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token - didnt set it as time expired in the server
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.log('fff');
    //store.dispatch(logoutUser());
    //store.dispatch(clearCurrentProfile());
    // Redirect to login
    //window.location.href = '/login';
  }
}

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
