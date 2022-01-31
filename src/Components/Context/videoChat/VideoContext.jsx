import React, { useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { URL } from '../../../Utils/globalVaribals';
import { connect, useDispatch } from 'react-redux';
import Card from '../../card/Card';
import { Container, Grid } from '@material-ui/core';
//import { SocketContext } from '../ContextProvider';
//const SocketContext = createContext();

//room view
const VideoContext = (props) => {
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

    return (
        <>
            Our Video Chat Room
        </>
    );
}

export default VideoContext;