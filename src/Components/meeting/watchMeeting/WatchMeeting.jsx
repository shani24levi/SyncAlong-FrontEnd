import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Container } from '@material-ui/core';
import SearchBar from '../../search/SearchBar';
import VideoDetail from './contents/VideoDetail';
import VideoList from './contents/VideoList';
import Loader from '../../loder/Loder';
import isEmpty from '../../../validation/isEmpty';

function WatchMeeting() {
    const { id } = useParams();
    const meetings = useSelector(state => state.meetings.meetings_complited);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState(null);

    console.log('meetings', meetings);
    useEffect(() => {
        if (id && !isEmpty(meetings)) {
            let meeting = meetings.find(el => el._id === id);
            if (meeting) setSelectedVideo(meeting)
            else return <>error</>
        }
        else return <>error</>;
    }, [])

    const videoSearch = () => {

    }
    console.log('selectedVideo', selectedVideo, id);

    return (
        <Container>
            <SearchBar onSearchTermChange={videoSearch} />
            <Grid container spacing={3}>
                {
                    !selectedVideo ?
                        <Loader />
                        :
                        <VideoDetail video={selectedVideo} />
                }
                <VideoList
                    onVideoSelect={selectedVideo => setSelectedVideo({ selectedVideo })}
                    videos={meetings} />
            </Grid>
        </Container>
    );
}

export default WatchMeeting;