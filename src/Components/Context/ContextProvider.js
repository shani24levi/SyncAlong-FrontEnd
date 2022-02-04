import React, { createContext, useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';

{/* 
    ContextProvider Component is responsible for holding the calls required to support 
    when connecting with users such as: 
    connection, disconnection, information transfer between users.
    set pose lib ....
*/}

const SocketContext = createContext();

function ContextProvider({ children, socket }) {
    const [me2, setMe] = useState('hello');
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [myName, setMyName] = useState('');
    const [yourName, setYourName] = useState('');
    const [call, setCall] = useState({});
    // const [posesArry, setPosesArry] = useState([]);
    const [mySocketId, setMySocketId] = useState(null);
    const [yourSocketId, setYourSocketId] = useState(null);
    const [isConnectedFriend, setIsConnectedFriend] = useState(true);


    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const connect = window.drawConnectors;
    var camera = null;
    const myCanvasRef = useRef();
    const userCanvasRef = useRef();

    useEffect(() => {
        //lisining for caming calls from users
        socket?.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);

    useEffect(() => {
        if (myVideo.current) myVideo.current.srcObject = stream;
        //setHolistic(myVideo);
    }, [stream]);

    useEffect(() => {
        if (!yourSocketId) setIsConnectedFriend(true);
        else setIsConnectedFriend(false);
    }, [yourSocketId]);


    const answerCall = () => {

    }
    const callUser = () => {
        if (!isConnectedFriend) { //sec user has no socketId - cant do connection
            return;
        }

        // i need to call your socket id 
        const peer = new Peer({ initiator: true, trickle: false, stream });

        console.time("timer2-callUser");
        peer.on('signal', (data) => {
            // console.log('signal', data);
            socket.emit('callUser', { userToCall: yourSocketId, signalData: data, from: mySocketId, myName });
            console.timeEnd("timer2-callUser");
        });

        console.time("timer2-stream");
        var start = new Date();
        peer.on('stream', (currentStream) => {
            console.timeEnd("timer2-stream");
            console.log('Request took:', (new Date() - start) / 1000, 'sec');
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    }
    const leaveCall = () => { }

    return (
        <SocketContext.Provider value={{
            me2,
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            setMySocketId,
            setYourSocketId,
            setStream,
            myName,
            yourName,
            setMyName,
            setYourName,
            callEnded,
            mySocketId,
            yourSocketId,
            callUser,
            leaveCall,
            answerCall,
            myCanvasRef,
            userCanvasRef,
            socket
        }}
        >
            {children}
        </SocketContext.Provider>
    );
}
export { ContextProvider, SocketContext };

