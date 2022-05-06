import React, { useContext, useEffect, useState, useRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { styled } from '@mui/system'
import { Grid, Container, Button, Box, Card, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import NextMeetingTime from '../meeting/NextMeetingTime';
import Search from '../search/Search';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { dateFormat } from '../../Utils/dateFormat';
import buttonsStyles from "../../assets/theme/buttons";
import QuickStartBtn from './QuickStartBtn';
import PopUpQuickStart from '../popupCall/PopUpQuickStart';
import ListBoxTop from '../listBox/ListBoxTop';
import DoughnutChart from '../charts/DoughnutChart';
import ProgressUserView from './trainer/ProgressUserView';
import CardContiner from '../card/CardContiner';
import SeccsesAlert from '../alrets/SeccsesAlert';
import CallIcon from '@mui/icons-material/Call';
import TraineesCard from './trainer/TraineesCard';
import ErrorAlert from '../alrets/ErrorAlert';
import { delay } from '../../helpers';
import Carousel from '../card/Carousel/Carousel';
import Loader from '../loder/Loder';
import ListedMeetings from './trainer/listTable/ListedMeetings';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

const buttonStyle = makeStyles(buttonsStyles);

const useStyles = makeStyles({
    root: {
        padding: "70px 0",
        position: "relative",
        overflow: "hidden",
        position: 'relative',
    },
    imgBackground: {
        right: "auto",
        left: "50px",
        maxWidth: "45%",
        top: "30px",
        position: "absolute",
        opacity: "0.02"
    },
    box: {
        // height: 100,
        display: "flex",
    },
    topLeftBox: {
        justifyContent: "center",
        alignItems: "center"
    }
});

//Trainer will have his data , graph and lists
function TrainerHome({ meeting, date, dateToMeeting }) {
    const { setAccseptScheduleMeetingCall, setYourSocketId, setMySocketId, socket, setUpcomingMeetingToNow, scheduleMeetingPopUpCall, upcamingMeeting } = useContext(SocketContext);
    const navigate = useNavigate();
    const classes = useStyles();
    const btnClasses = buttonStyle();
    const theme = useTheme();
    const profile = useSelector(state => state.profile.profile)
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [quickStartOpen, setQuickStartOpen] = useState(false);
    const meetings = useSelector(state => state.meetings);
    const my_trainees = useSelector(state => state.profile.trainees_profiles);
    const trainee_profile_called = useSelector(state => state.profile.trainee_profile_called);

    let abortController = new AbortController(); //why? => https://www.loginradius.com/blog/engineering/how-to-fix-memory-leaks-in-react/
    useEffect(async () => {
        if (errorDisplay) {
            await delay(3000);
            setErrorDisplay(false);
        }
        return () => {
            abortController.abort();
        }
    }, [errorDisplay])

    const handelConectNow = () => {
        if (upcamingMeeting) {
            console.log('cliclllllkkkk');
            //get your socket id
            socket?.emit("getSocketId", upcamingMeeting.tariner._id, user => {
                console.log('getSocketId', upcamingMeeting.tariner._id, user);
                setMySocketId(user?.socketId)
            });
            socket?.emit("getSocketId", upcamingMeeting.trainee._id, user => {
                console.log('getSocketId', upcamingMeeting.trainee._id, user);
                if (user !== null) {
                    setYourSocketId(user?.socketId);
                    //sand popup call to trainee
                    setUpcomingMeetingToNow(true);
                    //move trainer to vodo-room page
                    //vodo-room page chacks what the socket id of the participamts 
                    //if ther is none for trainee then dont conect and set an error display
                    let roomId = upcamingMeeting._id;
                    let from = upcamingMeeting.tariner._id;
                    let to = upcamingMeeting.trainee._id;

                    socket?.emit("joinUser", from, to, roomId, users => {
                        console.log('getUsers', users);
                    });
                    socket?.off("joinUser");
                    setAccseptScheduleMeetingCall(true);
                    navigate('/video-room', { state: { meeting: upcamingMeeting } });
                    return;
                }
                else if (user === null) {
                    console.log('errrorrrrrrr rturnnnnn');
                    setErrorDisplay(true);
                    return;
                }
            });
        }
        else {
            Swal.fire({
                title: 'No Meeting to Conect',
                width: 600,
                padding: '3em',
                background: '#fff',
                backdrop: `rgba(0,0,123,0.4)`
            })
        }
    }

    const quickStart = () => {
        setQuickStartOpen(true);
    }

    return (
        <>
            <Container maxWidth="xl">
                {quickStartOpen && <PopUpQuickStart quickStartOpen={quickStartOpen} setQuickStartOpen={setQuickStartOpen} />}
                {errorDisplay && <ErrorAlert name={upcamingMeeting.trainee.user} title=" is not online in order to conect joined meeting" />}
                <Grid container alignItems='center' justifyContent='center' spacing={1} >
                    <Grid item xs={3} md={4}>
                        <Button
                            color='primary'
                            variant="contained"
                            startIcon={<VideoCameraFrontIcon />}
                            className={btnClasses.purpleRoundEmpty}
                            onClick={() => quickStart()}
                            fullWidth>
                            Quick Start
                        </Button>
                    </Grid>
                    <Grid item xs={9} md={8}>
                        <Search />
                    </Grid>
                </Grid>

                {
                    profile && !trainee_profile_called
                        ? <>
                            {
                                isEmpty(profile.trainees_profiles) ? <></> : <Loader />
                            }
                        </>
                        : <>
                            {
                                !isEmpty(my_trainees) ? <Carousel /> : <></>
                            }
                        </>

                }
                <Grid container alignItems='center' alignContent='center' spacing={2}>
                    <Grid item xs={12} md={12}>
                        <CardContiner title="Your Upcoming Meeting" subtitle={dateToMeeting === 0 ? '' : `At ${dateFormat(dateToMeeting.toString())}`} >
                            {!isEmpty(upcamingMeeting) && 'Participants :  ' + upcamingMeeting?.tariner.user + ' && ' + upcamingMeeting?.trainee.user}
                            {meetings?.meetings && meetings?.meetings?.lenght != 0 && meeting && !isEmpty(upcamingMeeting) && (date !== 0 || date !== NaN) && <NextMeetingTime upcamingMeeting={upcamingMeeting} date={!date ? 0 : date} />}
                            <Box
                                component="span"
                                m={1}
                                className={`${classes.topLeftBox} ${classes.box}`}
                            >
                                <Button
                                    color='primary'
                                    startIcon={<CallIcon />}
                                    className={btnClasses.blueRound}
                                    onClick={handelConectNow}
                                >
                                    Conect Now
                                </Button>
                            </Box>
                        </CardContiner>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        {
                            profile && !isEmpty(meetings.meetings) ?
                                <ListedMeetings /> :
                                <></>
                        }
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        {/* <AppCurrentVisits /> */}
                    </Grid>

                </Grid>

                {
                    !isEmpty(meetings.meetings_complited) &&
                    <Grid container spacing={3}>
                        <Grid item lg={8} md={8} sm={12} xs={12}>
                            <ListBoxTop meetings_complited={meetings.meetings_complited} />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card sx={{ px: 3, py: 2, m: 3 }}>
                                <Typography component="h5" style={{ padding: '10px' }}>Sessions Amount</Typography>
                                <DoughnutChart
                                    height="300px"
                                    meetings_complited={meetings.meetings_complited}
                                />
                            </Card>
                            {/* <ProgressUserView /> */}
                        </Grid>
                    </Grid>
                }

            </Container>
        </>

    );
}


export default TrainerHome;