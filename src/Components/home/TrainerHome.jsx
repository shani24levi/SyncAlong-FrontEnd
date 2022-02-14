import React, { useContext, useEffect, useState, useRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { Grid, Container } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import NextMeetingTime from '../meeting/NextMeetingTime';
import Timer from '../Context/videoChat/timer/Timer';
import { delay } from '../../helpers';


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


//Trainer will have his data , graph and lists
function TrainerHome(props) {
    const { traineeEntered } = useContext(SocketContext);
    const classes = useStyles();
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


    useEffect(async () => {
        // myLoop()
        if (isEmpty(profile))
            return setAlart(true);
    }, []);

    return (
        <>
            <img
                alt="..."
                className={classes.imgBackground}
                src={require("../../assets/img/path1.png").default}
            />

            <Container maxWidth="xl">
                <Grid className={classes.root} id="basic-elements">
                    <NextMeetingTime />
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