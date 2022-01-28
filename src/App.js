import React, { Fragment, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./assets/theme/theme";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom'

//redux 
import { connect } from 'react-redux';
import { setCurrentUser } from './Store/actions/authAction';
//utiles needed
import setAuthToken from './Utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import isEmpty from './validation/isEmpty';

//call componenets
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Header from './Components/layout/Header/NavBar/NavBar';
import Landing from './Components/screens/Landing';
import Footer from './Components/layout/Footer';

import PrivateRoute from './Components/routing/PrivateRoute';
import Home from './Components/screens/Home';


// Remarks for me and ayman (clear before submiting)
// Srore and browserRoute called in index.js - raping all app.
// using raping Routes becouse redux dosnt like jsx (es6 javacript) imports
// seltion form stackOverFlow site. 

const App = (props) => {
  const navigate = useNavigate()

  {/*   need to implimant this chacking token in app componnet becouse if not it does 
        problams in the refrash setings and i need thet refash will set
        the user staet agin for the props i have in nav commponent 
        not the cleanst way i know....
        but for now it will be that way 
*/}


  useEffect(() => {
    //chake for authrisiation and redirect to relevat page.
    if (props.auth.user?._id !== undefined) {
      console.log("!isEmpty(props.auth.user)", props.auth.user?._id);
      console.log("!isEmpty(props.auth.user)", !isEmpty(props.auth.user));
      return;
    }
    if (localStorage.user) {
      setAuthToken(localStorage.user);
      const decoded = jwt_decode(localStorage.user);
      //console.log('decoded', decoded);
      props.setCurrentUser(decoded);

      // Check for expired token - didnt set it as time expired in the server
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        console.log('fff', decoded.exp < currentTime);
        //store.dispatch(logoutUser());
        //store.dispatch(clearCurrentProfile());
        // Redirect to login
        //window.location.href = '/login';
        navigate('/auth/login')
      }
      else
        navigate('/home')
    }
  }, [])


  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="body">
          <Header />
          <div className="continer">
            <Fragment>
              <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path='/auth/login' element={<Login />} />
                <Route exact path='/auth/register' element={<Register />} />

                <Route exact path='/home' element={<Home />} />

                {/* praivat routs -logedIn users only */}
                {/* <Route exact path='/home' element={<PrivateRoute />}>
                  <Route exact path='/home' element={<Home />} />
                </Route> */}

              </Routes>
            </Fragment>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}

// export default App;

App.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    loading: state.auth.loading,
  };
}

export default connect(mapStateToProps, { setCurrentUser })(App);