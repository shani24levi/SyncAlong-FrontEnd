import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { Typography } from '@material-ui/core';
import { dateFormat } from '../../../Utils/dateFormat';

const Wrapper = styled('div')`
  .thumb {
    width: 100%;
    height: 180px;
    object-fit: cover;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .leading-4 {
    line-height: 1;
  }
  .video-info-container {
    display: flex;
    margin-top: 0.3rem;
  }
  .channel-avatar img {
    position: relative;
  }
  .video-info {
    flex: 1 1 0;
  }
  .video-info span {
    font-size: 0.9rem;
    padding-right: 0.1rem;
  }
  @media screen and (max-width: 600px) {
    .thumb {
      height: 250px;
    }
  }
  @media screen and (max-width: 420px) {
    .thumb {
      height: 200px;
    }
  }
`;

let activitiesImgs = [
  'https://www.wcrf-uk.org/wp-content/uploads/2021/05/545112030-blog-header.png',
  'https://churchviewmedicalpractice.com/images/health_images/physical-activity.jpg',
  'https://www.kreedon.com/wp-content/uploads/2018/11/physicaleducation.jpg',
  'https://www.acc.org//-/media/Non-Clinical/Images/2019/08/CARDIOLOGY/Cover-Story-Sports-1200x800.jpg',
  'https://www.datocms-assets.com/43889/1616686394-illustration-sport-zero-dechets01plan-de-travail-1.jpg',
  'https://sport-handicap-centrevaldeloire.fr/images/administration/diveriste.jpg',
]

function VideoCard({ video }) {
  const user = useSelector(state => state.auth.user)

  return (
    <Wrapper>
      <Link to={`/meeting/watch/${video._id}`}>
        <img className="thumb" src={activitiesImgs[Math.floor(Math.random() * activitiesImgs.length)]} alt={video.title} />
      </Link>
      <div className="video-info-container">
        <div className="channel-avatar">
          <Avatar
            style={{ marginRight: "0.8rem" }}
            src={user.role === 'trainer' ? video?.trainee.avatar : video?.tariner.avatar}
            alt={`channel avatar`}
          />
        </div>
        <div className="video-info">
          <Link to={`/meeting/watch/${video._id}`}>
            <h2 className="truncate">Meeting : {video.title}</h2>
            <h4 className="truncate">{dateFormat(video.dateEnd)}</h4>
          </Link>
          <Typography className="secondary leading-4">
            <span> With</span> <span>•</span>{" "}
            <span>{user.role === 'trainer' ? video?.trainee.user : video?.tariner.user}</span>
          </Typography>
        </div>
      </div>
    </Wrapper>
  );
}

export default VideoCard;