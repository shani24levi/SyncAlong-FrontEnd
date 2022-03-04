import React from 'react';
import { Grid, Container, Button, makeStyles } from '@material-ui/core';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

import componentStyles from "../../assets/material-ui-style/componenets/home";
const homeStayle = makeStyles(componentStyles);

function QuickStartBtn(props) {
    const classes = homeStayle();

    return (
        <Button
            color='primary'
            variant="contained"
            startIcon={<VideoCameraFrontIcon />}
            className={classes.QuickStartBtn}
            fullWidth>
            Quick Start
        </Button>
    );
}

export default QuickStartBtn;