import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Container } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Loader from '../../../loder/Loder';
import { dateFormat } from '../../../../Utils/dateFormat';
import { capitalize } from '../../../../helpers';
import PurpleChartCard from '../../../charts/PurpleChartCard';
import SyncView from '../../../syncscore/SyncView';
import isEmpty from '../../../../validation/isEmpty';



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

function VideoDetail({ video, syncs }) {
    const user = useSelector(state => state.auth.user);

    return (
        <>
            <Grid item xs={12} md={8} lg={8}>
                {video.urlRoom === "Processing"
                    ? <Loader />
                    :
                    <Ifram>
                        <video controls className="responsive-iframe" src={video.urlRoom} ></video>
                    </Ifram>
                }
                <Details >
                    <div className="details-title">
                        {` Meeting Name:  ${capitalize(video.title)}`}
                    </div>
                    <div className="details-channel-title">
                        {`Participants : You & ${user.role === 'trainer' ? capitalize(video.trainee.user) : capitalize(video.tariner.user)}`}
                    </div>
                    <div>
                        {`Meeting Ended At: ${dateFormat(video.dateEnd)}`}
                    </div>
                </Details>

                <Grid item xs={12} md={12} sx={{ pt: '16px !important' }}>
                    {
                        !isEmpty(syncs)
                            ? <SyncView selectedVideo={video} syncs={syncs} />
                            : <Loader />
                    }

                    {/* <SyncView selectedVideo={video} syncs={syncs} /> */}
                    {/* <PurpleChartCard time={dateFormat(video.date)} totalSync={'37'} syncs={syncs} /> */}
                </Grid>

            </Grid>
        </>
    );
}

export default VideoDetail;