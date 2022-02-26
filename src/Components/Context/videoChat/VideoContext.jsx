import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../ContextProvider';
import { Grid, Typography, Paper, makeStyles, useTheme } from '@material-ui/core';
import Webcam from "react-webcam";
import { CircularProgress } from "@material-ui/core";
import { delay } from '../../../helpers';
import Timer from './timer/Timer';
import HorizontalGauge from 'react-horizontal-gauge';
import { Helmet } from "react-helmet";

import victory from "../../../assets/signs/victory.png"
import thumbs_up from "../../../assets/signs/thumbs_up.png"
import stop from "../../../assets/signs/stop.png"
//styleing 
import componentStyles from "../../../assets/material-ui-style/componenets/video";
const useStyles = makeStyles(componentStyles);

function VideoContext({ meeting }) {
    const { mediaPipeInitilaize, syncScore, myDelayOnConection, setPosesArray, array_poses, timeOfColectionPose, delayBetweenUsers, setFlagTime, setFlagFeatch, myRole, emoji, startMeeting, setStream, myName, yourName, callAccepted, myVideo, userVideo, callEnded, stream, call, myCanvasRef, userCanvasRef, me, posesArry, you, sendPoses, sendMyPoses, socket } = useContext(SocketContext);
    const classes = useStyles();
    const [start, setStartActivity] = useState(false);
    const [showDemo, setDemo] = useState(false);
    const [activityTime, setActivityTime] = useState(false);
    const [currActivity, setCurrActivity] = useState(0);
    const [sync, setSync] = useState(false);
    const [currData, setSendCurrPoses] = useState(false);
    const [goRecognition, setGoRecognition] = useState(false);

    const images = { thumbs_up: thumbs_up, victory: victory, stop: stop };


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                console.log('currentStream', currentStream);
                setStream(currentStream); //sent to pather the steam data
            });
        // signedListener();
    }, []);

    useEffect(async () => {
        if (currData && myDelayOnConection) {
            console.log('timeOfColectionPose', timeOfColectionPose);
            console.log('posesArry', posesArry);
            //await sendMyPoses(timeOfColectionPose, posesArry, meeting.activities[1])
            await sendMyPoses(timeOfColectionPose, posesArry, meeting.activities[currActivity])
        }
    }, [posesArry]);

    // useEffect(async () => {
    //     if (startMeeting) {
    //         setStartActivity(true);
    //         await delay(4000); //wait for the timer will end
    //         setStartActivity(false);

    //         //set timer to the activity 
    //         setSendCurrPoses(true);
    //         setActivityTime(true);
    //         await delay(10000);
    //         setPosesArray([]); //clear poses array after finishing 1 activity
    //         console.log('stop sending.......');
    //         setSendCurrPoses(false);
    //         setActivityTime(false);
    //     }
    // }, [startMeeting]);


    useEffect(async () => {
        setSync(true);
        if (syncScore >= 0.85) {
            console.log('sync.....', syncScore);
        }
        else {
            console.log('Not sync.....', syncScore);
        }
    }, [syncScore]);

    const activitiesSession = async () => {
        for (const i in meeting.activities) {
            setCurrActivity(i);
            console.log('this activity is ....', meeting.activities[i]);
            console.log('Starting now/.....', new Date().toLocaleString());
            //whait for 5 sec to garenty thet the bouth video loaded
            await delay(5000);
            //set the start activity to display
            setStartActivity(true);
            await delay(4000); //wait for the timer will end
            setStartActivity(false);
            setDemo(true);
            await delay(5000); //wait for the demo 5 sec
            setDemo(false);

            //set timer to the activity 
            setSendCurrPoses(true);
            setActivityTime(true);
            await delay(20000);
            setPosesArray([]); //clear poses array after finishing 1 activity
            console.log('stop sending.......');
            setSendCurrPoses(false);
            setActivityTime(false);

            console.log('end time of settings/.....', new Date().toLocaleString());
        }
    }

    // const signedListener = () => {
    //     setTimeout(function () {   //  call a 1s setTimeout when the loop is called
    //         if (currentTime < upcomingMeeting.dateTime) {
    //             setGoRecognition(true);
    //         }
    //     }, 1000)
    // }

    useEffect(async () => {
        //if (startMeeting && currActivity==0 && !goRecognition) return;
        if (startMeeting) {
            activitiesSession();
        }
    }, [startMeeting]);

    return (
        <Grid container className={classes.gridContainer}>
            {/* <Helmet>
                <title>Room Activity</title>
                <script type="text/javascript" src="./deepAR_sdk/lib/deepar.js"></script>
                <script src="./deepAR_sdk/deepAR.js" type="text/javascript"></script>
            </Helmet> */}

            {stream && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{myName || 'Name'}</Typography>
                        <Webcam hidden playsInline muted ref={myVideo} autoPlay className={classes.video} />
                        {
                            !mediaPipeInitilaize ?
                                <CircularProgress color="secondary" size="50px" />
                                :
                                <canvas ref={myCanvasRef} className={classes.video}></canvas>
                        }
                    </Grid>
                </Paper>
            )}
            {callAccepted && !callEnded && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{yourName || 'Name'}</Typography>
                        <Webcam playsInline ref={userVideo} autoPlay className={classes.video} />
                        {/* <canvas ref={userVideo} className={classes.video}></canvas> */}
                    </Grid>
                </Paper>
            )}

            {/* loop over activities in the meeting  */}
            <Grid className={classes.wraperMiddleContiner} >
                {callAccepted && !callEnded && start && <Timer time={3} title_start='Ready?' title_end='Start...' />}
                {showDemo && <video width="480" controls poster={`activities\\${meeting.activities[currActivity]}.gif`} ></video>}
                {activityTime && <Timer time={20} title_end='Stop...' />}
                {sync && <>
                    <HorizontalGauge height={100} width={300} min={0} max={10} value={syncScore * 10} />
                </>}
            </Grid>
        </Grid>
    );
}
export default VideoContext;
