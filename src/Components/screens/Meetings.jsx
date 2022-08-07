import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import ScrollTop from '../scrollToTop/ScrollTop';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import MeetingsScours from '../meeting/meetingsScours/MeetingsScours';

function Meetings(props) {
    const meetings = useSelector(state => state.meetings)

    return (
        <Container fixed>
            <div id="back-to-top-anchor" />
            {
                !meetings.meetings_complited ?
                    <Box m="auto"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        minHeight="100px"
                        marginTop="160px"
                        marginBottom="160px"
                    >
                        <OndemandVideoIcon style={{ height: '120px', width: '120px' }} />
                        <Typography variant='h2'>{"No Meeting Complited"}</Typography>
                        <Typography variant='h6'>{"Start with a sport activity .... "}</Typography>
                    </Box>
                    :
                    <MeetingsScours meetings={meetings.meetings_complited} />
            }
            <ScrollTop />
        </Container>
    );
}

export default Meetings;