import React, { Fragment, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './assets/theme/theme';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
//socket
import { io } from 'socket.io-client';
import { SOCKET_URL } from './Utils/globalVaribals';
import { ContextProvider } from './Components/Context/ContextProvider';
//redux
import { connect } from 'react-redux';
import { setCurrentUser, logoutUser } from './Store/actions/authAction';
//utiles needed
import setAuthToken from './Utils/setAuthToken';
import jwt_decode from 'jwt-decode';
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
import VideoRoom from './Components/screens/VideoRoom';
import Profile from './Components/screens/Profile';
import AddTrainee from './Components/profile/addTrainee/AddTrainee';
import ScheduleMeetings from './Components/screens/ScheduleMeetings';
// import MeetingReport from './Components/screens/MeetingReport';
import TraineePage from './Components/screens/TraineePage';
import WatchMeeting from './Components/meeting/watchMeeting/WatchMeeting';
import TraineeScheduleMeetings from './Components/screens/TraineeScheduleMeetings';
import TraineeProfile from './Components/screens/TraineeProfile';

const App = (props) => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    !socket && setSocket(io(`${SOCKET_URL}`));
    return () => { };
  }, []);

  useEffect(() => {
    //chake for authrisiation and redirect to relevat page.
    if (props.auth.user?._id !== undefined) {
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
        props.logoutUser();
        navigate('/auth/login');
      } else {
        navigate('/home');
        if (location.pathname.toString() == '/') {
          console.log('go home');
          navigate('/home');
        } else {
          console.log('go to ', location.pathname);
          // navigate(location.pathname);
        }
      }
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="body">
          <Header socket={socket} />
          <div className="continer">
            <Fragment>
              <ContextProvider socket={socket} profile={props.profile}>
                <Routes>
                  <Route exact path="/" element={<Landing />} />
                  <Route exact path="/auth/login" element={<Login />} />
                  <Route exact path="/auth/register" element={<Register />} />

                  {/* praivat routs -logedIn users only */}
                  <Route exact path="/home" element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/home"
                      element={<Home socket={socket} />}
                    />
                  </Route>

                  <Route exact path="/meetings" element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/meetings"
                      element={<Meetings socket={socket} />}
                    />
                  </Route>

                  <Route exact path="/video-room" element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/video-room"
                      element={<VideoRoom socket={socket} />}
                    />
                  </Route>

                  <Route
                    exact
                    path="/profile/trainee/:id"
                    element={<PrivateRoute />}
                  >
                    <Route
                      exact
                      path="/profile/trainee/:id"
                      element={<TraineeProfile />}
                    />
                  </Route>

                  <Route exact path="/profile" element={<PrivateRoute />}>
                    <Route exact path="/profile" element={<Profile />} />
                  </Route>

                  <Route
                    exact
                    path="/profile/adduser"
                    element={<PrivateRoute />}
                  >
                    <Route
                      exact
                      path="/profile/adduser"
                      element={<AddTrainee />}
                    />
                  </Route>

                  <Route
                    exact
                    path="/schedule/meetings/:id"
                    element={<PrivateRoute />}
                  >
                    <Route
                      exact
                      path="/schedule/meetings/:id"
                      element={<TraineeScheduleMeetings />}
                    />
                  </Route>

                  <Route
                    exact
                    path="/schedule/meetings"
                    element={<PrivateRoute />}
                  >
                    <Route
                      exact
                      path="/schedule/meetings"
                      element={<ScheduleMeetings />}
                    />
                  </Route>

                  <Route exact path="/trainee/:id" element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/trainee/:id"
                      element={<TraineePage />}
                    />
                  </Route>

                  <Route
                    exact
                    path="/meeting/watch/:id"
                    element={<PrivateRoute />}
                  >
                    <Route
                      exact
                      path="/meeting/watch/:id"
                      element={<WatchMeeting />}
                    />
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
};

App.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    loading: state.auth.loading,
    profile: state.profile,
  };
}

export default connect(mapStateToProps, {
  setCurrentUser,
  logoutUser,
})(App);
