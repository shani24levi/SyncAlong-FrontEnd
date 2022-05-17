import React, { useContext, useEffect, useState, forwardRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux';
import { craeteMeetings, setActiveMeeting, clearCreatedQuickMeeting } from '../../Store/actions/meetingActions';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import Calling from "../../assets/sounds/calling.mp3";
import Reconect from "../../assets/img/reconect.gif";
import isEmpty from '../../validation/isEmpty';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import { Card, CircularProgress, CardContent } from "@material-ui/core";

import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Avatar, Tooltip } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { capitalize, delay } from '../../helpers';

import componentStyles from "../../assets/material-ui-style/componenets/avatars";
import Loader from '../loder/Loder';
import activitiesFilter from '../../Utils/activitiesFilter';
const useStyles = makeStyles(componentStyles);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function PopUpQuickStart({ quickStartOpen, setQuickStartOpen }) {
    const { socket, setYourSocketId, yourSocketId, setMySocketId, setCallTrainee, setAccseptScheduleMeetingCall } = useContext(SocketContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.profile);
    const meeting = useSelector(state => state.meetings);
    const [onlineTrainees, setOnlineTrainees] = useState([]);
    const [offlineTrainees, setOfflineTrainees] = useState([]);
    const [socketsCalls, setSocketsCalls] = useState(false);
    const [createMeetingProcces, setCreateMeetingProcces] = useState(false);
    const [userSelcted, setUserSelcted] = useState(null);
    const [activities, setActivities] = useState(null);
    const [quickMeeting, setQuickMeeting] = useState(null);


    useEffect(async () => {
        if (profile.trainees_profiles.length !== 0 && quickStartOpen) {
            //get thir sockets idis 
            setSocketsCalls(true);
            profile.trainees_profiles.map(el => {
                socket?.emit("getSocketId", el.user._id, user => {
                    console.log('getSocketId', el.user._id, user);
                    if (user?.socketId) {
                        let data = {
                            socketId: user.socketId,
                            userId: el.user._id,
                            user: el,
                        }
                        onlineTrainees.push(data)
                    }
                    else {
                        offlineTrainees.push(el.user);
                    }
                });
            })
            setOnlineTrainees(onlineTrainees);
            setOfflineTrainees(offlineTrainees);
            await delay(3000);
            setSocketsCalls(false);
        }
        else return;
    }, [])

    const showModal = (showVal) => {
        setQuickStartOpen(showVal)
    };

    const handleClose = (showVal) => {
        setQuickStartOpen(showVal)
    };

    const random5activities = (user) => {
        let unique = profile.profile?.limitations;
        let limits = user.user.profile.limitations.concat(user.user.profile?.limitations);
        unique = [...new Set(limits)];

        let activities_obj = null
        if (unique.length !== 0)
            activities_obj = activitiesFilter(unique);
        else
            activities_obj = activitiesFilter(null);

        let all_activitis = [];
        activities_obj.abdomen && activities_obj.abdomen.map(el => all_activitis.push(el));
        activities_obj.allbody && activities_obj.allbody.map(el => all_activitis.push(el));
        activities_obj.arms && activities_obj.arms.map(el => all_activitis.push(el));
        activities_obj.legs_knees && activities_obj.legs_knees.map(el => all_activitis.push(el));
        activities_obj.lower_back && activities_obj.lower_back.map(el => all_activitis.push(el));
        activities_obj.upper_back && activities_obj.upper_back.map(el => all_activitis.push(el));

        let random5 = [];
        let randomNum = 0;
        while (randomNum !== 3) {
            let item = all_activitis[Math.floor(Math.random() * all_activitis.length)];
            console.log(item);
            random5.push(item);
            all_activitis.filter(el => el === item);
            randomNum++;
        }
        console.log('random5', random5);
        setActivities(random5);
        return random5;
    }

    useEffect(() => {
        console.log('meeting.meeeting_created', meeting.meeeting_created);
        if (!isEmpty(meeting.meeeting_created)) {
            setQuickMeeting(meeting.meeeting_created);
            let userTrainee = onlineTrainees.find(el => el.userId === userSelcted)
            !isEmpty(userTrainee) && setYourSocketId(userTrainee.socketId);
            socket?.emit("getSocketId", user._id, user => {
                console.log('getSocketId', user);
                setMySocketId(user.socketId);
            });

            let roomId = meeting.meeeting_created._id;
            let from = meeting.meeeting_created.tariner._id;
            let to = meeting.meeeting_created.trainee._id;

            let data = {
                yourSocketId: userSelcted.socketId,
                quickMeeting: meeting.meeeting_created
            }

            socket?.emit('calltoTraineeQuickMeeting', data);
            socket?.emit("joinUser", from, to, roomId, users => {
                console.log('getUsers', users);
            });
            socket?.off("joinUser");
            setAccseptScheduleMeetingCall(true);
            setCreateMeetingProcces(false);

            dispatch(setActiveMeeting(meeting.meeeting_created, true));
            // dispatch(clearCreatedQuickMeeting());
            navigate('/video-room', { state: { meeting: meeting.meeeting_created } });
        }
    }, [meeting.meeeting_created])

    const craeteMeeting = () => {
        if (!isEmpty(userSelcted) && !isEmpty(activities)) {
            setCreateMeetingProcces(true);
            let date = new Date();
            date.setHours(date.getMonth() + 3); //to avoide pop up meeting nowwww
            let newMeeting = {
                title: `random${new Date()}`,
                trainee: userSelcted.userId,
                date,
                activities: activities,
            }
            dispatch(craeteMeetings(newMeeting));
        }
    }

    const selctedUser = (user) => {
        console.log(user);
        if (!isEmpty(user)) {
            //set random list of activity:
            let random_5 = random5activities(user);
            //setActivities(random_5);
            setUserSelcted(user);
        }

    }

    console.log(userSelcted);

    return (
        <Dialog
            open={quickStartOpen}
            TransitionComponent={Transition}
            onClose={() => handleClose()}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Connect With...."}</DialogTitle>
            {
                isEmpty(userSelcted)
                    ?
                    <>
                        <DialogContent>
                            {
                                isEmpty(profile.trainees_profiles) || profile.trainees_profiles?.length === 0
                                    ?
                                    <Box m="auto"
                                        alignItems="center"
                                        justifyContent="center"
                                        textAlign="center"
                                        minHeight="100px"
                                        marginTop="160px"
                                        marginBottom="160px"
                                    >
                                        <ErrorOutlineIcon style={{ height: '120px', width: '120px' }} />
                                        <Typography variant='h2'>{"No Users"}</Typography>
                                        <Typography variant='h6'>{"Add Users to begin"}</Typography>
                                    </Box>
                                    :
                                    <>
                                        {
                                            socketsCalls ? <Loader /> :
                                                <>
                                                    <DialogContentText id="alert-dialog-slide-description"
                                                        style={{
                                                            fontSize: 'x-large', fontWeight: 'bold', marginBottom: '35px', textAlign: 'center'
                                                        }} >
                                                        {
                                                            isEmpty(onlineTrainees) ? 'No User is Online..' : 'Online Users: '
                                                        }
                                                    </DialogContentText>
                                                    {
                                                        !isEmpty(onlineTrainees) &&
                                                        <Grid container spacing={1} justifyContent='center' sx={{ padingTop: '30px', marginLeft: '0px' }}>
                                                            {
                                                                onlineTrainees.map(el => {
                                                                    console.log('onlineTrainees', el);
                                                                    return (
                                                                        <Grid item key={el.user.user._id}>
                                                                            <Tooltip title={capitalize(el.user.user.user)} placement="top" arrow>
                                                                                <IconButton aria-label="fingerprint" color="secondary" onClick={() => selctedUser(el)}>
                                                                                    <Avatar alt={el.user.user.user} src={el.user.user.avatar} className={classes.middle} />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        </Grid>
                                                                    )
                                                                })
                                                            }
                                                        </Grid>
                                                    }

                                                    <DialogContentText id="alert-dialog-slide-description"
                                                        style={{
                                                            fontSize: 'x-large', fontWeight: 'bold', marginBottom: '35px', textAlign: 'center'
                                                        }} >
                                                        Offline Users
                                                    </DialogContentText>

                                                    {
                                                        !isEmpty(offlineTrainees) &&
                                                        <Grid container spacing={1} justifyContent='center' sx={{ padingTop: '30px', marginLeft: '0px' }}>
                                                            {
                                                                offlineTrainees.map(el => {
                                                                    return (
                                                                        <Grid item key={el._id}>
                                                                            <Avatar alt={el.user} src={el.avatar} className={classes.middle} />
                                                                            <Typography
                                                                                variant="h6"
                                                                                align="center"
                                                                            >{capitalize(el.user)}</Typography>
                                                                        </Grid>
                                                                    )
                                                                })
                                                            }
                                                        </Grid>
                                                    }
                                                </>
                                        }
                                    </>
                            }
                        </DialogContent>
                        <DialogActions>
                            {
                                isEmpty(profile.trainees_profiles) || profile.trainees_profiles?.length === 0
                                    ?
                                    <IconButton
                                        onClick={() => handleClose(false)}
                                        aria-label="join"
                                        size="large"
                                        color="inherit"
                                    >
                                        <CloseIcon fontSize="large" />
                                    </IconButton>
                                    :
                                    <IconButton
                                        onClick={() => showModal(false)}
                                        aria-label="close"
                                        size="large"
                                        color="inherit"
                                    >
                                        <CloseIcon fontSize="large" />
                                    </IconButton>
                                //  </Grid>

                            }
                        </DialogActions>
                    </>
                    :
                    <>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description"
                                style={{
                                    fontSize: 'x-large', fontWeight: 'bold', marginBottom: '35px', textAlign: 'center'
                                }} >
                                {userSelcted.user.user.user}
                            </DialogContentText>
                            <Grid container spacing={1} justifyContent='center' sx={{ padingTop: '30px' }}>
                                <Grid item>
                                    <Tooltip title={capitalize(userSelcted.user.user.user)} placement="top" arrow>
                                        <IconButton aria-label="fingerprint" color="secondary">
                                            <Avatar alt={userSelcted.user.user.user} src={userSelcted.user.user.avatar} className={classes.middle} />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>

                            <DialogContentText id="alert-dialog-slide-description"
                                style={{
                                    fontSize: 'x-large', fontWeight: 'bold', marginBottom: '35px', textAlign: 'center'
                                }} >
                                ACTIVITIES
                            </DialogContentText>

                            {
                                !isEmpty(activities) &&
                                <Grid container spacing={1} justifyContent='center' sx={{ padingTop: '30px' }}>
                                    {
                                        activities.map((el, i) => {
                                            return (
                                                <Grid item key={i}>
                                                    <Tooltip title={capitalize(el)} placement="top" arrow>
                                                        <Avatar alt={el} src={`/activities/imgs\\${el}.PNG`} className={classes.middle} />
                                                    </Tooltip>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            }
                        </DialogContent>
                        <DialogActions>
                            <Grid
                                container
                                height="100%"
                                justifyContent="space-between"
                                sx={{ padding: '0rem 4rem' }}>

                                <IconButton
                                    onClick={() => random5activities(userSelcted)}
                                    aria-label="join"
                                    size="large"
                                    color="inherit"
                                >
                                    <RefreshIcon fontSize="large" />
                                </IconButton>

                                <IconButton
                                    onClick={() => craeteMeeting()}
                                    aria-label="close"
                                    size="large"
                                    color="inherit"
                                >
                                    {
                                        createMeetingProcces
                                            ? <CircularProgress color="secondary" size="20px" />
                                            : <CheckIcon fontSize="large" />
                                    }
                                </IconButton>
                            </Grid>
                        </DialogActions>
                    </>
            }
        </Dialog>
    );
}

export default PopUpQuickStart;