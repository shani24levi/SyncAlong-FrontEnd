import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../ContextProvider';
import { useSelector, useDispatch } from 'react-redux';
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
import LoadingModal from '../../modal/LoadingModal';
import SeccsesAlert from '../../alrets/SeccsesAlert';

import { createRecordingById } from '../../../Store/actions/recordingActions';
import {useReactMediaRecorder} from 'react-media-recorder';
const useStyles = makeStyles(componentStyles);

function VideoContext({ meeting }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mediapipeOfTrainee, conectReq, setConectReq, callUser, answerCall,
        accseptScheduleMeetingCall, yourSocketId, setSyncScore,
        setRecognition, setSettingUserInFrame, setPeer1inFrame, setPeer2inFrame,
        peer2inFrame, peer1inFrame, recognition, mediaPipeInitilaize,
        syncScore, myDelayOnConection, setPosesArray, array_poses,
        timeOfColectionPose, delayBetweenUsers, setFlagTime, setFlagFeatch,
        myRole, emoji, startMeeting, setStream, myName, yourName,
        callAccepted, myVideo, userVideo, callEnded, stream, call, myCanvasRef,
        userCanvasRef, me, posesArry, you, sendPoses, sendMyPoses, socket,
        activity_now, setActivityNow } = useContext(SocketContext);
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
    const [oneTime, setOneTime] = useState(true);

    const [stop, setStop] = useState(false);
    const stopRef = useRef(stop);
    stopRef.current = stop;

    const images = { thumbs_up: thumbs_up, victory: victory, stop: stop };
    const user = useSelector((state) => state.auth.user);


    const {status, startRecording, stopRecording, mediaBlobUrl} = useReactMediaRecorder({screen: true});
    const statusRecord = async(str) => {
        if(str == "start"){
            startRecording(); 
            console.log(status);
            return null;
        }else{
            stopRecording(); 
            console.log(status);
            return null;
        }
    }


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((currentStream) => {
                setStream(currentStream);
            })
            .catch((error) => {console.log(`Error when open camera: ${error}`)});
    }, []);

    useEffect(async () => {
        //Whoever it is in the Daily sends his points every second collected
        if (currData && myDelayOnConection && !stop) {
            // console.log('timeOfColectionPose', timeOfColectionPose);
            //  console.log('posesArry', posesArry);
            await sendMyPoses(timeOfColectionPose, posesArry, meeting.activities[currActivity])
        }
    }, [posesArry, currData]);

    useEffect(async () => {
        setSync(true);
        if (syncScore >= 0.75) {
            console.log('sync.....', syncScore);
        }
        else {
            console.log('Not sync.....', syncScore);
        }
    }, [syncScore]);

    useEffect(async () => {
        console.log('activity_now', activity_now);
    }, [activity_now]);

    const activitiesSession = async () => {
        console.log("start Meeting and recorder");
        if(user.role === 'trainer'){
            statusRecord("start");
        }
        for (let i = currActivity; i < meeting.activities.length; i++) {
            //for (const i in meeting.activities) {
            setSyncScore(0);
            setCurrActivity(i);
            console.log(i, ' this activity is ....', meeting.activities[i]);
            setActivityNow(meeting.activities[i]);
            //whait for 5 sec to garenty thet the bouth video loaded
            recognition === 'start' && await delay(5000);
            //set the start activity to display

            if (stopRef.current) return false;
            setStartActivity(true);
            setSyncScore(0);
            await delay(4000); //wait for the timer will end
            setStartActivity(false);

            if (stopRef.current) return false;
            setDemo(true);
            setSyncScore(0);
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
            setSyncScore(0);
            setSendCurrPoses(false);
            setActivityTime(false);

            console.log('stop2', stop);
            console.log('recognition2', recognition);
            console.log('stopRef1', stopRef.current);

            if (stopRef.current) { setSyncScore(0); return false; }
            console.log('end time of settings/.....', new Date().toLocaleString());
        }
        setSyncScore(0);
        setActivitiesEnded(true);
        return true //end of all session
    }

    useEffect(async () => {
        if (activitiesEnded == true) {
            if(user.role === 'trainer'){
                statusRecord("stop");
                if(status === 'stopped'){
                    if(mediaBlobUrl && status === 'stopped')
                    {
                        console.log("can save recording");
                        window.open(mediaBlobUrl, "_blank").focus();
                        const blob = await fetch(mediaBlobUrl).then(res => res.blob());
                        const myFile = new File([blob], "demo.mp4", { type: 'video/mp4' });
                        console.log(blob);
                        let formData = new FormData();
                        formData.append('file', myFile);
                        console.log('formData', formData.getAll('file'));
                        dispatch(createRecordingById(formData, meeting._id));
                    }
                    else{
                        console.log("cannot save recording because mediaBlobUrl is undefined");
                    }
                } else console.log("cannot save recording because the status is not stopped");
            }
            swalEndMeeting();
            await delay(2000);
            console.log("go to repoet for meeting with id: ", meeting._id);
            navigate('/meeting/report', { state: { meeting_id: meeting._id, me: myName, you: yourName } })
        }
    }, [activitiesEnded])

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
            activitiesSession(); //contineu the activities
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
            activitiesSession(); //contineu the activities
        }
    }

    useEffect(async () => {
        if (session && peer2inFrame && peer1inFrame && (recognition === 'start' || recognition === 'continue')) {
            console.log('recognition', recognition);
            setQuestion(false);
            setStop(false);
            let status = await activitiesSession();
            console.log('is activity ended? -', status, ',activiry stoped by voice ')
        }
    }, [recognition, session, peer2inFrame, peer1inFrame]);

    useEffect(async () => {
        console.log('peer1inFrame', peer1inFrame, 'peer2inFrame', peer2inFrame);
        if (peer1inFrame && peer2inFrame && !session) {
            console.log('we both in the frame and  #We can Start the meeting #///');
            setSession(true)
            setQuestion(true);
        }
    }, [peer2inFrame, peer1inFrame]);

    useEffect(() => {
        //when me or you said someting 
        if (recognition == 'start') {
            //setQuestion(false);
            console.log('starting,,,');
            swalAction('Start');
        }
        if(recognition == 'restart'){
            setCurrActivity(0);
            setStop(false);
            swalAction('Restart');
        }
        if(recognition == 'repeat'){

        }
        if (recognition == 'continue') {
            //setQuestion(false);
            setStop(false);
            console.log('continue,,,,');
            if (activitiesEnded) {
                console.log('Activity ENDED yoo can go back or restart');
                setDisplayErrorMessage('Session Ended , would you like to start over?');
                swalAlret();
            }
            else swalAction('Continue');
        }
        else if (recognition == 'stop') {
            setStop(true);
            swalAction('Stop');
            console.log('stop....');
        }
        else if (recognition == 'prev') {
            setStop(true);
            swalAction('Prev');
            prevActivitySession();
            console.log('prev....');
        }
        else if (recognition == 'next') {
            setStop(true);
            swalAction('Next');
            nextActivitySession();
            console.log('next....');
        }
        else if (recognition == 'leave') {
            setActivitiesEnded(true);
            setStop(true);
            console.log('leave....');
        }
    }, [recognition]);

    const swalAlret = () => {
        Swal.fire({
            title: displayErrorMessage,
            width: 600,
            padding: '3em',
            confirmButtonText: 'OK',
            showCancelButton: true,
            preConfirm: () => { displayErrorMessage(null); },
            background: '#fff',
            backdrop: `
                      rgba(0,0,123,0.4)
                      url("/img/emojyGIF/fall_stars.gif")`
        })
    }

    const swalAction = (status) => {
        let timerInterval
        Swal.fire({
            position: 'center',
            title: status,
            showConfirmButton: false,
            timer: 1500,
            timerInterval: true,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        })
    }

    const swalEndMeeting = () => {
        let timerInterval
        Swal.fire({
            title: 'Activity completed ! !',
            html: 'meeting sync score will be in <b></b> milliseconds.',
            timer: 4000,
            timerProgressBar: true,
            width: 600,
            padding: '3em',
            background: '#fff',
            backdrop: `
                          rgba(0,0,123,0.4)
                          url("/img/emojyGIF/good.gif")`,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
    }

    useEffect(() => {
        console.log('====================================');
        console.log('accseptScheduleMeetingCall', accseptScheduleMeetingCall, 'yourSocketId', yourSocketId);
        console.log('====================================');
        if (accseptScheduleMeetingCall && !yourSocketId) setIsPeerHere(false);
        else if (accseptScheduleMeetingCall && yourSocketId) setIsPeerHere(true);
    }, [accseptScheduleMeetingCall, yourSocketId]);

    useEffect(() => {
        console.log('spossss to do somting');
        console.log(accseptScheduleMeetingCall, myRole, mediaPipeInitilaize, isPeerHere, mediapipeOfTrainee, oneTime);

        //teainer is calling to trainee......
        if (accseptScheduleMeetingCall && user.role === 'trainer' && mediaPipeInitilaize === 'none' && isPeerHere && mediapipeOfTrainee && oneTime) {
            setOneTime(false);
            setConectReq(true)
            callUser();
        }
        //trainee answerrrs....
        if (accseptScheduleMeetingCall && user.role === 'trainee' && mediaPipeInitilaize === 'none' && call.isReceivingCall && !callAccepted) {
            setConectReq(true)
            answerCall();
        }
    }, [accseptScheduleMeetingCall, mediaPipeInitilaize, isPeerHere, call, callAccepted, mediapipeOfTrainee]);

    return (
        <>
            {
                !isPeerHere && yourName && <>
                    <ErrorAlert name={yourName} title=" is not online" />
                    <ErrorAlert title="Sorry , cant conect... " />
                </>
            }
            {isPeerHere && <SeccsesAlert title="You will be conected after loading pose evaluation" />}
            {mediaPipeInitilaize !== 'none' && <LoadingModal title="Load Identification" />}
            {mediaPipeInitilaize === 'none' && !mediapipeOfTrainee && myRole === 'trainer' && yourName && <LoadingModal title={`Waiting to ${yourName}..`} />}
            {conectReq && <LoadingModal title="Conecting..." />}
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
                            <video style={{ transform: 'scaleX(-1)', display: 'none' }} playsInline ref={userVideo} autoPlay className={classes.video}> </video>
                            {
                                // userCanvasRef.current ?
                                <canvas
                                    style={{ transform: 'scaleX(-1)' }}
                                    ref={userCanvasRef} className={classes.video}> </canvas>
                                // :
                                //  <video style={{ transform: 'scaleX(-1)' }} playsInline ref={userVideo} autoPlay className={classes.video}> </video>

                            }
                            {/* <canvas
                                style={{ transform: 'scaleX(-1)' }}
                                ref={userCanvasRef} className={classes.video}> </canvas> */}
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
                        <Box key={i} sx={{ borderRadius: '16px' }} className={classes.activityList} style={{ color: meeting.activities[currActivity] === i ? 'blue' : 'black' }}>{i}</Box>
                    )
                })
                }
            </Box>

            {sync && <>
                <HorizontalGauge height={100} width={300} min={0} max={10} value={syncScore * 10} />
                <Button onClick={() => {
                    setSettingUserInFrame(true)
                    setPeer2inFrame(true)
                    setPeer1inFrame(true)
                }}>Stop Stream</Button>

                <Button onClick={() => {
                    setRecognition('start')
                }}>Ok</Button>


                <Button onClick={() => {
                    setSyncScore(0.8)
                }}>sync</Button>
                <Button onClick={async() => {
                    if(user.role === 'trainer'){
                        statusRecord("start");
                    }
                }}>Recorder</Button>

                <Button onClick={async() => {
                    if(user.role === 'trainer'){
                        statusRecord("stop");
                        if(status === 'stopped'){
                            if(mediaBlobUrl && status === 'stopped')
                            {
                                console.log("can save recording");
                                window.open(mediaBlobUrl, "_blank").focus();
                                const blob = await fetch(mediaBlobUrl).then(res => res.blob());
                                const myFile = new File([blob], "demo.mp4", { type: 'video/mp4' });
                                console.log(blob);
                                let formData = new FormData();
                                formData.append('file', myFile);
                                console.log('formData', formData.getAll('file'));
                                dispatch(createRecordingById(formData, meeting._id));
                            }
                            else{
                            console.log("cannot save recording because mediaBlobUrl is undefined");
                            }
                        } else console.log("cannot save recording because the status is not stopped");
                    }
                }}>Recorder</Button>

            </>}


            <SpeachRecognition />
        </>
    );
}
export default VideoContext;
