import React from 'react';
import { Typography } from '@material-ui/core';
import ListedMeetings from '../../home/trainer/listTable/ListedMeetings';

function Activities({ trainee }) {
    return (
        <>
            <Typography>Meeting Complited</Typography>
            <ListedMeetings traineeId={trainee.user._id} complited='complited' />
        </>
    );
}

export default Activities;