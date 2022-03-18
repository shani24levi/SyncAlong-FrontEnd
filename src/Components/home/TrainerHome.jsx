import React, { useContext, useEffect, useState, useRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { styled } from '@mui/system'
import { Grid, Container, Button, Box, Card } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import NextMeetingTime from '../meeting/NextMeetingTime';
import { Helmet } from "react-helmet";
import Search from '../search/Search';

import buttonsStyles from "../../assets/theme/buttons";
import QuickStartBtn from './QuickStartBtn';
import StartCard from '../card/StartCard';
import ListBoxTop from '../listBox/ListBoxTop';
import DoughnutChart from '../charts/DoughnutChart';
import ProgressUserView from './trainer/ProgressUserView';
import CardContiner from '../card/CardContiner';
import CoolTextH1 from '../Context/videoChat/coolText/CoolTextH1';
import FunQuestionPopUp from '../Context/videoChat/funQuestionPopUp/FunQuestionPopUp';
import SeccsesAlert from '../alrets/SeccsesAlert';

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
});

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '0.875rem',
    //color: theme.palette.text.secondary,
}))

//Trainer will have his data , graph and lists
function TrainerHome({ meeting, date }) {
    const { scheduleMeetingPopUpCall, upcamingMeeting, traineeEntered } = useContext(SocketContext);
    const classes = useStyles();
    const btnClasses = buttonStyle();
    const theme = useTheme();
    const profile = useSelector(state => state.profile.profile)
    const [alart, setAlart] = useState(false);
    const meetings = useSelector(state => state.meetings);

    console.log('====================================');
    console.log(traineeEntered);
    console.log('====================================');

    return (
        <>
            <img
                alt="..."
                className={classes.imgBackground}
                src={require("../../assets/img/path1.png").default}
            />
            {
                traineeEntered && <SeccsesAlert title="${traineeEntered} is online" />
            }
            <Container maxWidth="xl">
                <Grid container alignItems='center' justifyContent='center' spacing={1} >
                    <Grid item xs={3} md={4}>
                        <QuickStartBtn />
                    </Grid>
                    <Grid item xs={9} md={8}>
                        <Search />
                    </Grid>
                </Grid>


                <Grid container alignItems='center' alignContent='center' spacing={2}>

                    <Grid item xs={12} md={12}> <StartCard title={'title'} subtitle={'subtitle'} /> </Grid>
                    <Grid item xs={12} md={12}>
                        <CardContiner title="Your up caming meeting" >
                            {meeting && <NextMeetingTime upcamingMeeting={upcamingMeeting} date={date} />}
                        </CardContiner>
                    </Grid>
                </Grid>


                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <ListBoxTop />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card sx={{ px: 3, py: 2, mb: 3 }}>
                            <Title>your sessions</Title>
                            <SubTitle>Last 30 days</SubTitle>
                            <DoughnutChart
                                height="300px"
                            />
                        </Card>
                        <ProgressUserView />
                        {/* <UpgradeCard />
                        <Campaigns /> */}
                    </Grid>

                </Grid>


                <Grid className={classes.root} id="basic-elements">
                    {meeting && <NextMeetingTime upcamingMeeting={upcamingMeeting} date={date} />}
                    {
                        alart && <Alert severity="error">You have no profile for this accoun - please set acoount</Alert>
                    }
                </Grid>
            </Container>
        </>

    );
}

export default TrainerHome;