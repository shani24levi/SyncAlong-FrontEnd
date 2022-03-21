import React from 'react';
import { Grid, Container, Button, makeStyles } from '@material-ui/core';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import "./style.css";

// import componentStyles from "../../assets/theme/buttons";
// const homeStayle = makeStyles(componentStyles);

function QuickStartBtn2(props) {
    // const classes = homeStayle();

    return (
        <div>
            <div className="bg"></div>
            {/* <div class="button"><a href="#"><i class="fa fa-chevron-down" aria-hidden="true"></i></a></div> */}
            <Button
                color='primary'
                startIcon={<VideoCameraFrontIcon />}
                className="button"
            >
            </Button>
        </div>
    );
}

export default QuickStartBtn2;