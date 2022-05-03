import React, { useContext, useEffect, useState, forwardRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveMeeting } from '../../Store/actions/meetingActions';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import Calling from "../../assets/sounds/calling.mp3";
import Reconect from "../../assets/img/reconect.gif";
import isEmpty from '../../validation/isEmpty';

import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Avatar } from '@material-ui/core';
import Grid from '@mui/material/Grid';

import componentStyles from "../../assets/material-ui-style/componenets/avatars";
const useStyles = makeStyles(componentStyles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PopUpCallQuickMeeting({ currMeeting }) {
    const { socket, setActiveMeetingPopUp, setYourSocketId, yourSocketId, setMySocketId, setCallTrainee, setAccseptScheduleMeetingCall, scheduleMeetingPopUpCall, setScheduleMeetingPopUpCall, setIsModalVisible, isModalVisible, Audio, answerCall, call, callAccepted } = useContext(SocketContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (isModalVisible) {
            Audio?.current?.play();
        } else Audio?.current?.pause();
    }, [isModalVisible])

    const showModal = (showVal) => {
        socket?.emit("getSocketId", user._id, user => {
            console.log('getSocketId', user);
            setMySocketId(user.socketId);
        });

        socket?.emit("getSocketId", currMeeting.tariner._id, user => {
            console.log('getSocketId', user);
            setYourSocketId(user.socketId);
        });

        let roomId = currMeeting._id;
        let from = currMeeting.trainee._id;
        let to = currMeeting.tariner._id;

        socket?.emit("joinUser", from, to, roomId, users => {
            console.log('getUsers', users);
        });
        socket?.off("joinUser");
        setAccseptScheduleMeetingCall(true);

        dispatch(setActiveMeeting(currMeeting, true));
        navigate('/video-room', { state: { meeting: currMeeting } });
    }
    const handleClose = (showVal) => { }

    return (
        <>
            <audio src={Calling} loop ref={Audio} />
            <Dialog
                open={isModalVisible}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Quick Meeting Call"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description"
                        style={{
                            fontSize: 'x-large', fontWeight: 'bold', marginBottom: '35px', textAlign: 'center'
                        }} >
                        Ouick Meeting with {" "}
                        {user.role === 'trainer' //trainer
                            ? currMeeting.trainee.user
                            : currMeeting.tariner.user ////erroreee text 
                        }
                        {" "} ?
                        <img
                            src={Reconect}
                            alt="phone ringing"
                            style={{ display: "inline-block", height: "4rem", }}
                        />
                    </DialogContentText>

                    <Grid container spacing={1} justifyContent='center' sx={{ padingTop: '30px' }}>
                        <Grid item>
                            <Avatar
                                alt="avatar"
                                src={currMeeting.trainee.avatar}
                                className={classes.middle}
                            >{user.user}</Avatar>
                        </Grid>
                        <Grid item>
                            <Avatar
                                alt="avatar"
                                src={currMeeting.tariner.avatar}
                                className={classes.middle}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid
                        container
                        height="100%"
                        justifyContent="space-between"
                        sx={{ padding: '0rem 4rem' }}>

                        <IconButton
                            onClick={() => handleClose(false)}
                            aria-label="join"
                            size="large"
                            color="inherit"
                        >
                            <PhoneDisabledIcon fontSize="large" />
                        </IconButton>

                        <IconButton
                            onClick={() => showModal(false)}
                            aria-label="close"
                            size="large"
                            color="inherit"
                        >
                            <PhoneEnabledIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopUpCallQuickMeeting;