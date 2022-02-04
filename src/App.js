import React, { Fragment, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./assets/theme/theme";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom'
//socket
import { io } from 'socket.io-client';
import { URL } from './utils/globalVaribals';
import { ContextProvider } from './Components/Context/ContextProvider';

//redux 
import { connect } from 'react-redux';
import { setCurrentUser } from './Store/actions/authAction';
//utiles needed
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
//validation
import isEmpty from './validation/isEmpty';
//call componenets
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Header from './Components/layout/Header/NavBar/NavBar';
import Landing from './Components/screens/Landing';
import Footer from './Components/layout/Footer';
//call privat components
import PrivateRoute from './Components/routing/PrivateRoute';
import Home from './Components/screens/Home';
import Meetings from './Components/screens/Meetings';
import VideoContext from './Components/Context/videoChat/VideoContext';
import VideoRoom from './Components/screens/VidoeRoom';

const App = (props) => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(`${URL}`));
    return () => { }
  }, []);

  useEffect(() => {
    props.auth.user?._id && socket?.emit("addUser", props.auth.user?._id);
    socket?.on("getUsers", usesr => console.log(usesr));
  }, [props.auth.user]);

  useEffect(() => {
    //chake for authrisiation and redirect to relevat page.
    if (props.auth.user?._id !== undefined) {
      console.log("props.auth.user", props.auth.user?._id);
      return;
    }
    if (localStorage.user) {
      setAuthToken(localStorage.user);
      const decoded = jwt_decode(localStorage.user);
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

  console.log('socketAppppp ', socket);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="body">
          <Header socket={socket} />
          <div className="continer">
            <Fragment>
              <ContextProvider socket={socket}>
                {/* 
                Wrapped in a store of variables used only by the component of the video
                React doent let to wrap only one commponeent.......(???@#??#)
                */}
                <Routes>
                  <Route exact path="/" element={<Landing />} />
                  <Route exact path='/auth/login' element={<Login />} />
                  <Route exact path='/auth/register' element={<Register />} />

                  {/* praivat routs -logedIn users only */}
                  <Route exact path='/home' element={<PrivateRoute />}>
                    <Route exact path='/home' element={<Home />} />
                  </Route>

                  <Route exact path='/meetings' element={<PrivateRoute />}>
                    <Route exact path='/meetings' element={<Meetings socket={socket} />} />
                  </Route>

                  <Route exact path='/video-room' element={<PrivateRoute />}>
                    <Route exact path='/video-room' element={<VideoRoom socket={socket} />} />
                  </Route>

                </Routes>
              </ContextProvider>
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