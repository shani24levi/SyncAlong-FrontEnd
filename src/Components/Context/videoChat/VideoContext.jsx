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
import RecordView from './ReactMediaRecorder';
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
import WorningAlert from '../../alrets/WorningAlert';

import { createRecordingById, clearLogoutREC } from '../../../Store/actions/recordingActions';
import { setActiveMeeting, setMeetingComplited, closeActiveMeeting } from '../../../Store/actions/meetingActions';

import isEmpty from '../../../validation/isEmpty';
import ReConect from "../../../assets/sounds/reconect.mp3";
import EndMeeting from './PopText/EndMeeting';
import Camara from '../Camera/Camera';
const useStyles = makeStyles(componentStyles);

function VideoContext({ meeting }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { prossingEndMeeting, setProssingEndMeeting, leaveCall, setRoomId, mySocketId, roomId, mediapipeOfTrainee, conectReq, setConectReq, callUser, answerCall,
        accseptScheduleMeetingCall, yourSocketId, setSyncScore,
        setRecognition, setSettingUserInFrame, setPeer1inFrame, setPeer2inFrame,
        peer2inFrame, peer1inFrame, recognition, mediaPipeInitilaize,
        syncScore, myDelayOnConection, setPosesArray, array_poses,
        timeOfColectionPose, delayBetweenUsers, setFlagTime, setFlagFeatch,
        myRole, emoji, startMeeting, setStream, myName, yourName,
        callAccepted, myVideo, userVideo, callEnded, stream, call, myCanvasRef,
        userCanvasRef, me, posesArry, you, sendPoses, sendMyPoses, socket,
        activity_now, setActivityNow,
        sendPosesByPeers,
        poseFarFrame,
        accseptPeer2ScheduleMeetingCall, setAccseptPeer2ScheduleMeetingCall,
    } = useContext(SocketContext);
    const classes = useStyles();
    let location = useLocation();
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
    const [isPeerHere, setIsPeerHere] = useState(false);
    const [oneTime, setOneTime] = useState(true);
    //const [prossingEndMeeting, setProssingEndMeeting] = useState(false);

    const [statusBool, setStatusBool] = useState(false);
    const [status, setStatus] = useState(false);
    const [mediaBlobUrl, setMediaBlobUrl] = useState(null);

    const [stop, setStop] = useState(false);
    const stopRef = useRef(stop);
    stopRef.current = stop;
    const Audio = useRef();
    const user = useSelector((state) => state.auth.user);
    const recording = useSelector((state) => state.recording);
    const meetings = useSelector((state) => state.meetings);
    //  let camera = null;
    const [camera, setCamera] = useState(null);


    const lisiningForConnected = () => {
        setIsPeerHere(false);
        //lisinig for changes in the array of users caming in to the app
        socket?.on('connected', (socketId, users) => {
            console.log("i am connected");
            console.log('user?._id', user, meeting, meetings);
            if (user?._id) {
                //addUser(socket, userId,roomID)
                let conected = users.find(el => el.userId === user?._id)
                if (conected)
                    console.log("i am connected - you disConect");
                else {
                    let userId = user?._id;
                    socket?.emit("reconect", userId, meeting?._id);
                }
            }

        });
        //close lisining to event when your socket exists
        yourSocketId && socket.off('getNewUserAddToApp');
    };

    const lisiningRoomClosed = () => {
        //TO DO - case im not in the room then im not getting this 
        // and i can be on my way to the room .... and not be notifyied by this .
        socket?.on('closeRoom', (meetingId) => {
            console.log('closeRoom ', meetingId);
            console.log('herer', user?.role, meetings, meetings.active_meeting);
            let meeting = meetings.active_meeting;
            if (!meetings.active_meeting)
                meeting = meetings.all_meetings.find(el => el._id === meetingId);
            //Clear the state of all and return to home page
            user?.role === 'trainer' && dispatch(closeActiveMeeting()); //no need to update db becose peer2 alrady done that
            user?.role === 'trainee' && meeting && dispatch(setMeetingComplited(meeting, { status: false, urlRoom: "Processing" }));
            leaveCall();
            navigate(`/meeting/watch/${meetingId}`);
            return;
        });
    };

    useEffect(() => {
        lisiningForConnected();
        lisiningRoomClosed();

        setCamera(new Camera);
        // console.log('create stream', camera);
        // camera.init(setStream);
        // let streamCreate = camera.getStream();
        // console.log('sreamCreate', streamCreate)
        // if(!streamCreate || streamCreate === 'error'){
        //     setStream(null)
        // }elsee
        //     setStream(streamCreate)
        // }

        navigator.mediaDevices.getUserMedia({ video: true })//audio: true
            .then((currentStream) => {
                setStream(currentStream);
            })
            .catch((error) => { console.log(`Error when open camera: ${error}`) });

        setRoomId(meeting._id);
        //set starte in case of re-conect this page agin with different meeting
        setStartActivity(false);
        setDemo(false);
        setActivityTime(false);
        setCurrActivity(0);
        setSync(false);
        setSendCurrPoses(false);
        setDisplayErrorMessage(null);
        setSession(false);
        setActivitiesEnded(false);
        setIsPeerHere(yourSocketId ? true : false);
        setOneTime(true);
        setStop(false);
    }, []);

    useEffect(async() => {
        if (camera) {
            console.log('create stream', camera);
            await camera.init(setStream);
            let streamCreate = camera.getStream();
            setStream(streamCreate);
            console.log('sreamCreate', streamCreate)
        }
    }, [camera])

    useEffect(async () => {
        if (currData && !stop) {
            let data = {
                poses: poseFarFrame,
                time: timeOfColectionPose,
                getMilliseconds: new Date(timeOfColectionPose).getMilliseconds()
            }
            await sendPosesByPeers(data, meeting.activities[currActivity])
        }
        // if (currData && myDelayOnConection && !stop) {
        //     await sendMyPoses(timeOfColectionPose, posesArry, meeting.activities[currActivity])
        // }
    }, [posesArry, currData, poseFarFrame]);

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
        for (let i = currActivity; i < meeting.activities.length; i++) {
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

    useEffect(() => {
        console.log('status,mediaBlobUrl', status, mediaBlobUrl);
        if (status === 'stopped' && mediaBlobUrl) {
            saveMeetingRecording()
        }
    }, [status, mediaBlobUrl])

    const saveMeetingRecording = async () => {
        setProssingEndMeeting(true);
        if (user.role === 'trainer') {
            if (recognition === 'leave') {
                //save meeting..... notify...
                if (user.role === 'trainer' && status === 'stopped' && mediaBlobUrl) {
                    console.log("can save recording", mediaBlobUrl);
                    // window.open(mediaBlobUrl, "_blank").focus();
                    const blob = await fetch(mediaBlobUrl).then(res => res.blob());
                    const myFile = new File([blob], "demo.mp4", { type: 'video/mp4' });
                    console.log(blob);
                    let formData = new FormData();
                    formData.append('file', myFile);
                    console.log('formData', formData.getAll('file'));
                    dispatch(setMeetingComplited(meeting, { status: false, urlRoom: "Processing" }));
                    //this call updates the server as a meeting complited....
                    dispatch(createRecordingById(formData, meeting._id));
                    //navigate(`/meeting/watch/${meetingId}`);
                }
                else {
                    console.log("cannot save recording because mediaBlobUrl is undefined");
                }
            }
        }
        await delay(2000);
        console.log("go to repoet for meeting with id: ", meeting._id);
    }

    useEffect(async () => {
        if (activitiesEnded == true) {
            console.log('activitiesEnded', activitiesEnded);
            Audio?.current?.play();
        }
        else {
            Audio?.current?.pause();
        }
    }, [activitiesEnded])

    useEffect(async () => {
        console.log('meetings?.meetings_complited', meetings?.meetings_complited);
        if (meetings?.meetings_complited.find(el => el._id === meeting._id) && user.role === 'trainer') {
            //after its done notify the trainee
            console.log('socket?.on("prossesDone", roomId);', meeting);
            let meetingId = meeting._id;
            socket?.emit("closeRoom", meetingId);
            navigate(`/meeting/watch/${meeting._id}`);
        }
    }, [meetings])

    const prevActivitySession = () => {
        if (currActivity === 0) {
            setDisplayErrorMessage('No prev activity to go back to.... whold you like to contine?');
            //swalAlret();
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
            //swalAlret();
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

    useEffect(async () => {
        //when me or you said someting 
        if (recognition == 'start') {
            console.log('starting,,,');
            swalAction('Start');
        }
        if (recognition == 'restart') {
            setActivitiesEnded(false);
            setCurrActivity(0);
            setStop(false);
            swalAction('ReStartung Now...');
            //user.role === 'trainer' && statusRecord('start');
            activitiesSession();
        }
        if (recognition == 'continue') {
            setStop(false);
            console.log('continue,,,,');
            // if (activitiesEnded) {
            //     console.log('Activity ENDED yoo can go back or restart');
            //     setDisplayErrorMessage('Session Ended , would you like to start over?');
            //     // swalAlret();
            // }
            // else swalAction('Continue');
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
            // setActivitiesEnded(true);
            // console.log('leave camera', camera, camera?.getStream())
            // camera?.getStream() && camera.distroy();
            //setStream(null);
            setStop(true);
            console.log('leave....');
            //save data
            setStatusBool(false);
            // setRecognition(null);
            //await saveMeetingRecording();
            //clear starts
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

    //Handles the request for automatic connection of the chat after the two users connect with the library
    useEffect(() => {
        console.log('====================================');
        console.log('accseptScheduleMeetingCall', isPeerHere, accseptScheduleMeetingCall, accseptPeer2ScheduleMeetingCall, 'yourSocketId', yourSocketId);
        console.log('====================================');
        if (accseptScheduleMeetingCall && !accseptPeer2ScheduleMeetingCall && !isEmpty(yourSocketId)) setIsPeerHere(false);
        else if (accseptScheduleMeetingCall && accseptPeer2ScheduleMeetingCall && !isEmpty(yourSocketId)) setIsPeerHere(true);
    }, [accseptScheduleMeetingCall, accseptPeer2ScheduleMeetingCall, yourSocketId, mySocketId]);

    useEffect(() => {
        console.log('spossss to do somting');
        console.log(accseptScheduleMeetingCall, myRole, mediaPipeInitilaize, isPeerHere, mediapipeOfTrainee, oneTime);

        //trainer is calling to trainee......
        if (accseptScheduleMeetingCall && user.role === 'trainer' && mediaPipeInitilaize === 'none' && isPeerHere && mediapipeOfTrainee && oneTime) {
            setOneTime(false);
            setConectReq(true)
            callUser();
        }
        //trainee answerrrs....
        console.log(accseptScheduleMeetingCall, user.role, mediaPipeInitilaize, call, callAccepted);
        if (accseptScheduleMeetingCall && user.role === 'trainee' && mediaPipeInitilaize === 'none' && call.isReceivingCall && !callAccepted) {
            setConectReq(true)
            answerCall();
        }
    }, [accseptScheduleMeetingCall, mediaPipeInitilaize, isPeerHere, call, callAccepted, mediapipeOfTrainee, yourSocketId]);

    useEffect(async () => {
        if (callAccepted && mediapipeOfTrainee) {
            //when user answer the call the set this meeting as active
            //set it in db to seport reconect 
            !isEmpty(meeting) && !meeting.status && dispatch(setActiveMeeting(meeting, true));

            console.log("start Meeting and recorder");
            await delay(5000);
            if (user.role === 'trainer' && mediapipeOfTrainee) {
                setStatusBool(true);
            }
        }
    }, [callAccepted]);

    return (
        <>
            {
                !isPeerHere && yourName && mediaPipeInitilaize === 'none' && <>
                    <ErrorAlert name={yourName} title=" is not in the room yet" />
                    <WorningAlert title="Try to call from the room" />
                </>
            }
            {isPeerHere && mediaPipeInitilaize !== 'none' && <SeccsesAlert title="You will be conected after loading pose evaluation" />}
            {isPeerHere && mediaPipeInitilaize === 'none' && <SeccsesAlert title="will be conected in few sec..." />}
            {mediaPipeInitilaize !== 'none' && <LoadingModal title="Load Identification" />}
            {isPeerHere && mediaPipeInitilaize === 'none' && !mediapipeOfTrainee && myRole === 'trainer' && yourName && <LoadingModal title={`Waiting to ${yourName}..`} />}
            {conectReq && <LoadingModal title="Conecting..." />}
            {activitiesEnded && <EndMeeting setProssingEndMeeting={setProssingEndMeeting} setRecognition={setRecognition} />}
            {prossingEndMeeting && <LoadingModal title="Proccing Data" />}
            {
                callAccepted && !callEnded && question && session &&
                <FunQuestionPopUp name={myName} />
            }
            <audio src={ReConect} loop ref={Audio} />
            {user.role === 'trainer' && <RecordView setStatus={setStatus} statusBool={statusBool} setStatusBool={setStatusBool} setMediaBlobUrl={setMediaBlobUrl} />}
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
                {meeting.activities.map((i, ii) => {
                    return (
                        <Box key={ii} sx={{ borderRadius: '16px' }} className={classes.activityList} style={{ color: meeting.activities[currActivity] === i ? 'blue' : 'black' }}>{i}</Box>
                    )
                })
                }
            </Box>

            {sync && <>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <HorizontalGauge height={100} width={300} min={0} max={10} value={syncScore * 10} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <Grid container justifyContent='space-between'> */}
                    <Button onClick={() => {
                        setSettingUserInFrame(true)
                        setPeer2inFrame(true)
                        setPeer1inFrame(true)
                    }}>inFrame</Button>

                    <Button onClick={() => {
                        setRecognition('start')
                    }}>Ok</Button>

                    <Button onClick={() => {
                        setActivitiesEnded(true);
                    }}>PopUpEnd</Button>

                    <Button onClick={() => {
                        setSyncScore(0.8)
                    }}>sync</Button>
                    {/* </Grid> */}
                </Box>
                <br />
            </>}

            <SpeachRecognition />
        </>
    );
}
export default VideoContext;
