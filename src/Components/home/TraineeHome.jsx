//Trainee will have his list of activities 
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme, styled, alpha } from "@material-ui/core/styles";
import { Box, Card, Container, Grid } from "@material-ui/core";
import NextMeetingTime from '../meeting/NextMeetingTime';
// core components
import PopUpCall from '../popupCall/PopUpCall';
import componentStyles from "../../assets/material-ui-style/componenets/avatars";
import HeaderWaves from './trainee/HeaderWaves';
import CircelsHeader from '../layout/Header/CircelsHeader';
import { Avatar, AvatarGroup, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import PopUpCallQuickMeeting from '../popupCall/PopUpCallQuickMeeting';
import isEmpty from '../../validation/isEmpty';
import WorningAlert from '../alrets/WorningAlert';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import TimelineIcon from '@mui/icons-material/Timeline';
import { delay } from '../../helpers';
const useStyles = makeStyles(componentStyles);

// styles
const CardWrapper = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    padding: '16px',
    borderRadius: '16px',
    color: 'rgb(4, 41, 122) !important',
    // backgroundColor: 'rgb(208, 242, 255) !important'
}));

const CardAvatar = styled(Card)(({ theme }) => ({
    backgroundColor: '#fff',
    color: '#000',
    padding: '16px',
    borderRadius: '16px',
    color: 'rgb(4, 41, 122) !important',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));


function TraineeHome({ meeting, date }) {
    const { updateMeetingAlrt, setUpdateMeetingAlrt, callQuickMeeting, setCallQuickMeeting, callTrainee, upcomingMeetingToNow, scheduleMeetingPopUpCall, upcamingMeeting } = useContext(SocketContext);
    const classes = useStyles();
    const theme = useTheme();
    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.profile);
    const meetings = useSelector(state => state.meetings);
    const syncperformance = useSelector(state => state.syncperformance.syncs);
    const [dataChart, setDataChart] = useState(null);

    useEffect(() => {
        if (!isEmpty(syncperformance) && !isEmpty(meetings.meetings_complited)) {
            console.log('syncperformance_trainees', syncperformance);
            // let arruser = [];
            // let arrsyncs = [];
            // let arrdata = [];

            // syncperformance.map(el => {
            //     console.log('elel', el);
            //     arruser.push(el.user.user);
            //     let sum = 0;
            //     let count = 0;
            //     let sum5 = 0;
            //     let flag = false;
            //     let last = 0;
            //     //set Total_AVG
            //     el.syncs.map((s, i) => {
            //         if (i === 0) last = Number(s.totalAvg);
            //         console.log('sss', Number(s.totalAvg));
            //         sum += Number(s.totalAvg);
            //         count++;
            //         //Top 5 meetings avg
            //         if (count === 4) {
            //             sum5 = sum;
            //             flag = true;
            //         }
            //     })

            //     //Top 5 meetings avg
            //     let top5 = sum / count;
            //     if (flag) top5 = sum5 / 5;

            //     //console.log('sumsumsum', sum5, sum);
            //     arrsyncs.push(Math.trunc(sum / count), Math.trunc(last), Math.trunc(top5))
            //     console.log('arrsyncsarrsyncs', arrsyncs);

            //     arrdata.push({ name: el.user.user, data: arrsyncs });
            //     arrsyncs = [];
            //     flag = false;
            //     sum = 0;
            //     count = 0;
            //     sum5 = 0;
            // })
            // console.log('arrdata', arrdata);
            // setDataChart(arrdata)
        }
    }, [syncperformance, meetings.meetings_complited])


    // console.log('====================================');
    // console.log(callTrainee);
    // console.log('====================================');

    useEffect(async () => {
        console.log('updateMeetingAlrt', updateMeetingAlrt);
        if (updateMeetingAlrt) {
            await delay(10000);
            setUpdateMeetingAlrt(false);
        }
    }, [updateMeetingAlrt])

    console.log('callQuickMeeting', callQuickMeeting);
    console.log('upcamingMeeting', upcamingMeeting);


    return (
        <>
            <HeaderWaves meeting={meeting} date={date} upcamingMeeting={upcamingMeeting} />
            {callTrainee && <PopUpCall />}
            {!isEmpty(callQuickMeeting) && <PopUpCallQuickMeeting currMeeting={callQuickMeeting} />}
            {updateMeetingAlrt && <WorningAlert title={`Up Coming Meeting is updating by ${upcamingMeeting.tariner.user}`} />}
            <Box
                position="relative"
                paddingTop="4rem"
                bgcolor="#fff"
            >
                <Container maxWidth="xl">
                    <Grid container sx={{ py: 2 }} justifyContent={'space-around'} spacing={2}>
                        <Grid
                            item
                            xs={12}
                            md={6} lg={6}
                        >
                            <CardWrapper>
                                <Box sx={{ p: 2 }}>
                                    <List sx={{ py: 0 }}>
                                        <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        ...theme.typography.commonAvatar,
                                                        ...theme.typography.largeAvatar,
                                                        backgroundColor: theme.palette.primary[800],
                                                        color: '#fff'
                                                    }}
                                                >
                                                    <EmojiEventsIcon width={34} height={34} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                sx={{
                                                    py: 0,
                                                    mt: 0.45,
                                                    mb: 0.45
                                                }}
                                                primary={
                                                    <Typography variant="h4" sx={{ color: '#fff' }}>
                                                        99%
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                                                        Bast Sync Score Meeting
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                </Box>
                            </CardWrapper>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6} lg={6}
                        >
                            <CardWrapper >
                                <Box sx={{ p: 2 }}>
                                    <List sx={{ py: 0 }}>
                                        <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        ...theme.typography.commonAvatar,
                                                        ...theme.typography.largeAvatar,
                                                        backgroundColor: theme.palette.primary[800],
                                                        color: '#fff'
                                                    }}
                                                >
                                                    <MilitaryTechIcon width={34} height={34} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                sx={{
                                                    py: 0,
                                                    mt: 0.45,
                                                    mb: 0.45
                                                }}
                                                primary={
                                                    <Typography variant="h4" sx={{ color: '#fff' }}>
                                                        ##78 hands
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                                                        Bast Activity Sync Score
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                </Box>
                            </CardWrapper>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={12} lg={12}
                        >
                            <CardAvatar>
                                <AvatarGroup max={4}>
                                    <Avatar alt="you" src={profile.profile.traineeOf.avatar} className={classes.middle} />
                                    <Avatar alt="me" src={user.avatar} className={classes.middle} />
                                </AvatarGroup>

                            </CardAvatar>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={12} lg={12}
                        >
                            <CardWrapper className="page-header header-filter">
                                <Grid className="index-page">
                                    <CircelsHeader />
                                    <Box sx={{ p: 2 }}>
                                        <List sx={{ py: 0 }}>
                                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            ...theme.typography.commonAvatar,
                                                            ...theme.typography.largeAvatar,
                                                            backgroundColor: theme.palette.primary[800],
                                                            color: '#fff'
                                                        }}
                                                    >
                                                        <TimelineIcon width={34} height={34} />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    sx={{
                                                        py: 0,
                                                        mt: 0.45,
                                                        mb: 0.45
                                                    }}
                                                    primary={
                                                        <Typography variant="h4" sx={{ color: '#fff' }}>
                                                            Total Sync So Far: 74%
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                                                            Your Sync Progress on Meetings
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Grid>
                            </CardWrapper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#fff" fillOpacity="1" d="M0,128L40,133.3C80,139,160,149,240,154.7C320,160,400,160,480,149.3C560,139,640,117,720,112C800,107,880,117,960,144C1040,171,1120,213,1200,213.3C1280,213,1360,171,1400,149.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
            </svg>
        </>
    );
}

export default TraineeHome;