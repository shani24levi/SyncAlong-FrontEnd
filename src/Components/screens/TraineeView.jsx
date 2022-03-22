import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderTrainee from '../traineeViewInfo/HeaderTrainee';
import { Container } from '@material-ui/core';
import MainConextTrainee from '../traineeViewInfo/MainConextTrainee';

function TraineeView(props) {
    const location = useLocation();

    console.log(location.state.trainee);

    return (
        <Container maxWidth="xl">
            <HeaderTrainee trainee={location.state.trainee} />
            <MainConextTrainee trainee={location.state.trainee} />
        </Container>
        // <div>
        //     {location.state.trainee.user.user}
        //     {location.state.trainee.user.email}
        //     {location.state.trainee.profile.age}
        // </div>
    );
}

export default TraineeView;