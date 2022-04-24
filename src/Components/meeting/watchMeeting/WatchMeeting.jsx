import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMeetings } from '../../../Store/actions/meetingActions';
import { Grid, Container } from '@material-ui/core';
import SearchBar from '../../search/SearchBar';
import VideoDetail from './contents/VideoDetail';
import VideoList from './contents/VideoList';
import Loader from '../../loder/Loder';
import isEmpty from '../../../validation/isEmpty';
import PurpleChartCard from '../../charts/PurpleChartCard';

function WatchMeeting() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const meetings = useSelector(state => state.meetings.meetings_complited);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState(null);

    //console.log('meetings', meetings);
    useEffect(() => {
        if (id && isEmpty(meetings)) {
            dispatch(getAllMeetings());
        }
        else return <>error</>;
    }, [])

    useEffect(() => {
        if (id && !isEmpty(meetings)) {
            let meeting = meetings.find(el => el._id === id);
            if (meeting) setSelectedVideo(meeting)
            else return <>error</>
        }
        else return <>error</>;
    }, [meetings, id])


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
                    videos={meetings ? meetings.slice(0, 4) : null} />
            </Grid>

            <PurpleChartCard time={(selectedVideo?.date)} totalSync={'37'} />
        </Container>
    );
}

export default WatchMeeting;