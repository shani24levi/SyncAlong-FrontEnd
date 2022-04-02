import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Container, Grid } from "@material-ui/core";
import NextMeetingTime from '../../meeting/NextMeetingTime';
import "./style.css";

function HeaderWaves({ meeting, date, upcamingMeeting }) {
    const user = useSelector(state => state.auth.user);

    return (
        <Box className="header">
            <Box className="inner-header flex">
                <Container maxWidth="xl">
                    <Box marginBottom="6rem" textAlign="center">
                        <Box
                            component={Grid}
                            container
                            justifyContent="center"
                        //color={theme.palette.grey[100]}
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
            <Box>
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use href="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </Box>

        </Box>
    );
}

export default HeaderWaves;