import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSync } from '../../../Store/actions/syncActions'
import { getAllMeetings } from '../../../Store/actions/meetingActions';
import { Grid, Container } from '@material-ui/core';
import SearchBar from '../../search/SearchBar';
import VideoDetail from './contents/VideoDetail';
import VideoList from './contents/VideoList';
import Loader from '../../loder/Loder';
import isEmpty from '../../../validation/isEmpty';
// import PurpleChartCard from '../../charts/PurpleChartCard';
import SyncView from '../../syncscore/SyncView';

function WatchMeeting() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const meetings = useSelector(state => state.meetings.meetings_complited);
    let syncs = useSelector((state) => state.syncs?.all_syncs);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        if (id && isEmpty(meetings)) {
            dispatch(getAllMeetings());
        }
        else return <>error</>;
    }, [])

    useEffect(() => {
        if (id && !isEmpty(meetings)) {
            dispatch(getSync(id));
            let meeting = meetings.find(el => el._id === id);
            if (meeting) setSelectedVideo(meeting)
            else return <>error</>
        }
        else return <>error</>;
    }, [meetings, id])

    const videoSearch = () => {

    }

    return (
        <Container>
            <SearchBar onSearchTermChange={videoSearch} />
            <Grid container spacing={3}>
                {
                    !selectedVideo ?
                        <Loader />
                        :
                        <VideoDetail video={selectedVideo} syncs={syncs} />
                }
                <VideoList
                    onVideoSelect={selectedVideo => setSelectedVideo({ selectedVideo })}
                    videos={meetings} />
                {/* ? meetings.slice(0, 4) : null} />            */}
            </Grid>

            {/* {
                !isEmpty(syncs)
                    ? <SyncView selectedVideo={selectedVideo} syncs={syncs} />
                    : <Loader />
            } */}
        </Container>
    );
}

export default WatchMeeting;