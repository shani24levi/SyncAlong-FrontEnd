import React, { useState } from 'react';
import { Container, Box, Grid, Button } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import VideoGrid from './styles.meeting.sorce/VideoGrid';
import VideoCard from './VideoCard';
import SearchAnimation from '../../search/SearchAnimation';
import componentStyles from "../../../assets/theme/buttons";
const useStyles = makeStyles(componentStyles);

function MeetingsScours({ meetings }) {
    const classesBtn = useStyles();
    const [search, setSearch] = React.useState('');

    const onSearch = (search) => {
        console.log(search);
        setSearch(search.toLowerCase());
    };

    console.log(meetings);
    const meetings_filtered = meetings.filter(i => i?.time.toString().toLowerCase().includes(search) || i.trainee.user.toString().toLowerCase().includes(search));
    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}>
                <Grid container justifyContent='space-between'>
                    <SearchAnimation onSearch={onSearch} />
                    <Button onClick={() => { console.log('s') }} className={classesBtn.blueRound}> Filter by user</Button>
                    <Button onClick={() => { console.log('s') }} className={classesBtn.blueRound}> Filter by date</Button>
                </Grid>
            </Box>

            <VideoGrid>
                {meetings
                    ? meetings_filtered.map((m) => <VideoCard key={m._id} video={m} />)
                    : null}
            </VideoGrid>
        </Container>
    );
}

export default MeetingsScours;