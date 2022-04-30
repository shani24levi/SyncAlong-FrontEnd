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

function VideoCard({ video }) {
  const user = useSelector(state => state.auth.user)

  return (
    <Wrapper>
      <Link to={`/meeting/watch/${video._id}`}>
        <img className="thumb" src={'https://www.irganim.com/images/itempics/165_large.jpg'} alt={video.title} />
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