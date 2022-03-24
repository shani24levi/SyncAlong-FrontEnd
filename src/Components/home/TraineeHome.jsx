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
        <Box
            className={classes.header}
            position="relative"
            paddingTop="8rem"
            paddingBottom="8rem"
        >
            {callTrainee && <PopUpCall />}
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
    );
}

export default TraineeHome;