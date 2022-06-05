//Trainee will have his list of activities 
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme, styled, alpha } from "@material-ui/core/styles";
import { Box, Card, CardContent, Container, Grid, Menu, MenuItem } from "@material-ui/core";
// import NextMeetingTime from '../meeting/NextMeetingTime';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

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
import { capitalize, delay } from '../../helpers';
import { dateFormat } from '../../Utils/dateFormat';
import AreaActivities from '../charts/AreaActivities';
import TraineeSideCard from '../card/TraineeSideCard';
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
    const [bastActivity, setBastActivity] = useState(null);
    const [bastMeeting, setBastMeeting] = useState(null);
    const [top5, setTop5] = useState(syncperformance);

    const [anchorEl, setAnchorEl] = useState(null);
    const [activityDisplay, setActivityDisplay] = useState({});
    const [MeetingDisplay, setMeetingDisplay] = useState({});
    const [avgDisplay, setAvgDisplay] = useState('');

    useEffect(() => {

        if (!isEmpty(syncperformance)
            && isEmpty(activityDisplay) && isEmpty(MeetingDisplay) && isEmpty(avgDisplay)) {
            syncperformance.length != 0 && setActivityDisplay(syncperformance[0]);
            syncperformance.length != 0 && setMeetingDisplay(syncperformance[0]);
            setAvgDisplay(syncperformance[0].totalAvg);
        }
    }, [syncperformance])

    useEffect(() => {
        if (!isEmpty(syncperformance) && !isEmpty(meetings.meetings_complited)) {
            console.log('syncperformance_trainees', syncperformance);
            let arrAvgs = [];
            let arrBastActivity = [];

            syncperformance.map(el => arrAvgs.push(Number(el.totalAvg)));
            let max = Math.max(...arrAvgs);
            let index = arrAvgs.indexOf(max);

            syncperformance[index].resultByActivities.map(el => arrBastActivity.push(Number(el.avg)));
            let indexActivity = arrBastActivity.indexOf(Math.max(...arrBastActivity));

            setBastActivity(syncperformance[index].resultByActivities[indexActivity]);
            setBastMeeting(syncperformance[index]);

            if (syncperformance.length >= 6) {
                setTop5(syncperformance.slice(1, 6));
            }
        }
    }, [syncperformance, meetings.meetings_complited])

    // useEffect(() => {
    //     if(!isEmpty(bastActivity) && !isEmpty(bastMeeting)){

    //     }
    // }, [bastMeeting, bastActivity])

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

    const handleClick = (event) => {
        console.log('event', event);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSetActivity = (el, i) => {
        console.log(i);
        if (!isEmpty(i)) {
            setMeetingDisplay(el);
            setAvgDisplay(el.totalAvg);
        }
        handleClose();
    }

    console.log('callQuickMeeting', callQuickMeeting);
    console.log('upcamingMeeting', upcamingMeeting);

    console.log('====================================');
    console.log('MeetingDisplay', MeetingDisplay);
    console.log('====================================');

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
                        {
                            !isEmpty(bastActivity) && !isEmpty(bastMeeting) &&
                            <>
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
                                                                {bastMeeting.totalAvg}% Accord at {dateFormat(bastMeeting.dateEnd)}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Typography variant="h6" sx={{ color: 'primary.light', mt: 0.25, fontSize: 'bold' }}>
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
                                                            <MilitaryTechIcon fontSize="xxx-large" width={34} height={34} />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        sx={{
                                                            py: 0,
                                                            mt: 0.45,
                                                            mb: 0.45
                                                        }}
                                                        primary={
                                                            <>
                                                                <Typography variant="h4" sx={{ color: '#fff' }}>
                                                                    {Math.trunc(bastActivity.avg * 100)}%
                                                                </Typography>
                                                                <Typography variant="h4" sx={{ color: '#fff' }}>
                                                                    Accord at {capitalize(bastActivity.activity)}
                                                                </Typography>
                                                            </>
                                                        }
                                                        secondary={
                                                            <Typography variant="h6" sx={{ color: 'primary.light', mt: 0.25 }}>
                                                                Bast Activity Sync Score
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </CardWrapper>
                                </Grid>
                            </>
                        }

                        {
                            !isEmpty(profile.profile) &&
                            <Grid
                                item
                                xs={12}
                                md={12} lg={12}
                            >
                                <CardAvatar>
                                    <AvatarGroup max={4}>
                                        <Avatar alt="you" src={profile.profile.traineeOf.avatar} style={{ width: '130px', height: '130px' }} />
                                        <Avatar alt="me" src={user.avatar} style={{ width: '130px', height: '130px' }} />
                                    </AvatarGroup>

                                </CardAvatar>
                            </Grid>
                        }

                        {
                            !isEmpty(syncperformance) &&
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
                                                            <TimelineIcon fontSize="xxx-large" />
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
                                                                Total Sync in Meeting: {MeetingDisplay.totalAvg}%
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
                        }
                    </Grid>

                    {
                        !isEmpty(syncperformance) && !isEmpty(MeetingDisplay) &&
                        <Card>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Grid container alignContent="center" justifyContent="space-between" alignItems='center'>
                                            <Grid item>
                                                <Typography variant="h6" style={{ color: theme.palette.primary[800], fontWeight: 'bold' }}>{!isEmpty(MeetingDisplay) ? dateFormat(MeetingDisplay.dateEnd) : ''} Meeting Syncs</Typography>
                                            </Grid>
                                            <Grid item>
                                                <MoreHorizOutlinedIcon
                                                    fontSize="xxx-large"
                                                    sx={{
                                                        color: theme.palette.primary[800],
                                                        cursor: 'pointer',
                                                        fontSize: 'xxx-large'
                                                    }}
                                                    aria-controls="menu-popular-card"
                                                    aria-haspopup="true"
                                                    onClick={handleClick}
                                                />
                                                <Menu
                                                    id="menu-popular-card"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                    variant="selectedMenu"
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right'
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right'
                                                    }}
                                                >
                                                    {top5.map((el, i) => {
                                                        return (
                                                            <MenuItem value={i} key={`${el.dateEnd}`} onClick={() => onSetActivity(el, i)}>{dateFormat(el.dateEnd)}</MenuItem>
                                                        )
                                                    })}
                                                </Menu>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                        {
                                            !isEmpty(syncperformance) && !isEmpty(MeetingDisplay) &&
                                            <AreaActivities MeetingDisplay={MeetingDisplay} />
                                            // <PurpleChartCard time={activityDisplay.activity} totalSync={Math.trunc(avgDisplay.avg * 100)} syncs={activityDisplay.result} />
                                        }
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    }

                </Container>
            </Box>


            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#fff" fillOpacity="1" d="M0,128L40,133.3C80,139,160,149,240,154.7C320,160,400,160,480,149.3C560,139,640,117,720,112C800,107,880,117,960,144C1040,171,1120,213,1200,213.3C1280,213,1360,171,1400,149.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
            </svg>

        </>
    );
}

export default TraineeHome;