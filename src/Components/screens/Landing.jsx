//when un-login user- first page in the app.
import React from 'react';
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//redux 
import { connect } from 'react-redux';
import { setCurrentUser } from '../../Store/actions/authAction';
// core components
import CircelsHeader from '../layout/Header/CircelsHeader';
import TitleHeader from '../layout/Header/TitleHeader';
import WelcomContainer from '../WelcomContainer';

const Landing = (props) => {
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