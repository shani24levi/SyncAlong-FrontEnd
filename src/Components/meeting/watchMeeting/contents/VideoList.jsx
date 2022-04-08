import React from 'react';
import { Grid } from '@material-ui/core';
import VideoListItem from './VideoListItem';
import { Typography } from '@mui/material';


function VideoList({ videos }) {
    console.log('videos', videos);
    return (
        <Grid item xs={12} md={4}>
            <Typography
                variant="h5"
                sx={{ fontWeight: 700, flexGrow: 1, color: '#f5f5f5' }}>
                More Activities
            </Typography>
            {
                videos.map((meeting, i) => {
                    return <VideoListItem key={i} video={meeting} />
                })
            }
        </Grid>
    );
}

export default VideoList;