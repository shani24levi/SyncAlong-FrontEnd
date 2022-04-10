import { Typography } from '@material-ui/core';
import React from 'react';
import ListedMeetings from '../../home/trainer/listTable/ListedMeetings';

function Scheduled({ trainee }) {
    return (
        <>
            <Typography>In the Futer</Typography>
            <ListedMeetings traineeId={trainee.user._id} />
        </>
    );
}

export default Scheduled;