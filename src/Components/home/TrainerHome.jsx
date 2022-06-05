import React, { useContext, useEffect, useState, useRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux';
import { getTraineesSyncs } from '../../Store/actions/syncperformanceActions';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system'
import { Grid, Container, Button, Box, Card, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import AddIcon from '@mui/icons-material/Add';
import ColumnSyncs from '../charts/ColumnSyncs';

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
    const dispatch = useDispatch();
    const classes = useStyles();
    const btnClasses = buttonStyle();
    const theme = useTheme();
    const profile = useSelector(state => state.profile.profile)
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [quickStartOpen, setQuickStartOpen] = useState(false);
    const [dataChart, setDataChart] = useState(null);
    const meetings = useSelector(state => state.meetings);
    const my_trainees = useSelector(state => state.profile.trainees_profiles);
    const trainee_profile_called = useSelector(state => state.profile.trainee_profile_called);
    const syncperformance_trainees = useSelector(state => state.syncperformance.trainees);

    let abortController = new AbortController(); //why? https://www.loginradius.com/blog/engineering/how-to-fix-memory-leaks-in-react/
    useEffect(async () => {
        if (errorDisplay) {
            await delay(3000);
            setErrorDisplay(false);
        }
        return () => {
            abortController.abort();
        }
    }, [errorDisplay])

    useEffect(() => {
        if (isEmpty(syncperformance_trainees) && !isEmpty(meetings.meetings_complited)) {
            dispatch(getTraineesSyncs());
        }
        else {
            console.log('syncperformance_trainees', syncperformance_trainees);
            let arruser = [];
            let arrsyncs = [];
            let arrdata = [];

            syncperformance_trainees.map(el => {
                console.log('elel', el);
                arruser.push(el.user.user);
                let sum = 0;
                let count = 0;
                let sum5 = 0;
                let flag = false;
                let last = 0;
                //set Total_AVG
                el.syncs.map((s, i) => {
                    if (i === 0) last = Number(s.totalAvg);
                    console.log('sss', Number(s.totalAvg));
                    sum += Number(s.totalAvg);
                    count++;
                    //Top 5 meetings avg
                    if (count === 4) {
                        sum5 = sum;
                        flag = true;
                    }
                })

                //Top 5 meetings avg
                let top5 = sum / count;
                if (flag) top5 = sum5 / 5;

                //console.log('sumsumsum', sum5, sum);
                arrsyncs.push(Math.trunc(sum / count), Math.trunc(last), Math.trunc(top5))
                console.log('arrsyncsarrsyncs', arrsyncs);

                arrdata.push({ name: el.user.user, data: arrsyncs });
                arrsyncs = [];
                flag = false;
                sum = 0;
                count = 0;
                sum5 = 0;
            })
            console.log('arrdata', arrdata);
            setDataChart(arrdata)
            // setTop3HighSync();
            // setTop3LowSync();
            // setTop1LastMeeting();
        }
    }, [syncperformance_trainees, meetings.meetings_complited])

    const handelConectNow = () => {
        if (upcamingMeeting) {
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

    console.log('dddd', !isEmpty(my_trainees), profile?.trainerOf.length);
    return (
        <>
            <Container maxWidth="xl">
                {/* <Button onClick={() => navigate('/video-room', { state: { meeting: meetings.upcoming_meeting } })}>Video</Button> */}
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
                    profile && !trainee_profile_called && profile?.trainerOf.length !== 0
                        ? <Loader />
                        : <>
                            {
                                !isEmpty(my_trainees) || profile?.trainerOf.length !== 0 ? <Carousel /> : <></>
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
                            !isEmpty(dataChart) && dataChart.lenght !== 0 ?
                                <>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" mt={3} mb={1}>
                                        <Typography variant="h4" gutterBottom>
                                            Trainees Syncs Follow Up
                                        </Typography>
                                    </Stack>
                                    <ColumnSyncs data={dataChart} />
                                </>
                                : <></>
                        }
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        {
                            profile && !isEmpty(meetings.meetings) ?
                                <>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" mt={3} mb={1}>
                                        <Typography variant="h4" gutterBottom>
                                            Your Meetings
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            component={Link}
                                            to="/schedule/meetings"
                                            className={btnClasses.purpleRound}
                                            startIcon={<AddIcon />}
                                        >
                                            New Meeting
                                        </Button>
                                    </Stack>
                                    <ListedMeetings />
                                </>

                                : <></>
                        }
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