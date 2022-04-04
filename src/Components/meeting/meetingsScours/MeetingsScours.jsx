import { Container } from '@mui/material';
import React from 'react';
import VideoGrid from './styles.meeting.sorce/VideoGrid';
import VideoCard from './styles.meeting.sorce/VideoCard';

function MeetingsScours({ meetings }) {
    console.log('====================================');
    console.log(meetings);
    console.log('====================================');
    return (
        <Container maxWidth="xl">
            <VideoGrid>
                {meetings
                    ? meetings.map((m) => <VideoCard key={m._id} video={m?.video} />)
                    : null}
            </VideoGrid>
        </Container>
    );
}

export default MeetingsScours;