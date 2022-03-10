import React, { useState, useEffect } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

//styleing 
import componentStyles from "../../../../assets/material-ui-style/componenets/video";
const useStyles = makeStyles(componentStyles);

function Timer({ time, title_start = '', title_end, stop = false }) {
    const [key, setKey] = useState(0);
    const classes = useStyles();
    const [puseTime, setPuseTime] = useState(false);

    useEffect(() => {
        if (stop)
            setPuseTime(true)
    }, [stop])


    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <Typography className={classes.timer}>{title_end}</Typography>;
        }
        return (
            <Grid className={classes.timer}>
                <Typography className={classes.text}>{title_start}</Typography>
                <Typography className={classes.value}>{remainingTime}</Typography>
                <Typography className={classes.text}>seconds</Typography>
            </Grid>
        );
    };

    const onCompleteTime = () => {
        if (!puseTime) {
            console.log('====================================');
            console.log('puseTime', puseTime);
            console.log('====================================');
            return [true, 1000]
        }
        return [false]
    }

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
                duration={time}
                onComplete={onCompleteTime}
            >
                {renderTime}
            </CountdownCircleTimer>
        </Grid>
    );
}

export default Timer;