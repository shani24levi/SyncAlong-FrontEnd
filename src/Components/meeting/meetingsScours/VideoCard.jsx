import React from 'react';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';

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
    top: 5px;
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
    return (
        <Wrapper>
            <Link to={`/meeting/watch/${video._id}`}>
                <img className="thumb" src={'https://www.irganim.com/images/itempics/165_large.jpg'} alt={video.title} />
            </Link>
            <div className="video-info-container">
                <div className="channel-avatar">
                    {/* {!hideAvatar && ( */}
                    <Avatar
                        style={{ marginRight: "0.8rem" }}
                        src='https://www.irganim.com/images/itempics/165_large.jpg' //{video?.user.avatar}
                        alt={`channel avatar`}
                    />
                    {/* )} */}
                </div>
                <div className="video-info">
                    <Link to={`/meeting/watch/${video._id}`}>
                        <h4 className="truncate">{video.title}</h4>
                    </Link>
                    {/* {!noUsername && (
              <Link to={`/channel/${video.user.id}`}>
                <span className="secondary">{video.user.username}</span>
              </Link>
            )} */}
                    <p className="secondary leading-4">
                        <span> views</span> <span>•</span>{" "}
                        {/* <span>{formatCreatedAt(video.createdAt)}</span> */}
                    </p>
                </div>
                {/* <DeleteVideoDropdown video={video} /> */}
            </div>
        </Wrapper>
    );
}

export default VideoCard;