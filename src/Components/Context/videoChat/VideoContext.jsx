import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../ContextProvider';
import { Grid, Typography, Paper, makeStyles, useTheme, Button } from '@material-ui/core';
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
import SpeachRecognition from './SpeachRecognition';
import FunQuestionPopUp from './funQuestionPopUp/FunQuestionPopUp';
const useStyles = makeStyles(componentStyles);

function VideoContext({ meeting }) {
    const { peer2inFrame, peer1inFrame, recognition, mediaPipeInitilaize, syncScore, myDelayOnConection, setPosesArray, array_poses, timeOfColectionPose, delayBetweenUsers, setFlagTime, setFlagFeatch, myRole, emoji, startMeeting, setStream, myName, yourName, callAccepted, myVideo, userVideo, callEnded, stream, call, myCanvasRef, userCanvasRef, me, posesArry, you, sendPoses, sendMyPoses, socket } = useContext(SocketContext);
    const classes = useStyles();
    const [start, setStartActivity] = useState(false);
    const [showDemo, setDemo] = useState(false);
    const [activityTime, setActivityTime] = useState(false);
    const [currActivity, setCurrActivity] = useState(0);
    const [sync, setSync] = useState(false);
    const [currData, setSendCurrPoses] = useState(false);
    const [displayErrorMessage, setDisplayErrorMessage] = useState(null);
    const [session, setSession] = useState(false);
    const [question, setQuestion] = useState(false);

    const images = { thumbs_up: thumbs_up, victory: victory, stop: stop };


    useEffect(() => {
        navigator.getMedia = (
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
        );

        if (!navigator.getMedia) {
            console.log("Your browser doesn't have support");
            setDisplayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
        }
        else {
            // Request the camera.
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((currentStream) => {
                    console.log('currentStream', currentStream);
                    setStream(currentStream); //sent to pather the steam data
                })
                .catch(err => {
                    console.log("Err setting stream conection");
                    return setDisplayErrorMessage("Err setting stream conection: " + err.name, err);
                })
        }

        // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        //     .then((currentStream) => {
        //         console.log('currentStream', currentStream);
        //         setStream(currentStream); //sent to pather the steam data
        //     });
        // signedListener();
    }, []);

    useEffect(async () => {
        //console.log(new Date().toLocaleString(), posesArry);
        if (currData && myDelayOnConection) {
            console.log('timeOfColectionPose', timeOfColectionPose);
            console.log('posesArry', posesArry);
            //await sendMyPoses(timeOfColectionPose, posesArry, meeting.activities[1])
            await sendMyPoses(timeOfColectionPose, posesArry, meeting.activities[currActivity])
        }
    }, [posesArry]);

    // useEffect(async () => {
    //     if (recognition) {
    //         console.log('recognition', recognition);
    //     }
    // }, [recognition]);

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

    useEffect(async () => {
        //if (startMeeting && currActivity==0 && !goRecognition) return;
        // if (startMeeting) {
        //     activitiesSession();
        // }
    }, [startMeeting]);

    useEffect(async () => {
        //if (startMeeting && currActivity==0 && !goRecognition) return;
        // if (startMeeting) {
        //     activitiesSession();
        // }
    }, [startMeeting]);


    useEffect(async () => {
        console.log('peer1inFrame', peer1inFrame);
        console.log('peer2inFrame', peer2inFrame);

        if (peer1inFrame && peer2inFrame && !session) {
            console.log('######We can Start the meeting ####///');
            setSession(true)
            setQuestion(true);
        }
        //else console.log('/////Cant Start the meeting //////');
        //if (startMeeting && currActivity==0 && !goRecognition) return;
        // if (startMeeting) {
        //     activitiesSession();
        // }
    }, [peer2inFrame, peer1inFrame]);

    useEffect(() => {
        //when me or you said someting 
        if (recognition == 'continue') {
            setQuestion(false);
            console.log('starting ,,,,');
        }
    }, [recognition]);

    return (
        <>
            <Grid container className={classes.gridContainer}>
                {
                    question && session &&
                    <FunQuestionPopUp name={myName} />
                }

                {stream && (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                            <Typography variant="h5" gutterBottom>{myName || 'Name'}</Typography>
                            <Webcam
                                style={{ display: mediaPipeInitilaize }} hidden
                                playsInline muted ref={myVideo} autoPlay className={classes.video} >
                            </Webcam>
                            {
                                mediaPipeInitilaize !== 'none' ?
                                    <CircularProgress style={{ position: 'absolute', zIndex: '1' }} color="secondary" size="50px" />
                                    :
                                    <canvas
                                        style={{ transform: 'scaleX(-1)' }}
                                        ref={myCanvasRef} className={classes.video}></canvas>
                            }
                        </Grid>
                    </Paper>
                )}
                {callAccepted && !callEnded && (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>{yourName || 'Name'}</Typography>
                            <Webcam style={{ mediaPipeInitilaize }} hidden playsInline muted ref={userVideo} autoPlay className={classes.video} />
                            {
                                mediaPipeInitilaize !== 'none' ?
                                    <CircularProgress style={{ position: 'absolute', zIndex: '1' }} color="secondary" size="50px" />
                                    :
                                    <canvas
                                        style={{ transform: 'scaleX(-1)' }}
                                        ref={userCanvasRef} className={classes.video}></canvas>
                            }
                        </Grid>
                    </Paper>
                )}

                {/* loop over activities in the meeting  */}
                <Grid className={classes.wraperMiddleContiner} >
                    {callAccepted && !callEnded && start && <Timer time={3} title_start='Ready?' title_end='Start...' />}
                    {showDemo && <video width="480" controls poster={`activities\\${meeting.activities[currActivity]}.gif`} ></video>}
                    {activityTime && <Timer time={20} title_end='Stop...' />}
                </Grid>
            </Grid>

            {sync && <>
                <HorizontalGauge height={100} width={300} min={0} max={10} value={syncScore * 10} />
                <Button onClick={() => stream.getTracks().forEach(track => track.stop())}>Stop Stream</Button>
            </>}

            <SpeachRecognition />
        </>
    );
}
export default VideoContext;
