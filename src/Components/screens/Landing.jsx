//when un-login user- first page in the app.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// core components style
import componentStyles from "../../assets/material-ui-style/componenets/auth-header";
import Header from '../layout/Header';
//redux 
import { connect } from 'react-redux';
import { setCurrentUser } from '../../Store/actions/authAction';
//utiles needed
import setAuthToken from '../../Utils/setAuthToken';
import jwt_decode from 'jwt-decode';
// core components
import CircelsHeader from '../layout/Header/CircelsHeader';
import TitleHeader from '../layout/Header/TitleHeader';

const useStyles = makeStyles(componentStyles);

const Landing = (props) => {
    const classes = useStyles();
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
            <Box
                className={classes.header}
                position="relative"
                paddingTop="8rem"
                paddingBottom="8rem"
            >
                <Container maxWidth="xl">
                    <Box marginBottom="6rem" textAlign="center">
                        <Box
                            component={Grid}
                            container
                            justifyContent="center"
                            color={theme.palette.grey[100]}
                        >
                            <Grid item lg={5} md={6} xs={12}>
                                <h1>Welcome!</h1>
                                <Box
                                    component="p"
                                    color={theme.palette.grey[400]}
                                    lineHeight="1.7"
                                    fontSize="1rem"
                                >
                                    Use these awesome forms to login or create new account in your
                                    project for free.
                                </Box>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <Box
                    position="absolute"
                    zIndex="100"
                    height="70px"
                    top="auto"
                    bottom="0"
                    pointerEvents="none"
                    left="0"
                    right="0"
                    width="100%"
                    overflow="hidden"
                    transform="translateZ(0)"
                >
                    <Box
                        bottom="0"
                        position="absolute"
                        pointerEvents="none"
                        component="svg"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <Box
                            component="polygon"
                            fill="#172b4d"
                            points="2560 0 2560 100 0 100"
                        />
                    </Box>
                </Box>
            </Box>
            <Grid className="page-header header-filter">
                <Grid className="index-page">
                    <CircelsHeader />
                    <TitleHeader
                        title='Welcome To SyncAlong!'
                        description='Joint physical activity and movement synchronized with positive energies.'
                    />
                </Grid>
            </Grid>
            <Header />
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