import React, { useContext, useEffect, useState, useRef } from 'react';
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
    const { setSettingUserInFrame, setPeer2inFrame, peer2inFrame, peer1inFrame, recognition, mediaPipeInitilaize, syncScore, myDelayOnConection, setPosesArray, array_poses, timeOfColectionPose, delayBetweenUsers, setFlagTime, setFlagFeatch, myRole, emoji, startMeeting, setStream, myName, yourName, callAccepted, myVideo, userVideo, callEnded, stream, call, myCanvasRef, userCanvasRef, me, posesArry, you, sendPoses, sendMyPoses, socket } = useContext(SocketContext);
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
    const [activitiesEnded, setActivitiesEnded] = useState(false);

    const [stop, setStop] = useState(false);
    const stopRef = useRef(stop);
    stopRef.current = stop;


    const images = { thumbs_up: thumbs_up, victory: victory, stop: stop };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });

        // navigator.getMedia = (
        //     navigator.getUserMedia ||
        //     navigator.webkitGetUserMedia ||
        //     navigator.mozGetUserMedia ||
        //     navigator.msGetUserMedia
        // );

        // if (!navigator.getMedia) {
        //     console.log("Your browser doesn't have support");
        //     setDisplayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
        // }
        // else {
        //     // Request the camera.
        //     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        //         .then((currentStream) => {
        //             console.log('currentStream', currentStream);
        //             setStream(currentStream); //sent to pather the steam data
        //         })
        //         .catch(err => {
        //             console.log("Err setting stream conection");
        //             return setDisplayErrorMessage("Err setting stream conection: " + err.name, err);
        //         })
        // }
    }, []);

    useEffect(async () => {
        if (currData && myDelayOnConection && !stop) {
            console.log('timeOfColectionPose', timeOfColectionPose);
            console.log('posesArry', posesArry);
            //await sendMyPoses(timeOfColectionPose, posesArry, meeting.activities[1])
            //if(!stop)
            await sendMyPoses(timeOfColectionPose, posesArry, meeting.activities[currActivity])
        }
    }, [posesArry]);

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
        for (let i = currActivity; i < meeting.activities.length; i++) {
            //for (const i in meeting.activities) {
            setCurrActivity(i);
            console.log('this activity is ....', meeting.activities[i]);
            console.log('Starting now/.....', new Date().toLocaleString());
            //whait for 5 sec to garenty thet the bouth video loaded
            await delay(5000);
            //set the start activity to display

            if (stop) return false;
            setStartActivity(true);
            await delay(4000); //wait for the timer will end
            setStartActivity(false);

            if (stopRef.current) return false;
            setDemo(true);
            await delay(5000); //wait for the demo 5 sec
            setDemo(false);

            //set timer to the activity 
            console.log('stop1', stop);
            console.log('stopRef1', stopRef.current);
            console.log('recognition1', recognition);
            if (stopRef.current) {
                return false;
            }

            setSendCurrPoses(true);
            setActivityTime(true);
            await delay(20000);
            setPosesArray([]); //clear poses array after finishing 1 activity
            console.log('stop sending.......');
            setSendCurrPoses(false);
            setActivityTime(false);

            console.log('stop2', stop);
            console.log('recognition2', recognition);
            console.log('stopRef1', stopRef.current);

            if (stopRef.current) {
                return false;
            }

            console.log('end time of settings/.....', new Date().toLocaleString());
        }
        setActivitiesEnded(true);
        return true //end of all session
    }

    const prevActivitySession = () => {
        if (currActivity === 0) {
            setDisplayErrorMessage('No prev activity to go back to.... whold you like to contine?');
            return;
        }
        else {
            setCurrActivity(currActivity - 1);
            setStop(false);
            activitiesSession(); //contineu the activities
        }
    }

    const nextActivitySession = () => {
        if (currActivity === meeting.activities.length - 1) { //the last activiry in the list . ther is no next ....
            setDisplayErrorMessage('No next activity to go to.... whold you like to contine this activity?');
            return;
        }
        else {
            setCurrActivity(currActivity + 1);
            setStop(false);
            activitiesSession(); //contineu the activities
        }
    }

    useEffect(async () => {
        console.log('====================================');
        console.log('recognition', recognition, 'peer2inFrame', peer2inFrame);
        console.log('====================================');
        if (session && peer2inFrame && (recognition === 'start' || recognition === 'continue')) {
            console.log('recognition', recognition);
            let status = await activitiesSession();
            console.log(status)
        }
    }, [recognition, session, peer2inFrame]);

    useEffect(async () => {
        if (peer1inFrame && peer2inFrame && !session) {
            console.log('######We can Start the meeting ####///');
            setSession(true)
            setQuestion(true);
        }
    }, [peer2inFrame, peer1inFrame]);

    useEffect(() => {
        //when me or you said someting 
        if (recognition == 'start') {
            setQuestion(false);
            console.log('starting,,,');
        }
        if (recognition == 'continue') {
            setQuestion(false);
            setStop(false);
            console.log('continue,,,,');
            if (activitiesEnded) console.log('Activity ENDED yoo can go back or restart');
            else activitiesSession();

        }
        else if (recognition == 'stop') {
            setStop(true);
            console.log('stop....');
        }
        else if (recognition == 'prev') {
            setStop(true);
            prevActivitySession();
            console.log('prev....');
        }
        else if (recognition == 'next') {
            setStop(true);
            nextActivitySession();
            console.log('next....');
        }
    }, [recognition]);

    // console.log('userVideouserVideo', userVideo);
    return (
        <>
            {
                callAccepted && !callEnded && question && session &&
                <FunQuestionPopUp name={myName} />
            }

            <Grid container className={classes.gridContainer}>
                {stream && (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                            <Typography variant="h5" gutterBottom>{myName || 'Name'}</Typography>
                            <Webcam
                                style={{ display: mediaPipeInitilaize }}
                                playsInline muted ref={myVideo} autoPlay className={classes.video} />

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
                            <video style={{ transform: 'scaleX(-1)' }} playsInline ref={userVideo} autoPlay className={classes.video} />
                            {/* <canvas style={{ transform: 'scaleX(-1)' }} ref={userVideo} className={classes.video}></canvas> */}
                        </Grid>
                    </Paper>
                )}

                {/* loop over activities in the meeting  */}
                <Grid className={classes.wraperMiddleContiner} >
                    {callAccepted && !callEnded && start && !stop && <Timer time={10} title_start='Ready?' title_end='Start...' stop={stop} />}
                    {showDemo && !stop && <video width="480" controls poster={`activities\\${meeting.activities[currActivity]}.gif`} ></video>}
                    {activityTime && !stop && <Timer time={20} title_end='Stop...' />}
                </Grid>
            </Grid>

            {sync && <>
                <HorizontalGauge height={100} width={300} min={0} max={10} value={syncScore * 10} />
                <Button onClick={() => {
                    setSettingUserInFrame(true)
                    setPeer2inFrame(true)
                    //stream.getTracks().forEach(track => track.stop())
                }}>Stop Stream</Button>
            </>}

            <SpeachRecognition />
        </>
    );
}
export default VideoContext;
