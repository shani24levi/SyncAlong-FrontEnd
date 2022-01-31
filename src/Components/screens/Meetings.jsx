import React, { useContext, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@material-ui/core';
import MeetingItemCard from '../meeting/MeetingItemCard';

function Meetings(props) {
    const navigate = useNavigate()

    let meetings = [
        {
            _id: '1',
            user: '1-me',
            date: Date.now(),
            time: '1:2 am',
            partisipants: ['1-me', '2-grams'],
            activities: ['legs', 'nees'],
        },
        {
            _id: '2',
            user: '1-me',
            date: Date.now(),
            time: '1:2 am',
            partisipants: ['1-me', '2-grams'],
            activities: ['legs', 'nees'],
        },
        {
            _id: '3',
            user: '1-me',
            date: Date.now(),
            time: '1:2 am',
            partisipants: ['1-me', '2-grams'],
            activities: ['legs', 'nees'],
        }
    ]

    const handleConect = (meeting) => {
        console.log('whats to conect to meeting of id ', meeting._id);
        navigate('/video-room');
    }

    return (
        <Container fixed>
            <Grid container spacing={5} justifyContent='center'>
                {
                    meetings.map((meeting, i) => {
                        return (
                            <Grid key={i} item m="auto">
                                <MeetingItemCard meeting={meeting} handleConect={handleConect} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    );
}

export default Meetings;