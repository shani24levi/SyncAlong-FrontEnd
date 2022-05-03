import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Container, Button, Box, Card } from '@material-ui/core';
import StartCard from '../../card/StartCard';


function TraineesCard(props) {
    const my_trainees = useSelector(state => state.profile.trainees_profiles);
    return (
        <>
            {
                my_trainees.map(trainee => {
                    return (
                        <Grid item xs={12} md={6} key={trainee.user._id}>
                            <StartCard title={trainee.user.user} subtitle={trainee.user.email} avatar={trainee.user.avatar} trainee={trainee} />
                        </Grid>
                    )
                })

            }
        </>
    );
}

export default TraineesCard;