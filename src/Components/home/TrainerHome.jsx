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
function TrainerHome({ upcamingMeeting }) {
    const { traineeEntered } = useContext(SocketContext);
    const classes = useStyles();
    const btnClasses = buttonStyle();
    const theme = useTheme();
    const profile = useSelector(state => state.profile.profile)
    const [alart, setAlart] = useState(false);

    // let i = 1;
    // function myLoop() {         //  create a loop function
    //     setTimeout(function () {   //  call a 3s setTimeout when the loop is called
    //         console.log('hello', new Date().toLocaleString());   //  your code here
    //         i++;                    //  increment the counter
    //         if (i < 10) {           //  if the counter < 10, call the loop function
    //             myLoop();             //  ..  again which will trigger another 
    //         }                       //  ..  setTimeout()
    //     }, 3000)
    // }


    // useEffect(async () => {
    //     // myLoop()
    //     console.log(isEmpty(profile));
    //     if (isEmpty(profile)) setAlart(true);
    // }, [profile]);

    return (
        <>
            <img
                alt="..."
                className={classes.imgBackground}
                src={require("../../assets/img/path1.png").default}
            />

            <Container maxWidth="xl">
                <Box sx={{ justifyContent: 'center' }}>
                    <Grid container alignItems='center' alignContent='center' spacing={2}>
                        <Grid item xs={4} md={2}>
                            <QuickStartBtn />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Search />
                        </Grid>

                        <Grid item xs={12} md={12}> <StartCard title={'title'} subtitle={'subtitle'} /> </Grid>
                        <Grid item xs={12} md={12}>
                            <CardContiner title="Your up caming meeting" >
                                <NextMeetingTime upcamingMeeting={upcamingMeeting} />
                            </CardContiner>
                        </Grid>
                    </Grid>
                </Box>


                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <ListBoxTop />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card sx={{ px: 3, py: 2, mb: 3 }}>
                            <Title>your sessions</Title>
                            <SubTitle>Last 30 days</SubTitle>
                            <DoughnutChart
                                // data={data}
                                height="300px"
                            />
                        </Card>
                        <ProgressUserView />
                        {/* <UpgradeCard />
                        <Campaigns /> */}
                    </Grid>

                </Grid>


                <Grid className={classes.root} id="basic-elements">
                    <NextMeetingTime upcamingMeeting={upcamingMeeting} />
                    {/* code here! */}
                    {
                        alart && <Alert severity="error">You have no profile for this accoun - please set acoount</Alert>
                    }
                </Grid>
            </Container>
        </>

    );
}

export default TrainerHome;