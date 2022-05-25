import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Loader from '../../loder/Loder';
import isEmpty from '../../../validation/isEmpty';
import { dateFormat } from '../../../Utils/dateFormat';
import { capitalize } from '../../../helpers';
import VideoList from './contents/VideoList';

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

function VideoHeader({ videoUrl, onVideoSelect, videos }) {
    const user = useSelector(state => state.auth.user);

    return (
        <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center">

            {videoUrl &&
                <Grid item xs={12} md={12} lg={8}>
                    {videoUrl.urlRoom === "Processing"
                        ? <Loader />
                        :
                        <Ifram>
                            <video controls className="responsive-iframe" src={videoUrl.urlRoom} ></video>
                        </Ifram>
                    }
                    <Details>
                        <div className="details-title">
                            {` Meeting Name:  ${videoUrl.title ? capitalize(videoUrl.title) : ''}`}
                        </div>
                        <div className="details-channel-title">
                            {`Participants : You & ${user.role === 'trainer' ? capitalize(videoUrl.trainee.user) : capitalize(videoUrl.tariner.user)}`}
                        </div>
                        <div>
                            {`Meeting Ended At: ${videoUrl.dateEnd ? dateFormat(videoUrl.dateEnd) : ''}`}
                        </div>
                    </Details>
                </Grid>
            }
            <Grid
                component={Box}
                item
                xs={4}
                display={{ xs: "none", md: "none", lg: "block" }}
            >
                <VideoList
                    onVideoSelect={onVideoSelect}
                    videos={videos} />
            </Grid>
        </Grid>
    );
}

export default VideoHeader;