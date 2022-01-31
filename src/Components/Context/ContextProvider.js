{/* 
    ContextProvider Component is responsible for holding the calls required to support 
    when connecting with users such as: 
    connection, disconnection, information transfer between users.
*/}

import React, { createContext, useState, useRef, forwardRef, useEffect } from 'react';
import { io } from 'socket.io-client';
//import Peer from 'simple-peer';
import { URL } from '../../Utils/globalVaribals';
import { connect } from 'react-redux';

const SocketContext = createContext();
const socket = io(`${URL}`);
console.log(socket);

function ContextProvider({ children }) {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [you, setYou] = useState('');
    const [posesArry, setPosesArry] = useState([]);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    // const connect = window.drawConnectors;
    var camera = null;
    const myCanvasRef = useRef();
    const userCanvasRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
                console.log(currentStream);
                //setHolistic(myVideo);
            });
        socket.emit("me", ' props.user._id');
        socket.on("mySocketId", (id) => setMe(id));

        //option to enter a room and call now for a frend ... send him a req with his socket id...'
        //he has one when ever his concted to the system

        // socket.on('callUser', ({ from, name: callerName, signal }) => {
        //   setCall({ isReceivingCall: true, from, name: callerName, signal });
        // });
    }, []);

    return (
        // <></>
        <SocketContext.Provider value={{
            myVideo,
            userVideo,
            stream,
            me,
        }}
        >
            {children}
        </SocketContext.Provider>
    );
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        profile: state.profile,
        meetings: state.meetings,
    };
}
//export default connect(mapStateToProps)(ContextProvider);
export { ContextProvider, SocketContext };

