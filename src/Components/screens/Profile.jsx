import React from 'react';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import ProfileView from '../profile/ProfileView';
import CreateProfile from '../profile/CreateProfile';
import ScrollTop from '../scrollToTop/ScrollTop';

const Profile = (props) => {
    const profile = useSelector(state => state.profile);

    return (
        <>
            <div id="back-to-top-anchor" />
            <>
                {
                    !isEmpty(profile.profile)
                        ?
                        <ProfileView />
                        :
                        <CreateProfile />
                }
            </>
            <ScrollTop />
        </>
    );
}

export default Profile;