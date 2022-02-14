import React, { useState } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

//styleing 
import componentStyles from "../../../../assets/material-ui-style/componenets/video";
const useStyles = makeStyles(componentStyles);

const Timer1to3go = () => {
    const [key, setKey] = useState(0);
    const classes = useStyles();

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <Typography className={classes.timer}>Start...</Typography>;
        }
        return (
            <Grid className={classes.timer}>
                <Typography className={classes.text}>Ready?</Typography>
                <Typography className={classes.value}>{remainingTime}</Typography>
                <Typography className={classes.text}>seconds</Typography>
            </Grid>
        );
    };

    const timerProps = {
        isPlaying: true,
        size: 120,
        strokeWidth: 6
    };

    return (
        <Grid className={classes.timerWrapper}>
            <CountdownCircleTimer
                {...timerProps}
                key={key}
                colors="#218380"
                duration={3}
                onComplete={() => [true, 1000]}
            >
                {renderTime}
            </CountdownCircleTimer>
        </Grid>
    );
}

export default Timer1to3go;