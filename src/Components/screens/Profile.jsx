import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import isEmpty from '../../validation/isEmpty';
import ProfileView from '../profile/ProfileView';
import CreateProfile from '../profile/CreateProfile';

const Profile = (props) => {
    const profile = useSelector(state => state.profile);

    console.log(profile.profile);
    return (
        <>
            <Container>
                {
                    !isEmpty(profile.profile)
                        ?
                        <ProfileView />
                        :
                        <CreateProfile />
                }
            </Container>
        </>
    );
}

export default Profile;