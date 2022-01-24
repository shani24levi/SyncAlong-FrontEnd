import React from 'react';
import { Route, Navigate, Routes, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//selotion taken from :
//https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou

const PrivateRoute = (props) => {
    const auth = props.auth.loggedIn; // determine if authorized, from context or however you're doing it
    console.log('props.auth.loggingIn', props.auth.loggedIn);

    console.log('auth', auth);
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/auth/login" />;
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);