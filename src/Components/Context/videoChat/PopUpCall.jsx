import React, { useContext, useEffect, useState, forwardRef } from 'react';
import { SocketContext } from '../ContextProvider';
import Calling from "../../../assets/sounds/calling.mp3";
import Phone from "../../../assets/img/phone.gif";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PopUpCall = ({ upcomingMeeting }) => {
    const { setIsModalVisible, isModalVisible, Audio, answerCall, call, callAccepted } = useContext(SocketContext);

    const showModal = (showVal) => {
        setIsModalVisible(showVal);
        Audio.current.pause();
    };
    const handleClose = (showVal) => {
        setIsModalVisible(showVal);
        Audio.current.pause();
    };

    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <>
                    <audio src={Calling} loop ref={Audio} />
                    <Dialog
                        open={isModalVisible}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Incoming Call"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                {call.name} is calling you:{" "}
                                <img
                                    src={Phone}
                                    alt="phone ringing"
                                    style={{ display: "inline-block", height: "4rem", }}
                                />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose}>Disagree</Button>
                            <Button onClick={() => showModal(false)}>Agree</Button>
                        </DialogActions>
                    </Dialog> </>
            )}
        </>
    );
}
export default PopUpCall;
