import React from 'react';
import { Typography, Box } from '@material-ui/core'
import { useTheme } from '@mui/system'
import ProgressBarVals from '../../charts/ProgressBarVals';
import CardContiner from '../../card/CardContiner';
import { capitalize } from '../../../helpers';

function ProgressUserView({ trainee, lastMeeting }) {
    const theme = useTheme()
    const secondary = theme.palette.mode

    return (
        <CardContiner title={`${capitalize(trainee.user.user)}'s Meetings & Syncs`}>
            <Typography sx={{ color: secondary }}>Last meeting complited</Typography>
            <Box sx={{ pt: 1 }} />
            <ProgressBarVals
                value={100}
                color="primary"
                text="Activity Duration"
            />
            <Box sx={{ py: '4px' }} />
            <ProgressBarVals
                value={45}
                color="secondary"
                text="High Syncing"
            />
            <Box sx={{ py: '4px' }} />
            <ProgressBarVals
                value={75}
                color="secondary"
                text="Low Syncing"
            />

            <Box sx={{ py: '12px' }} />
            <Typography sx={{ color: secondary }}>All Meetings</Typography>
            <Box sx={{ py: 1 }} />
            <ProgressBarVals
                value={75}
                color="primary"
                text="Complited Meeting"
            />
            <Box sx={{ py: '4px' }} />
            <ProgressBarVals
                value={45}
                color="secondary"
                text="Future Meeting"
            />
            <Box sx={{ py: '4px' }} />
            <Box sx={{ py: '12px' }} />
        </CardContiner>
    );
}

export default ProgressUserView;