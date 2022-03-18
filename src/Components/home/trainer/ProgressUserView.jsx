import React from 'react';
import {
    Grid, Paper, Avatar, TextField, Button, Typography, Link,
    Card, CardContent, CardHeader, Box, FormControlLabel, Checkbox,
} from '@material-ui/core'
import { useTheme } from '@mui/system'

import ProgressBarVals from '../../charts/ProgressBarVals';
import CardContiner from '../../card/CardContiner';


function ProgressUserView(props) {
    const theme = useTheme()
    const secondary = theme.palette.mode

    return (
        <CardContiner title="Campaigns">
            <Typography sx={{ color: secondary }}>Today</Typography>
            <Box sx={{ pt: 1 }} />
            <ProgressBarVals
                value={75}
                color="primary"
                text="Google (102k)"
            />
            <Box sx={{ py: '4px' }} />
            <ProgressBarVals
                value={45}
                color="secondary"
                text="Twitter (40k)"
            />
            <Box sx={{ py: '4px' }} />
            <ProgressBarVals
                value={75}
                color="primary"
                text="Tensor (80k)"
            />

            <Box sx={{ py: '12px' }} />
            <Typography sx={{ color: secondary }}>Yesterday</Typography>
            <Box sx={{ py: 1 }} />
            <ProgressBarVals
                value={75}
                color="primary"
                text="Google (102k)"
            />
            <Box sx={{ py: '4px' }} />
            <ProgressBarVals
                value={45}
                color="secondary"
                text="Twitter (40k)"
            />
            <Box sx={{ py: '4px' }} />
            <ProgressBarVals
                value={75}
                color="primary"
                text="Tensor (80k)"
            />

            <Box sx={{ py: '12px' }} />
            <Typography sx={{ color: 'secondary' }}>Yesterday</Typography>
            <Box sx={{ py: '8px' }} />
            <ProgressBarVals
                value={75}
                color="primary"
                text="Google (102k)"
            />
            <Box sx={{ py: '4px' }} />
            <ProgressBarVals
                value={45}
                color="secondary"
                text="Twitter (40k)"
            />
            <Box sx={{ py: '4px' }} />
            <ProgressBarVals
                value={75}
                color="primary"
                text="Tensor (80k)"
            />
        </CardContiner>
    );
}

export default ProgressUserView;