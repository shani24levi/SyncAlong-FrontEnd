import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { Grid, Container } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from '../../validation/isEmpty';


const useStyles = makeStyles({
    root: {
        padding: "70px 0",
        position: "relative",
        overflow: "hidden"
    },
});

//Trainer will have his data , graph and lists

function TrainerHome(props) {
    const { traineeEntered } = useContext(SocketContext);
    const classes = useStyles();
    const theme = useTheme();
    const profile = useSelector(state => state.profile.profile)
    const [alart, setAlart] = useState(false);

    useEffect(() => {
        if (isEmpty(profile))
            return setAlart(true);
    }, []);

    return (
        <Container maxWidth="xl">
            <Grid className={classes.root} id="basic-elements">
                {/* <img
                alt="..."
                className="path"
                src={require("../../assets/img/path1.png").default}
            /> */}
                {/* code here! */}
                {
                    alart && <Alert severity="error">You have no profile for this accoun - please set acoount</Alert>
                }
            </Grid>
        </Container>

    );
}

export default TrainerHome;