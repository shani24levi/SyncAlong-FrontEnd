import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./assets/theme/theme";

//call componenets
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Header from './Components/layout/Header/NavBar';
import Landing from './Components/screens/Landing';

// Remarks for me and ayman (clear before submiting)
// Srore and browserRoute called in index.js - raping all app.
// using raping Routes becouse redux dosnt like jsx (es6 javacript) imports
// seltion form stackOverFlow site. 

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="body">
          <Header />
          <div className="continer">
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path='/auth/login' element={<Login />} />
              <Route exact path='/auth/register' element={<Register />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </>

  );
}

export default App;
