import React, { Fragment, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./assets/theme/theme";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom'
//socket
import { io } from 'socket.io-client';
import { URL } from './Utils/globalVaribals';
import { ContextProvider } from './Components/Context/ContextProvider';
//redux 
import { connect } from 'react-redux';
import { setCurrentUser, logoutUser } from './Store/actions/authAction';
import { setCurrentProfile, getTraineesProfiles } from './Store/actions/profileAction';
import { futureMeetings } from './Store/actions/meetingActions';
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
import VideoRoom from './Components/screens/VidoeRoom';
import Profile from './Components/screens/Profile';
import AddTrainee from './Components/profile/addTrainee/AddTrainee';
import ScheduleMeetings from './Components/screens/ScheduleMeetings';

const App = (props) => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [upcamingMeeting, setUpcamingMeeting] = useState({});

  useEffect(() => {
    setSocket(io(`${URL}`));
    return () => { }
  }, []);

  ///call to set state of user and profile 
  useEffect(() => {
    props.auth.user?._id && socket?.emit("addUser", props.auth.user?._id);
    props.auth.user?._id && props.profile?.profile === null && props.setCurrentProfile();
  }, [props.auth.user]);

  ///call to set state profile of trainess listaed in this user profile 
  useEffect(() => {
    props.auth.user?.role === 'trainer' && props.profile?.profile?.trainerOf.length !== 0 && !props.profile?.trainee_profile_called && props.getTraineesProfiles(props.profile?.profile?.trainerOf);
  }, [props.profile.profile]);


  // const scheduleMeetingPopUpCall = (upcomingMeeting) => {
  //   return (
  //     <PopUpCall upcomingMeeting={upcomingMeeting} />
  //   )
  // }

  // function meetingsListener() { // loop function
  //   setTimeout(function () {   //  call a 60s setTimeout when the loop is called
  //     let currentTime = new Date().setSeconds(0, 0)
  //     console.log('a', currentTime, props.meetings.upcoming_meeting?.date);
  //     const date = new Date(props.meetings.upcoming_meeting?.date?.slice(0, -1)) // delte z from date
  //     let upcomingMeeting = date.getTime();
  //     if (!upcomingMeeting) {
  //       console.log('somthing is NOT OK with date meeting!!!!');
  //       return;
  //     }
  //     // console.log('====================================');
  //     // console.log('currentTime == upcomingMeeting.getTime()', currentTime, upcomingMeeting);
  //     // console.log('====================================');
  //     if (currentTime < upcomingMeeting) {
  //       meetingsListener();
  //     }
  //     else if (currentTime == upcomingMeeting) {
  //       console.log('meeting is NOW!!!!');
  //       //scheduleMeetingPopUpCall(upcomingMeeting);
  //       //set up next meeting timing....
  //     }
  //   }, 60000)
  // }

  useEffect(() => {
    console.log(props.meetings?.meetings);
    console.log(props.meetings?.meetings?.length);
    if (props.meetings?.meetings?.length === undefined || props.meetings?.meetings?.length === 0) return;
    setUpcamingMeeting(props.meetings.upcoming_meeting);
    //meetingsListener();
  }, [props.meetings?.meetings]);


  useEffect(() => {
    //chake for authrisiation and redirect to relevat page.
    if (props.auth.user?._id !== undefined) {
      return;
    }
    if (localStorage.user) {
      setAuthToken(localStorage.user);
      const decoded = jwt_decode(localStorage.user);
      console.log(decoded);
      props.setCurrentUser(decoded);
      props.setCurrentProfile();
      props.futureMeetings();

      // Check for expired token - didnt set it as time expired in the server
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        console.log('fff', decoded.exp < currentTime);
        props.logoutUser();
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
          <Header socket={socket} />
          <div className="continer">
            <Fragment>
              <ContextProvider socket={socket}>
                <Routes>
                  <Route exact path="/" element={<Landing />} />
                  <Route exact path='/auth/login' element={<Login />} />
                  <Route exact path='/auth/register' element={<Register />} />

                  {/* praivat routs -logedIn users only */}
                  <Route exact path='/home' element={<PrivateRoute />}>
                    <Route exact path='/home' element={<Home upcamingMeeting={upcamingMeeting} />} />
                  </Route>

                  <Route exact path='/meetings' element={<PrivateRoute />}>
                    <Route exact path='/meetings' element={<Meetings socket={socket} />} />
                  </Route>

                  <Route exact path='/video-room' element={<PrivateRoute />}>
                    <Route exact path='/video-room' element={<VideoRoom socket={socket} />} />
                  </Route>

                  <Route exact path='/profile' element={<PrivateRoute />}>
                    <Route exact path='/profile' element={<Profile />} />
                  </Route>

                  <Route exact path='/profile/adduser' element={<PrivateRoute />}>
                    <Route exact path='/profile/adduser' element={<AddTrainee />} />
                  </Route>

                  <Route exact path='/schedule/meetings' element={<PrivateRoute />}>
                    <Route exact path='/schedule/meetings' element={<ScheduleMeetings />} />
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

App.propTypes = {
  getTraineesProfiles: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  meetings: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    loading: state.auth.loading,
    profile: state.profile,
    meetings: state.meetings,
  };
}

export default connect(mapStateToProps, { setCurrentUser, futureMeetings, logoutUser, setCurrentProfile, getTraineesProfiles })(App);