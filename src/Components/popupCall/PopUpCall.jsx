import React, { useContext, useEffect, useState, forwardRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import Calling from "../../assets/sounds/calling.mp3";
import Phone from "../../assets/img/phone.gif";
import isEmpty from '../../validation/isEmpty';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Avatar } from '@material-ui/core';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PopUpCall(props) {
    const { socket, scheduleMeetingPopUpCall, setScheduleMeetingPopUpCall, setIsModalVisible, isModalVisible, Audio, answerCall, call, callAccepted } = useContext(SocketContext);
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    //const scheduleMeetingPopUpCall = { id: '555', tariner: { _id: "61f41299f214dbc605e23778z", user: 'trainer' }, trainee: { _id: "61f41299f214dbc605e23778", user: 'trainee' } }

    const showModal = (showVal) => {
        setScheduleMeetingPopUpCall({});
        setIsModalVisible(showVal);
        Audio.current.pause();
        setAccseptScheduleMeetingCall();
        let roomId = scheduleMeetingPopUpCall._id;
        let from = user._id;
        let to = scheduleMeetingPopUpCall.tariner._id !== user._id ? scheduleMeetingPopUpCall.tariner._id : scheduleMeetingPopUpCall.trainee._id;

        socket?.emit("joinUser", from, to, roomId, users => {
            console.log('getUsers', users);
        });
        socket?.off("joinUser");
        navigate('/video-room', { state: { meeting: scheduleMeetingPopUpCall } });
    };

    const handleClose = (showVal) => {
        setScheduleMeetingPopUpCall({});
        setIsModalVisible(showVal);
        Audio.current.pause();
        //declineCall
    };


    return (
        <>
            {!isEmpty(scheduleMeetingPopUpCall) && (
                <>
                    <audio src={Calling} loop ref={Audio} />
                    <Dialog
                        open={isModalVisible}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Schedule Meeting Call"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Your Meeting with {" "}
                                {user.role === 'trainer'
                                    ? scheduleMeetingPopUpCall.trainee.user
                                    : scheduleMeetingPopUpCall.trainer.user
                                }
                                {" "} is NOW ! !
                                <img
                                    src={Phone}
                                    alt="phone ringing"
                                    style={{ display: "inline-block", height: "4rem", }}
                                />
                            </DialogContentText>
                            <Grid container spacing={1} justifyContent='center' sx={{ padingTop: '30px' }}>
                                <Grid item>
                                    <Avatar
                                        alt="avatar"
                                        src={user.avatar}
                                        sx={{ width: 70, height: 70 }}
                                    >{user.user}</Avatar>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        alt="avatar"
                                        src={user.avatar}
                                        sx={{ width: 70, height: 70 }}
                                    />
                                </Grid>
                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose(false)}>Disagree</Button>
                            <Button onClick={() => showModal(false)}>Agree</Button>
                        </DialogActions>
                    </Dialog> </>
            )}
        </>
    );
}

export default PopUpCall;