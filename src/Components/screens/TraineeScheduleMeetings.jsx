import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    styled, Grid, Container, IconButton, Typography, Select,
    Box, Button, Dialog,
} from '@mui/material';
import isEmpty from '../../validation/isEmpty';
import Loader from '../loder/Loder';
import ListedMeetings from '../home/trainer/listTable/ListedMeetings';


function TraineeScheduleMeetings(props) {
    const { id } = useParams();
    const trainees_profiles = useSelector(state => state.profile.trainees_profiles);
    const [trainee, setTrainee] = useState(null);

    useEffect(() => {
        if (id && !isEmpty(trainees_profiles) && !trainee) {
            trainees_profiles.map(i => {
                if (i.user._id === id) setTrainee(i);
            })
        }
    }, [])

    return (
        <Container maxWidth="xl">
            <Grid container alignItems='center' alignContent='center' spacing={2}>
                <Grid item xs={12} md={12}>
                    <ListedMeetings traineeId={trainee?.user._id} username={trainee?.user?.user} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default TraineeScheduleMeetings;