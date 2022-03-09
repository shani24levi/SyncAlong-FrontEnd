import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import "./style.css";

function FunQuestionPopUp({ name = 'YPOU' }) {
    return (
        <>
            <div>
                <div className="stars-01"></div>
                <div className="stars-02"></div>
                <div className="stars-03"></div>
                <div className="stars-04"></div>
            </div>

            <div className="text">
                {/* <Grid container>
                    <Grid item>
                        <span>{name}, </span>
                        <span>ARE </span>
                        <span>YOU </span>
                        <span>READY </span>
                        <span> ?</span>
                        <span>Say OK to begin session  </span>

                    </Grid>
                    <Grid item>


                    </Grid>
                </Grid> */}
                <span>{name}, </span>
                <span>ARE </span>
                <span>YOU </span>
                <span>READY </span>
                <span> ?</span>
                <span>Say OK to begin session  </span>
            </div>
        </>
    );
}

export default FunQuestionPopUp;