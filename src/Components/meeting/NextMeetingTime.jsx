import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector } from 'react-redux';
import { Grid, Container } from '@material-ui/core';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import moment from 'moment';
import "./style.css";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
    isPlaying: true,
    size: 140,
    strokeWidth: 10
};

const renderTime = (dimension, time) => {
    //upcamingMeeting
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

function NextMeetingTime({ date }) {
    const { scheduleMeetingPopUpCall, upcamingMeeting } = useContext(SocketContext);
    const [stratTime, setStratTime] = useState(Date.now() / 1000);
    const [time, setTime] = useState((date !== 0 || date !== NaN) ? date - stratTime : 0);
    const [endTime, setEndTime] = useState(stratTime + time);

    const [remainingTime, setremainingTime] = useState(endTime - stratTime);
    const [days, setdays] = useState(Math.ceil(remainingTime / daySeconds));
    const [daysDuration, setdaysDuration] = useState(days * daySeconds);

    console.log('date', date);

    useEffect(() => {
        setStratTime(Date.now() / 1000);
        setTime((date !== 0 || date !== NaN) ? date - stratTime : 0);
        setEndTime(stratTime + time);
        setremainingTime(endTime - stratTime);
        setdays(Math.ceil(remainingTime / daySeconds));
        setdaysDuration(days * daySeconds);
        console.log(' remainingTime,days,daysDuration', date, remainingTime, days, daysDuration);
    }, [date])

    // let endTime = stratTime + time
    // let remainingTime = endTime - stratTime;
    // let days = Math.ceil(remainingTime / daySeconds);
    // let daysDuration = days * daySeconds

    return (
        <Container maxWidth="xl">
            {
                date > 0 &&
                <div className="App">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors="#7E2E84"
                        duration={daysDuration}
                        initialRemainingTime={remainingTime}
                    >
                        {({ elapsedTime, color }) => (
                            <span style={{ color }}>
                                {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
                            </span>
                        )}
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        {...timerProps}
                        colors="#D14081"
                        duration={daySeconds}
                        initialRemainingTime={remainingTime % daySeconds}
                        onComplete={(totalElapsedTime) => ({
                            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
                        })}
                    >
                        {({ elapsedTime, color }) => (
                            <span style={{ color }}>
                                {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
                            </span>
                        )}
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        {...timerProps}
                        colors="#EF798A"
                        duration={hourSeconds}
                        initialRemainingTime={remainingTime % hourSeconds}
                        onComplete={(totalElapsedTime) => ({
                            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
                        })}
                    >
                        {({ elapsedTime, color }) => (
                            <span style={{ color }}>
                                {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
                            </span>
                        )}
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        {...timerProps}
                        colors="#218380"
                        duration={minuteSeconds}
                        initialRemainingTime={remainingTime % minuteSeconds}
                        onComplete={(totalElapsedTime) => ({
                            shouldRepeat: remainingTime - totalElapsedTime > 0
                        })}
                    >
                        {({ elapsedTime, color }) => (
                            <span style={{ color }}>
                                {renderTime("seconds", getTimeSeconds(elapsedTime))}
                            </span>
                        )}
                    </CountdownCircleTimer>
                </div>
            }

        </Container>
    );
}

export default NextMeetingTime;