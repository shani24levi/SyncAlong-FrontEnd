import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Loader from '../../../loder/Loder';

const Ifram = styled('div')`
position: relative;
width: 100%;
overflow: hidden;
padding-top: 56.25%; /* 16:9 Aspect Ratio */

.responsive-iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const Details = styled('div')`
margin-top: 10px;
margin-bottom: 30px;
padding: 10px;
border: 1px solid #dddddd1f;
color: rgba(255, 255, 255, 0.5) !important;
animation-name: details;
animation-duration: 2s;

@keyframes details {
    0%, 50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.details-channel-title {
    color: #52629D;
    font-weight: bold;
    font-size: 20px;
}
.details-title {
    color: #dcdcdc;
}
`;

function VideoDetail({ video }) {
    console.log('====================================');
    console.log('video.urlRoom', video.urlRoom);
    console.log('====================================');

    return (
        <Grid item xs={12} md={8}>
            {video.urlRoom === "Processing"
                ? <Loader />
                :
                <Ifram>
                    <video controls className="responsive-iframe" src={video.urlRoom} ></video>
                </Ifram>
            }
            <Details >
                <div className="details-title">
                    {video.title}
                </div>
                <div className="details-channel-title">
                    {video.title}
                </div>
                <div>
                    {video.date}
                </div>
            </Details>
        </Grid>
    );
}

export default VideoDetail;