import React from 'react';
import { Routes, Route } from "react-router-dom";

//call componenets
import Login from './Components/auth/Login';

// Remarks for me and ayman (clear before submiting)
// Srore and browserRoute called in index.js - raping all app.
// using raping Routes becouse redux dosnt like jsx (es6 javacript) imports
// seltion form stackOverFlow site. 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>

  );
}

export default App;
