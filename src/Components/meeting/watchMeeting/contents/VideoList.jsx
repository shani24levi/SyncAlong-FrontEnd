import React from 'react';
import { Box, Grid } from '@material-ui/core';
import VideoListItem from './VideoListItem';
import { Typography } from '@mui/material';


function VideoList({ videos }) {
    return (
        <Grid item >
            <Typography
                variant="h5"
                sx={{ fontWeight: 700, flexGrow: 1, color: '#f5f5f5' }}>
                More Activities
            </Typography>
            {
                videos && videos.map((meeting, i) => {
                    return <VideoListItem key={i} video={meeting} />
                })
            }
        </Grid>
    );
}

export default VideoList;