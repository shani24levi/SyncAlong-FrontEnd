import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { dateFormat } from '../../../../Utils/dateFormat';

const LinkStyled = styled('div')`
text-decoration: none,
cursor: pointer;
background-color: #161d35 !important;
padding: 5%;
color: #dcdcdc;
margin-bottom: 3px !important;
border: none !important;
-webkit-transition: all .2s ease-in;
-moz-transition: all .2s ease-in;
-o-transition: all .2s ease-in;
transition: all .2s ease-in;

&:hover {
    background-color: #222b4a !important;
    transform: scale(1.03);
    -webkit-transition-duration:  0.15s;
    -moz-transition-duration:  0.15s;
    -o-transition-duration:  0.15s;
    transition-duration:  0.15s;
    box-shadow: 0 2px 0 #e14eca;
    border-radius: 5px;
}
.video-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
}

.media-heading-channel-title {
    color: #52629D;
    font-weight: bold;
}

.media-heading-channel-date {
    color: rgba(255, 255, 255, 0.5);
}
`;


function VideoListItem({ video }) {
    //console.log(video);
    return (
        <LinkStyled>
            <Link to={{ pathname: `/meeting/watch/${video._id}` }} style={{ textDecoration: 'none' }}>
                <div className="video-list media">
                    <div className="media-body">
                        <div className="media-heading">
                            Participents : {" "}
                            {video.tariner.user} {" & "}
                            {video.trainee.user}
                        </div>
                        <div className="media-heading-channel-title">
                            Meeting Title: {" "}
                            {video.title}
                        </div>
                        <div className="media-heading-channel-date">
                            Priformed at : {" "}
                            {dateFormat(video.date)}
                        </div>
                    </div>
                </div>
            </Link>
        </LinkStyled>
    );
}

export default VideoListItem;