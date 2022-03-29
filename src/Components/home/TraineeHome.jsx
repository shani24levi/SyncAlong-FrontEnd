//Trainee will have his list of activities 
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Container, Grid } from "@material-ui/core";
import NextMeetingTime from '../meeting/NextMeetingTime';
// core components
import componentStyles from "../../assets/material-ui-style/componenets/auth-header";
import PopUpCall from '../popupCall/PopUpCall';
import HeaderWaves from './trainee/HeaderWaves';
const useStyles = makeStyles(componentStyles);

function TraineeHome({ meeting, date }) {
    const { callTrainee, upcomingMeetingToNow, scheduleMeetingPopUpCall, upcamingMeeting } = useContext(SocketContext);
    const classes = useStyles();
    const theme = useTheme();
    const user = useSelector(state => state.auth.user);

    console.log('====================================');
    console.log(callTrainee);
    console.log('====================================');

    return (
        <>
            <HeaderWaves meeting={meeting} date={date} upcamingMeeting={upcamingMeeting} />
            {callTrainee && <PopUpCall />}

            <Box
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
                                <h1>Welcome {user.user}!</h1>
                                <h3>your up coming meeting is in :</h3>
                                {meeting && <NextMeetingTime upcamingMeeting={upcamingMeeting} date={!date ? 0 : date} />}
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default TraineeHome;