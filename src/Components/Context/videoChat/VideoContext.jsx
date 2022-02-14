import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../ContextProvider';
import { Grid, Typography, Paper, makeStyles, useTheme } from '@material-ui/core';
import Webcam from "react-webcam";
import { CircularProgress } from "@material-ui/core";
import { delay } from '../../../helpers';
import Timer from './timer/Timer';

import victory from "../../../assets/signs/victory.png"
import thumbs_up from "../../../assets/signs/thumbs_up.png"
import stop from "../../../assets/signs/stop.png"

//styleing 
import componentStyles from "../../../assets/material-ui-style/componenets/video";
const useStyles = makeStyles(componentStyles);

function VideoContext({ meeting }) {
    const { timeOfColectionPose, delayBetweenUsers, setFlagTime, setFlagFeatch, myRole, emoji, startMeeting, setStream, myName, yourName, callAccepted, myVideo, userVideo, callEnded, stream, call, myCanvasRef, userCanvasRef, me, posesArry, you, sendPoses, sendMyPoses, socket } = useContext(SocketContext);
    const classes = useStyles();
    const [start, setStartActivity] = useState(false);
    const [showDemo, setDemo] = useState(false);
    const [activityTime, setActivityTime] = useState(false);
    const [currActivity, setCurrActivity] = useState(0);
    const [sendPose, setPosesSending] = useState(0);
    const [sync, setSync] = useState(false);
    const [nIntervId, setIntervId] = useState(true);

    const images = { thumbs_up: thumbs_up, victory: victory, stop: stop };


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream); //sent to pather the steam data
            });
    }, []);

    // useEffect(() => {
    //     console.log('timeOfColectionPose', timeOfColectionPose, new Date().toLocaleString(), ":: -2 sec");
    // }, [timeOfColectionPose]);

    const sendPoseLoop = async () => {
        let date_now = new Date();
        let timeObject = new Date();
        timeObject = new Date(timeObject.getTime() + 1000 * 20).getTime(); //2 sec

        for (let i = new Date(); i < timeObject; i = new Date()) {
            console.log(i, new Date().toLocaleString());
            console.log('11', new Date().toLocaleString());
            await sendMyPoses();
            console.log('22', new Date().toLocaleString());
            await delay(2000);
        }
    }

    useEffect(async () => {
        if (startMeeting) {
            for (const i in meeting.activities) {
                setCurrActivity(i);
                setIntervId(true);
                console.log('this activity is ....', meeting.activities[i]);
                let ac = `activities\\${meeting.activities[i]}.gif`
                console.log(ac);
                console.log('Starting now/.....', new Date().toLocaleString());
                //whait for 5 sec to garenty thet the bouth video loaded
                await delay(5000);
                console.log("Waited 5s", new Date().toLocaleString());
                //set the start activity to display
                setStartActivity(true);
                await delay(4000); //wait for the timer will end
                console.log("Waited 4s", new Date().toLocaleString());
                setStartActivity(false);
                setDemo(true);
                await delay(5000); //wait for the demo 5 sec
                console.log("Waited 5s", new Date().toLocaleString());
                setDemo(false);
                //set timer to the activity 
                setActivityTime(true);
                //delayBetweenUsers === null
                console.log(myRole);
                myRole === 'trainer' && await sendPoseLoop(); //trainer or trainee user send his data to peer2
                // await delay(20000); //wait for the demo 10 sec
                console.log("Waited 20s", new Date().toLocaleString());
                setActivityTime(false);
                // setIntervId(false); //stop sending poses....
                console.log('end time of settings/.....', new Date().toLocaleString());
            }
        }
    }, [startMeeting]);


    return (
        <Grid container className={classes.gridContainer}>
            {stream && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{myName || 'Name'}</Typography>
                        <Webcam playsInline muted ref={myVideo} autoPlay className={classes.video} />
                        {
                            !myCanvasRef ?
                                <CircularProgress color="secondary" size="20px" />
                                :
                                <>
                                    <canvas ref={myCanvasRef} className={classes.video}></canvas>
                                    {/* {emoji !== null ? (
                                        <img
                                            src={images[emoji]}
                                            style={{
                                                position: "absolute",
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                                left: 400,
                                                bottom: 500,
                                                right: 0,
                                                textAlign: "center",
                                                height: 100,
                                            }}
                                        />
                                    ) : (
                                        ""
                                    )} */}
                                </>
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
                {sync && <img src={images[emoji]} />}
            </Grid>
        </Grid>
    );
}
export default VideoContext;
