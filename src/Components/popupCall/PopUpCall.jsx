import React, { useContext, useEffect, useState, forwardRef, useRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveMeeting } from '../../Store/actions/meetingActions';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import Calling from "../../assets/sounds/calling.mp3";
import Phone from "../../assets/img/phone.gif";
import isEmpty from '../../validation/isEmpty';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { IconButton } from '@mui/material';
import { Avatar } from '@material-ui/core';
import { capitalize } from '../../helpers';
import componentStyles from "../../assets/material-ui-style/componenets/avatars";
const useStyles = makeStyles(componentStyles);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PopUpCall = (props) => {
    const { isModalVisible, setIsModalVisible, Audio, setYourSocketId, setMySocketId, setCallTrainee, socket, setAccseptScheduleMeetingCall, scheduleMeetingPopUpCall, setScheduleMeetingPopUpCall, answerCall, call, callAccepted } = useContext(SocketContext);
    // const scheduleMeetingPopUpCall = { id: 'ddd', trainee: { user: 'nam2', avatar: '22' }, trainer: { user: 'name1', avatar: '233' } }
    const user = useSelector(state => state.auth.user);
    const meetings = useSelector(state => state.meetings);
    const [currMeeting, setCurrMeeting] = useState(scheduleMeetingPopUpCall);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();

    // useEffect(() => {
    //     console.log('Audio1', Audio, isModalVisible);
    //     if (isModalVisible && Audio.current !== null) {
    //         const promise = Audio?.current?.play();
    //         if (promise !== undefined) {
    //             promise.then(() => {
    //                 // Autoplay started
    //             }).catch(error => {
    //                 // Autoplay was prevented.
    //                 Audio?.current?.play();
    //             });
    //         }
    //     } else Audio?.current?.pause();
    // }, [])

    useEffect(() => {
        if (isModalVisible && Audio.current !== null) {
            Audio?.current?.play();
        } else Audio?.current?.pause();
    }, [isModalVisible])

    const showModal = (showVal) => {
        let roomId = currMeeting._id;
        let from = user._id;
        let to = currMeeting.tariner._id !== user._id ? currMeeting.tariner._id : currMeeting.trainee._id;

        socket?.emit("getSocketId", to, user => {
            console.log('you-getSocketId', to, user);
            setYourSocketId(user?.socketId)
        })

        socket?.emit("getSocketId", user._id, user => {
            console.log('getSocketId', user._id, user);
            setMySocketId(user?.socketId)
        });

        socket?.emit("joinUser", from, to, roomId, users => {
            console.log('getUsers', users);
        });
        socket?.off("joinUser");

        // dispatch(setActiveMeeting(currMeeting, { status: true }));
        setScheduleMeetingPopUpCall({});
        setIsModalVisible(showVal);
        Audio.current.pause();
        setAccseptScheduleMeetingCall(true);
        setCallTrainee(false);
        navigate('/video-room', { state: { meeting: currMeeting } });
    };

    const handleClose = (showVal) => {
        setScheduleMeetingPopUpCall({});
        setCallTrainee(false);
        setIsModalVisible(showVal);
        Audio.current.pause();
        //declineCall
    };


    useEffect(() => {
        if (!isEmpty(scheduleMeetingPopUpCall)) setCurrMeeting(scheduleMeetingPopUpCall)
        else if (!isEmpty(meetings.upcoming_meeting)) setCurrMeeting(meetings.upcoming_meeting)
    }, [])

    console.log('====================================');
    console.log('Audio', Audio, isModalVisible);
    console.log('====================================');

    return (
        <>
            <audio src={Calling} loop ref={Audio} />
            {(!isEmpty(currMeeting)) && (
                <>
                    <Dialog
                        open={isModalVisible}
                        TransitionComponent={Transition}
                        keepMounted
                        //   onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Schedule Meeting Call"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description"
                                style={{
                                    fontSize: 'x-large', fontWeight: 'bold', marginBottom: '35px', textAlign: 'center'
                                }} >
                                Your Meeting with {" "}
                                {user.role === 'trainer' //trainer
                                    ? capitalize(currMeeting.trainee.user)
                                    : capitalize(currMeeting.tariner.user)
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

                        {/* <DialogActions>
                            <Button onClick={() => handleClose(false)}>Disagree</Button>
                            <Button onClick={() => showModal(false)}>Agree</Button>
                        </DialogActions> */}
                    </Dialog>
                </>
            )}
        </>
    );
}

export default PopUpCall;