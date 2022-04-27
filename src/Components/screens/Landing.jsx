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