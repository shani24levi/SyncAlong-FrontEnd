import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import componentStyles from "../../assets/theme/buttons";
const homeStayle = makeStyles(componentStyles);

function QuickStartBtn(props) {
    const classes = homeStayle();
    return (
        <Button
            color='primary'
            variant="contained"
            startIcon={<VideoCameraFrontIcon />}
            className={classes.purpleRoundEmpty}
            fullWidth>
            Quick Start
        </Button>
    );
}

export default QuickStartBtn;