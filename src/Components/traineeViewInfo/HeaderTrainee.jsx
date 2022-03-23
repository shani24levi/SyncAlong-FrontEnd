import { Button } from '@material-ui/core';
import React from 'react';
import "./style.css";


function HeaderTrainee({ trainee }) {
    return (
        <div className="page-heading">
            <div className="media clearfix">
                <div className="media-left pr30">
                    <a href="#">
                        <img className="media-object mw150" src={trainee.user.avatar} alt="..." />
                    </a>
                </div>
                <div className="media-body va-m">
                    <h2 className="media-heading">{trainee.user.user}
                        <small> - Summary of Activities</small>
                    </h2>
                    <p className="lead">{trainee.user.email}</p>
                </div>
                <Button> + </Button>
                <Button> Profile  </Button>
            </div>
        </div>
    );
}

export default HeaderTrainee;