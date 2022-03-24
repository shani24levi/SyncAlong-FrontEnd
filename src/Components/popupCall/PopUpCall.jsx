import React, { useContext, useEffect, useState, forwardRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveMeeting } from '../../Store/actions/meetingActions';
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
    const { setCallTrainee, socket, setAccseptScheduleMeetingCall, scheduleMeetingPopUpCall, setScheduleMeetingPopUpCall, setIsModalVisible, isModalVisible, Audio, answerCall, call, callAccepted } = useContext(SocketContext);
    // const scheduleMeetingPopUpCall = { id: 'ddd', trainee: { user: 'nam2', avatar: '22' }, trainer: { user: 'name1', avatar: '233' } }
    const user = useSelector(state => state.auth.user);
    const meetings = useSelector(state => state.meetings);
    const [currMeeting, setCurrMeeting] = useState(scheduleMeetingPopUpCall);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isModalVisible) {
            Audio?.current?.play();
        } else Audio?.current?.pause();
    }, [isModalVisible])

    const showModal = (showVal) => {
        let roomId = scheduleMeetingPopUpCall._id;
        let from = user._id;
        let to = scheduleMeetingPopUpCall.tariner._id !== user._id ? scheduleMeetingPopUpCall.tariner._id : scheduleMeetingPopUpCall.trainee._id;

        socket?.emit("joinUser", from, to, roomId, users => {
            console.log('getUsers', users);
        });
        socket?.off("joinUser");

        dispatch(setActiveMeeting(scheduleMeetingPopUpCall, { status: true }));
        setScheduleMeetingPopUpCall({});
        setIsModalVisible(showVal);
        Audio.current.pause();
        setAccseptScheduleMeetingCall(true);
        setCallTrainee(false);
        navigate('/video-room', { state: { meeting: scheduleMeetingPopUpCall } });
    };

    const handleClose = (showVal) => {
        setScheduleMeetingPopUpCall({});
        setCallTrainee(false);
        setIsModalVisible(showVal);
        Audio.current.pause();
        //declineCall
    };

    //     activities: (3) ['squats', 'center body area and upper-body moves to right-left side on X-axis', 'stretching hands up 90 degrees without moving']
    // date: "2022-03-19T15:02:00.000Z"
    // status: false
    // tariner: {_id: '61f41299f214dbc605e23778', user: 'xxx1', role: 'trainer'}
    // trainee: {_id: '6214b44405ebc47e36303a6b', user: 'g122.2', role: 'trainee'}
    // __v: 0
    // _id: "6235d3e3f556f618668c617b"

    console.log('scheduleMeetingPopUpCall', scheduleMeetingPopUpCall);
    console.log('meetings', meetings);
    console.log('isModalVisible', isModalVisible);
    console.log('user.role', user.role);

    useEffect(() => {
        if (!isEmpty(scheduleMeetingPopUpCall)) setCurrMeeting(scheduleMeetingPopUpCall)
        else if (!isEmpty(meetings.upcoming_meeting)) setCurrMeeting(meetings.upcoming_meeting)
    }, [])


    return (
        <>
            {(!isEmpty(currMeeting)) && (
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
                                {user.role === 'trainer' //trainer
                                    ? currMeeting.trainee.user
                                    : currMeeting.tariner.user ////erroreee text 
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
                                        src={currMeeting.trainee.avatar}
                                        sx={{ width: 70, height: 70 }}
                                    >{user.user}</Avatar>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        alt="avatar"
                                        src={currMeeting.tariner.avatar}
                                        sx={{ width: 70, height: 70 }}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose(false)}>Disagree</Button>
                            <Button onClick={() => showModal(false)}>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </>
    );
}

export default PopUpCall;