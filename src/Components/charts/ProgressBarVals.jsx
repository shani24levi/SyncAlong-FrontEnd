import React from 'react';
import { styled, useTheme } from '@mui/system'
import { Grid, LinearProgress, Typography } from '@mui/material'

const CustomLinearProgress = styled(LinearProgress)(() => ({
    borderRadius: 2,
    background: 'rgba(0, 0, 0, 0.1)',
}))

function ProgressBarVals({
    value = 75,
    color = 'primary',
    text = '',
    spacing = 2,
    coloredText = false,
}) {
    return (
        <Grid
            container
            spacing={spacing}
            alignItems="center"
        >
            <Grid item xs={text ? 8 : 12}>
                <CustomLinearProgress
                    color={color}
                    value={value}
                    variant="determinate"
                ></CustomLinearProgress>
            </Grid>
            {text !== '' && (
                <Grid item xs={text ? 4 : false}>
                    {/* <Typography color={color}>
                        <Typography sx={{ color: coloredText ? '' : 'red' }}> */}
                    {text}
                    {/* </Typography>
                    </Typography> */}
                </Grid>
            )}
        </Grid>
    );
}

export default ProgressBarVals;