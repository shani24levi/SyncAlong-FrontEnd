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
import VideoHeader from './VideoHeader';

function WatchMeeting() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const meetings = useSelector(state => state.meetings.meetings_complited);
    let syncs = useSelector((state) => state.syncs?.all_syncs);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [sync, setSync] = useState(null);
    const [search, setSearch] = React.useState('');

    useEffect(() => {
        if (id && isEmpty(meetings)) {
            dispatch(getAllMeetings());
        }
        else return <>error</>;
    }, [])

    useEffect(() => {
        if (!isEmpty(syncs)) {
            if (syncs[0].meeting_id._id !== id)
                dispatch(getSync(id));
            else if (syncs[0].meeting_id._id === id)
                setSync(syncs)
        }
        else dispatch(getSync(id));
    }, [syncs])


    useEffect(() => {
        if (id && !isEmpty(meetings)) {
            let meeting = meetings.find(el => el._id === id);
            if (meeting) setSelectedVideo(meeting)
            else return <>error</>
        }
        else return <>error</>;
    }, [meetings, id])

    const onSearch = (search) => {
        setSearch(search.toLowerCase());
    };

    let meetings_filtered = meetings;
    if (!isEmpty(meetings_filtered))
        meetings_filtered = meetings.filter(i => i?.title?.toString().toLowerCase().includes(search) || i.trainee.user.toString().toLowerCase().includes(search));

    console.log('====================================');
    console.log('selectedVideo', selectedVideo);
    console.log('====================================');
    return (
        <Container>
            <SearchBar onSearch={onSearch} />
            <Grid container spacing={3}>
                {
                    !selectedVideo && !isEmpty(sync) && syncs[0].meeting_id._id === id ?
                        <Loader />
                        :
                        <>
                            <VideoHeader videoUrl={selectedVideo}
                                onVideoSelect={selectedVideo => setSelectedVideo({ selectedVideo })}
                                videos={meetings_filtered ? meetings_filtered.slice(0, 4) : null}
                            />
                            <VideoDetail video={selectedVideo} syncs={sync} />
                        </>
                }
                {/* <VideoList
                    onVideoSelect={selectedVideo => setSelectedVideo({ selectedVideo })}
                    videos={meetings_filtered ? meetings_filtered.slice(0, 5) : null} /> */}
            </Grid>
        </Container>
    );
}

export default WatchMeeting;