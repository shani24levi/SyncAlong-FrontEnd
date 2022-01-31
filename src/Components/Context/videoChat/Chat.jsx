//view of chat(meeting) settings :room name, id... 
//time ,date and activity will be handled layter....

import React, { useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { URL } from '../../../Utils/globalVaribals';
import { connect, useDispatch } from 'react-redux';
import Card from '../../card/Card';
import { Container, Grid } from '@material-ui/core';
//import { SocketContext } from '../ContextProvider';
//const SocketContext = createContext();

function Chat(props) {
    // const { me, socket } = useContext(SocketContext);

    // const socket = useRef();

    // useEffect(() => {
    //     //conect only one time when open this page
    //     socket.current = io(`${URL}`);
    //     console.log('socket conected', socket.current);
    // }, []);

    // useEffect(() => {
    //     console.log(props.user._id);
    //     socket.current.emit("addUser", props.user._id, 'room_id');
    //     socket.current.on("getUsers", usesr => console.log(usesr))
    // }, [props.user]);

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

    return (
        <>
            <Container fixed>
                <Grid container spacing={5} justifyContent='center'>
                    {
                        meetings.map((meeting, i) => {
                            return (
                                <Grid key={i} item m="auto">
                                    <Card />
                                    {/* <MeetingItem /> */}
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </>
    );
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        user: state.auth.user,
        loading: state.auth.loading,
    };
}
//export default Chat;
export default connect(mapStateToProps)(Chat);