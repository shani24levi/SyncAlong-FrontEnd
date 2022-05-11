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
    // const [trainer, setTrainer] = useState({});

    // useEffect(() => {
    //     if (!isEmpty(profile) && isEmpty(trainer)) {
    //         setTrainer(profile.traineeOf?.user);
    //     }
    // }, [profile])



    // console.log('====================================');
    // console.log(callTrainee);
    // console.log('====================================');

    useEffect(async () => {
        if (updateMeetingAlrt) {
            await delay(10000);
            setUpdateMeetingAlrt(false);
        }
    }, [updateMeetingAlrt])

    return (
        <>
            <HeaderWaves meeting={meeting} date={date} upcamingMeeting={upcamingMeeting} />
            {callTrainee && <PopUpCall />}
            {!isEmpty(callQuickMeeting) && <PopUpCallQuickMeeting currMeeting={callQuickMeeting} />}
            {updateMeetingAlrt && <WorningAlert title={`Up Coming Meeting is updating by ${profile.traineeOf?.user}`} />}
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
                                                    <TableChartOutlinedIcon width={34} height={34} />
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
                                                        $203k
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                                                        Total Income
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
                                                    <TableChartOutlinedIcon width={34} height={34} />
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
                                                        $203k
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                                                        Total Income
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
                                    <Avatar alt="you" src={user.avatar} className={classes.middle} />
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
                                                        <TableChartOutlinedIcon width={34} height={34} />
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
                                                            $203k
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                                                            Total Income
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