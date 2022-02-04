//when un-login user- first page in the app.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//redux 
import { connect } from 'react-redux';
import { setCurrentUser } from '../../Store/actions/authAction';
// core components
import CircelsHeader from '../layout/Header/CircelsHeader';
import TitleHeader from '../layout/Header/TitleHeader';
import WelcomContainer from '../WelcomContainer';

const Landing = (props) => {
    const theme = useTheme();
    const navigate = useNavigate()

    // useEffect(() => {
    //     //chake for authrisiation and redirect to relevat page.
    //     if (localStorage.user) {
    //         setAuthToken(localStorage.user);
    //         const decoded = jwt_decode(localStorage.user);
    //         console.log('decoded', decoded);
    //         props.setCurrentUser(decoded);

    //         // Check for expired token - didnt set it as time expired in the server
    //         const currentTime = Date.now() / 1000;
    //         if (decoded.exp < currentTime) {
    //             console.log('fff');
    //             //store.dispatch(logoutUser());
    //             //store.dispatch(clearCurrentProfile());
    //             // Redirect to login
    //             //window.location.href = '/login';
    //             navigate('/auth/login')
    //         }
    //         else
    //             navigate('/home')
    //     }
    // }, [])

    return (
        <>
            <WelcomContainer />
            <Grid className="page-header header-filter">
                <Grid className="index-page">
                    <CircelsHeader />
                    <TitleHeader
                        title='Welcome To SyncAlong!'
                        description='Joint physical activity and movement synchronized with positive energies.'
                    />
                </Grid>
            </Grid>
            {/* <Header /> */}
        </>
    );
}
Landing.propTypes = {
    setCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
        loading: state.auth.loading,
    };
}

export default connect(mapStateToProps, { setCurrentUser })(Landing);