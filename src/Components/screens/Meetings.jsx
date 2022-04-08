import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@material-ui/core';
import MeetingItemCard from '../meeting/MeetingItemCard';
import ScrollTop from '../scrollToTop/ScrollTop';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import NotFoundCard from '../card/NotFoundCard';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Box, textAlign } from '@mui/system';
import MeetingsScours from '../meeting/meetingsScours/MeetingsScours';
import isEmpty from '../../validation/isEmpty';

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 140px;
  div {
    margin-top: 24px;
    margin-bottom: 24px;
    text-align: center;
  }
  svg {
    height: 120px;
    width: 120px;
  }
`;


function Meetings(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(state => state.auth.user)
    const meetings = useSelector(state => state.meetings)
    //const [myMeetings, setMyMeetings] = useState(null);

    // let meetings = [ //meeting is set form db 
    //     {
    //         _id: '1',
    //         tariner: {
    //             "_id": '61f41299f214dbc605e23778',
    //             "user": 'shani-trainer',
    //             "role": "trainer"
    //         },
    //         trainee: {
    //             "_id": '6214b44405ebc47e36303a6b',
    //             "user": "grma-trainee of shani",
    //             "role": "trainee"
    //         },
    //         date: Date.now(),
    //         time: '1:2 am',
    //         activities: ['hands-x', 'hands-y', 'swing-hands', 'swim-hands',
    //             'gamp', 'legs-gumping', 'open-close'],
    //         video: "https://www.youtube.com/watch?v=0T75yyeotrU"
    //     },
    // ]

    // useEffect(() => {
    //     if (!meetings.all_meetings || isEmpty(meetings.all_meetings)) {
    //         dispatch(getAllMeetings());
    //     }
    // }, [])


    // useEffect(() => {
    //     setMyMeetings(meetings.all_meetings)
    // }, [meetings.all_meetings])

    const handleConect = (meeting) => {
        console.log('whats to conect to meeting of id ', meeting._id);
        //chack chanck when it ok 
        // let know the socket the one participant has conected to the meeting 
        //send to my user-friend in the meeting this massge
        let roomId = meeting._id;
        let from = user._id;
        let to = meeting.tariner._id !== user._id ? meeting.tariner._id : meeting.trainee._id;

        props.socket?.emit("joinUser", from, to, roomId, users => {
            console.log('getUsers', users);
        });
        props.socket?.off("joinUser");
        navigate('/video-room', { state: { my_id: 1, meeting: meeting } });
    }

    return (
        <Container fixed>
            <div id="back-to-top-anchor" />
            {
                !meetings.meetings_complited ?
                    <Box m="auto"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        minHeight="100px"
                        marginTop="160px"
                        marginBottom="160px"
                    >
                        <OndemandVideoIcon style={{ height: '120px', width: '120px' }} />
                        <Typography variant='h2'>{"No Meeting Complited"}</Typography>
                        <Typography variant='h6'>{"Start with a sport activity .... "}</Typography>
                    </Box>
                    :
                    <MeetingsScours meetings={meetings.meetings_complited} />
            }

            {/* <Grid container spacing={5} justifyContent='center'>
                {
                    meetings.map((meeting, i) => {
                        return (
                            <Grid key={i} item m="auto">
                                <MeetingItemCard meeting={meeting} handleConect={handleConect} />
                            </Grid>
                        )
                    })
                }
            </Grid> */}
            <ScrollTop />
        </Container>
    );
}

export default Meetings;