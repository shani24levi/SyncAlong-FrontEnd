import React from 'react';
import { Grid, Container, Button, Box, Card } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import ContextTrainee from './content/ContextTrainee';
import ProgressUserView from '../home/trainer/ProgressUserView';

function MainConextTrainee({ trainee, lastMeeting }) {
    const profile = useSelector(state => state.profile.profile)
    return (
        <Grid container justifyContent='center' spacing={1} >
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <ProgressUserView trainee={trainee} lastMeeting={lastMeeting} />
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <Card sx={{ px: 3, py: 2, mb: 3 }}>
                    <ContextTrainee trainee={trainee} />
                </Card>
            </Grid>
        </Grid>
    );
}

export default MainConextTrainee;