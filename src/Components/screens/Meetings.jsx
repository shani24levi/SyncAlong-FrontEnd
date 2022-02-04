import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@material-ui/core';
import MeetingItemCard from '../meeting/MeetingItemCard';
import { useSelector } from 'react-redux';


function Meetings(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(state => state.auth.user)

    let meetings = [ //meeting is set form db 
        {
            _id: '1',
            tariner: {
                "_id": '61f41299f214dbc605e23778',
                "user": 'shani-trainer',
                "role": "trainer"
            },
            trainee: {
                "_id": '61f7a56542f3e116d721a7c6',
                "user": "grma-trainee of shani",
                "role": "trainee"
            },
            date: Date.now(),
            time: '1:2 am',
            activities: ['legs', 'nees'],
        },
    ]

    const handleConect = (meeting) => {
        console.log('whats to conect to meeting of id ', meeting._id);
        //chack chanck when it ok 
        // let know the socket the one participant has conected to the meeting 
        //send to my user-friend in the meeting this massge
        let roomId = meeting._id;
        let from = user._id;
        let to = meeting.tariner._id !== user._id ? meeting.tariner._id : meeting.trainee._id;

        // props.socket?.emit("joinUser", from, to, roomId);
        // props.socket?.on("getUsers", usesr => console.log(usesr))

        props.socket?.emit("joinUser", from, to, roomId, users => {
            console.log('getUsers', users);
        });
        props.socket?.off("joinUser");
        navigate('/video-room', { state: { my_id: 1, meeting: meeting } });
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