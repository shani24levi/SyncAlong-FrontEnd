import React, { useContext, useState, useEffect, useRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import commponents
import VideoContext from '../Context/videoChat/VideoContext';
import Sidebar from '../Context/videoChat/Sidebar';
import Notifications from '../Context/videoChat/Notifications';

function VidoeRoom({ socket }) {
    const { setMySocketId, setYourSocketId, setMyName, setYourName } = useContext(SocketContext);
    const [me, setMe] = useState(null);
    const [you, setYou] = useState(null);

    const location = useLocation();
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        if (!user) return;

        if (user?._id === location.state.meeting.tariner._id) {
            setMe(location.state.meeting.tariner);
            setYou(location.state.meeting.trainee);
            console.log('me trainer');
        }
        else {
            setMe(location.state.meeting.trainee);
            setYou(location.state.meeting.tariner);
            console.log('me traineee');
        }
    }, []);

    useEffect(() => {
        if (!me && !you && !socket) return;
        //set elemets to pather of context
        me && setMyName(me?.user);
        you && setYourName(you?.user);
        //get my socket id
        //console.log(me?._id, you?._id);
        socket?.emit("getSocketId", me?._id, user => {
            console.log('getSocketId', me?._id, user);
            setMySocketId(user?.socketId)
        });
        //get your socket id
        socket?.emit("getSocketId", you?._id, user => {
            console.log('getSocketId', you?._id, user);
            setYourSocketId(user?.socketId)
        });
    }, [me, you]);

    return (
        <>
            <VideoContext />
            <Sidebar>
                <Notifications />
            </Sidebar>
        </>
    );
}

export default VidoeRoom;