import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        padding: "70px 0",
        position: "relative",
        overflow: "hidden"
    },
});

//Trainer will have his data , graph and lists

function TrainerHome(props) {
    const classes = useStyles(props);

    return (
        <Grid className={classes.root} id="basic-elements">
            <img
                alt="..."
                className="path"
                src={require("../../assets/img/path1.png").default}
            />
            {/* code here! */}
        </Grid>

    );
}

export default TrainerHome;