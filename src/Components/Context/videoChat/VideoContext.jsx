import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../ContextProvider';
import { Grid, Typography, Paper, makeStyles, useTheme } from '@material-ui/core';
import Webcam from "react-webcam";
//styleing 
import componentStyles from "../../../assets/material-ui-style/componenets/video";
const useStyles = makeStyles(componentStyles);

function VideoContext(props) {
    const { setStream, myName, yourName, callAccepted, myVideo, userVideo, callEnded, stream, call, myCanvasRef, userCanvasRef, me, posesArry, you, sendPoses, sendMyPoses, socket } = useContext(SocketContext);
    const classes = useStyles();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream); //sent to pather the steam data
                // if (myVideo.current) myVideo.current.srcObject = currentStream;
                // console.log(currentStream);
                //setHolistic(myVideo);
            });
    }, []);

    return (
        <Grid container className={classes.gridContainer}>
            {stream && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{myName || 'Name'}</Typography>
                        <Webcam playsInline muted ref={myVideo} autoPlay className={classes.video} />
                        {/* <canvas ref={myCanvasRef} className={classes.video}></canvas> */}
                    </Grid>
                </Paper>
            )}
            {callAccepted && !callEnded && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{yourName || 'Name'}</Typography>
                        <video playsInline ref={userVideo} autoPlay className={classes.video} />
                        {/* <canvas ref={userCanvasRef} className={classes.video}></canvas> */}
                    </Grid>
                </Paper>
            )}
        </Grid>
    );
}
export default VideoContext;
