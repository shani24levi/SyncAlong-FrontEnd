import React, { useContext, useEffect, useState, useRef } from 'react';
import { SocketContext } from '../ContextProvider';
import { Grid, Typography, Paper, makeStyles, useTheme, Button, Box } from '@material-ui/core';
import Webcam from "react-webcam";
import Swal from 'sweetalert2';
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
import ErrorAlert from '../../alrets/ErrorAlert';
const useStyles = makeStyles(componentStyles);

function VideoContext({ meeting }) {
    const { accseptScheduleMeetingCall, yourSocketId, setSyncScore, setRecognition, setSettingUserInFrame, setPeer2inFrame, peer2inFrame, peer1inFrame, recognition, mediaPipeInitilaize, syncScore, myDelayOnConection, setPosesArray, array_poses, timeOfColectionPose, delayBetweenUsers, setFlagTime, setFlagFeatch, myRole, emoji, startMeeting, setStream, myName, yourName, callAccepted, myVideo, userVideo, callEnded, stream, call, myCanvasRef, userCanvasRef, me, posesArry, you, sendPoses, sendMyPoses, socket } = useContext(SocketContext);
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
    const [isPeerHere, setIsPeerHere] = useState(yourSocketId ? true : false);


    const [stop, setStop] = useState(false);
    const stopRef = useRef(stop);
    stopRef.current = stop;

    const images = { thumbs_up: thumbs_up, victory: victory, stop: stop };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true})
            .then((currentStream) => {
                setStream(currentStream);
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
        //Whoever it is in the Daily sends his points every second collected
        if (currData && myDelayOnConection && !stop) {
            console.log('timeOfColectionPose', timeOfColectionPose);
            console.log('posesArry', posesArry);
            await sendMyPoses(timeOfColectionPose, posesArry, meeting.activities[currActivity])
        }
    }, [posesArry]);

    useEffect(async () => {
        setSync(true);
        if (syncScore >= 0.75) {
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
            console.log(i, ' this activity is ....', meeting.activities[i]);
            //whait for 5 sec to garenty thet the bouth video loaded
            recognition === 'start' && await delay(5000);
            //set the start activity to display

            if (stopRef.current) return false;
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

            if (stopRef.current) return false;
            setSendCurrPoses(true);
            setActivityTime(true);
            await delay(30000);
            setPosesArray([]); //clear poses array after finishing 1 activity
            console.log('stop sending.......');
            setSendCurrPoses(false);
            setActivityTime(false);

            console.log('stop2', stop);
            console.log('recognition2', recognition);
            console.log('stopRef1', stopRef.current);

            if (stopRef.current) return false;
            console.log('end time of settings/.....', new Date().toLocaleString());
        }
        setActivitiesEnded(true);
        return true //end of all session
    }

    const prevActivitySession = () => {
        if (currActivity === 0) {
            setDisplayErrorMessage('No prev activity to go back to.... whold you like to contine?');
            swalAlret();
            return;
        }
        else {
            setCurrActivity(currActivity - 1);
            //setRecognition('');
            setStop(false);
            //activitiesSession(); //contineu the activities
        }
    }

    const nextActivitySession = () => {
        if (currActivity === meeting.activities.length - 1) { //the last activiry in the list . ther is no next ....
            setDisplayErrorMessage('No next activity to go to.... whold you like to contine this activity?');
            swalAlret();
            return;
        }
        else {
            setCurrActivity(currActivity + 1);
            //setRecognition('continue');
            setStop(false);
            //activitiesSession(); //contineu the activities
        }
    }

    useEffect(async () => {
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
            //else activitiesSession();

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

    const swalAlret = () => {
        Swal.fire({
            title: displayErrorMessage,
            width: 600,
            padding: '3em',
            confirmButtonText: 'OK1',
            showCancelButton: true,
            preConfirm: () => { displayErrorMessage(null); },
            background: '#fff',
            backdrop: `
                      rgba(0,0,123,0.4)
                      url("/img/emojyGIF/fall_stars.gif")`
        })
    }
    useEffect(() => {
        if (accseptScheduleMeetingCall && !yourSocketId) setIsPeerHere(false);
        else if (accseptScheduleMeetingCall && yourSocketId) setIsPeerHere(true);;
    }, [accseptScheduleMeetingCall, yourSocketId]);

    return (
        <>
            {
                !isPeerHere && <>
                    <ErrorAlert name={yourName} title=" is not online" />
                    <ErrorAlert title="Sorry , cant conect... " />
                </>
            }
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
                                        ref={myCanvasRef} className={classes.video}> </canvas>
                            }
                        </Grid>
                    </Paper>
                )}
                {callAccepted && !callEnded && (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>{yourName || 'Name'}</Typography>
                            <video style={{ transform: 'scaleX(-1)' }} playsInline ref={userVideo} autoPlay className={classes.video}> </video>
                            <canvas
                                        style={{ transform: 'scaleX(-1)' }}
                                        ref={userCanvasRef} className={classes.video}> </canvas>
                            {/* {syncScore >= 0.75 && <img width="100" src={`img/emojyGIF/emojy-1.gif`} alt="emojy gif" style={{ height: '100px' }} />} */}
                        </Grid>
                    </Paper>
                )}

                {/* loop over activities in the meeting  */}
                <Grid className={classes.wraperMiddleContiner} >
                    {callAccepted && !callEnded && start && !stop && <Timer time={3} title_start='Ready?' title_end='Start...' stop={stop} />}
                    {showDemo && !stop && <img width="400" src={`activities\\${meeting.activities[currActivity]}.gif`} alt="description of gif" style={{ borderRadius: '50%', height: '400px' }} />}
                    {activityTime && !stop && <Timer time={30} title_end='Stop...' />}
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {meeting.activities.map(i => {
                    return (
                        <Box sx={{ borderRadius: '16px' }} className={classes.activityList} style={{ color: meeting.activities[currActivity] === i ? 'blue' : 'black' }}>{i}</Box>
                    )
                })
                }
            </Box>

            {sync && <>
                <HorizontalGauge height={100} width={300} min={0} max={10} value={syncScore * 10} />
                <Button onClick={() => {
                    setSettingUserInFrame(true)
                    setPeer2inFrame(true)
                    //stream.getTracks().forEach(track => track.stop())
                }}>Stop Stream</Button>

                <Button onClick={() => {
                    setRecognition('start')
                }}>Ok</Button>


                <Button onClick={() => {
                    setSyncScore(0.8)
                }}>sync</Button>
            </>}

            <SpeachRecognition />
        </>
    );
}
export default VideoContext;
