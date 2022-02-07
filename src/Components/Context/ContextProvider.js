import React, { createContext, useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import { Holistic } from "@mediapipe/holistic";
import * as holistic from "@mediapipe/holistic";
import * as cam from "@mediapipe/camera_utils";
import { useSelector } from 'react-redux';
import isEmpty from '../../validation/isEmpty';

{/* 
    ContextProvider Component is responsible for holding the calls required to support 
    when connecting with users such as: 
    connection, disconnection, information transfer between users.
    set pose lib ....
*/}

const SocketContext = createContext();

function ContextProvider({ children, socket }) {
    const profile = useSelector(state => state.profile.profile);

    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [myName, setMyName] = useState('');
    const [yourName, setYourName] = useState('');
    const [call, setCall] = useState({});
    const [mySocketId, setMySocketId] = useState(null);
    const [yourSocketId, setYourSocketId] = useState(null);
    const [isConnectedFriend, setIsConnectedFriend] = useState(true);
    const [yourInfo, setYourInfo] = useState({});
    const [traineeEntered, setMyTraineeEntered] = useState(null);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const connect = window.drawConnectors;
    var camera = null;
    const myCanvasRef = useRef();
    const userCanvasRef = useRef();

    //mediaPipe function inital :onResults,setHolistic
    function onResults(results) {
        //console.log(results);
        const videoWidth = 550;
        const videoHeight = 550;

        // Set canvas width	
        //console.log(myCanvasRef);
        myCanvasRef.current.width = videoWidth;
        myCanvasRef.current.height = videoHeight;
        const canvasElement = myCanvasRef.current;

        const canvasCtx = canvasElement.getContext("2d");
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
            results.image,
            0,
            0,
            canvasElement.width,
            canvasElement.height
        );

        if (results) {
            connect(canvasCtx, results.poseLandmarks, holistic.POSE_CONNECTIONS,
                { color: '#00FF00', lineWidth: 4 });
            connect(canvasCtx, results.poseLandmarks,
                { color: '#FF0000', lineWidth: 2 });
            connect(canvasCtx, results.faceLandmarks, holistic.FACEMESH_TESSELATION,
                { color: '#C0C0C070', lineWidth: 1 });
            connect(canvasCtx, results.leftHandLandmarks, holistic.HAND_CONNECTIONS,
                { color: '#CC0000', lineWidth: 5 });
            connect(canvasCtx, results.leftHandLandmarks,
                { color: '#00FF00', lineWidth: 2 });
            connect(canvasCtx, results.rightHandLandmarks, holistic.HAND_CONNECTIONS,
                { color: '#00CC00', lineWidth: 5 });
            connect(canvasCtx, results.rightHandLandmarks,
                { color: '#FF0000', lineWidth: 2 });
        }
        canvasCtx.restore();
    }

    const setHolistic = (video) => {
        //console.log('hrllroo');
        const faceMesh = new Holistic({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
            },
        });
        faceMesh.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            refineFaceLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        //console.log('video', video);
        //console.log('onResults', onResults);
        faceMesh.onResults(onResults);

        if (
            typeof video.current !== "undefined" &&
            video.current !== null
        ) {
            camera = new cam.Camera(video.current.video, {
                onFrame: async () => {
                    await faceMesh.send({ image: video.current.video });
                },
                width: 640,
                height: 480,
            });

            //console.log('camera', camera);
            camera.start();
        }
    }

    useEffect(() => {
        //lisinig for changes in the array of users caming in to the app
        let new_user = socket?.on("getNewUserAddToApp", user => {
            console.log('new user enter to app', user);
            console.log('yourInfo._id', yourInfo.userId);
            console.log('yourSocketId', yourSocketId); //yor socket id camming form meeting conect page / else its undidiend

            //console.log(profile.traineeOf, isEmpty(profile.traineeOf[0]));
            //when i'm in home page and i have list of trainee i what  to lisin to them
            if (!isEmpty(profile) && profile?.traineeOf) {
                console.log('lisinig whos is enterd ....');
                // profile?.trainerOf.map(trainee => {
                //     if (trainee === user.userId) setMyTraineeEntered(trainee);
                // })
                //TODO: move start to home page ... mybe to all pages
            }
            //when i'm in a meeting only and i have a partner to the meeting
            if (!yourSocketId && user.userId === yourInfo._id) {
                console.log('added ');
                setYourSocketId(user?.socketId)
            }
        });
        //close lisining to event when your socket exists
        yourSocketId && socket.off("getNewUserAddToApp");
        //lisining for caming calls from users
        console.log('socket', socket);
        socket?.on('callUser', ({ from, name: callerName, signal }) => {
            console.log('sssss', from, callerName, signal);
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, [socket]);


    useEffect(() => {
        if (myVideo.current) myVideo.current.srcObject = stream;
        setHolistic(myVideo);
    }, [stream]);

    useEffect(() => {
        if (!yourSocketId) setIsConnectedFriend(false);
        else setIsConnectedFriend(true);
    }, [yourSocketId]);


    const answerCall = () => {
        setCallAccepted(true);
        //set me as a peer and difiend my data 
        const peer = new Peer({ initiator: false, trickle: false, stream });

        //when i get a signel that call is answered - i get data about the single 
        console.time("timer1-answerCall");
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: yourSocketId });
            console.timeEnd("timer1-answerCall");
        });

        //i get the user stream and i set it in my web veiw
        console.time("timer1-stream");
        peer.on('stream', (currentStream) => {
            //outer person stream
            console.timeEnd("timer1-stream");
            userVideo.current.srcObject = currentStream;
            console.log(userVideo);
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    }

    const callUser = () => {
        console.log('isConnectedFriend', isConnectedFriend);
        if (!isConnectedFriend) { //sec user has no socketId - cant do connection
            return;
        }

        // i need to call your socket id 
        const peer = new Peer({ initiator: true, trickle: false, stream });

        console.time("timer2-callUser");
        peer.on('signal', (data) => {
            // console.log('signal', data);
            socket.emit('callUser', { userToCall: yourSocketId, signalData: data, from: mySocketId, name: myName });
            console.timeEnd("timer2-callUser");
        });

        console.time("timer2-stream");
        var start = new Date();
        peer.on('stream', (currentStream) => {
            console.timeEnd("timer2-stream");
            console.log('Request took:', (new Date() - start) / 1000, 'sec');
            userVideo.current.srcObject = currentStream;
            console.log(userVideo);
        });

        socket.on('callAccepted', (signal) => {
            console.log('signal eeee', signal);
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    }
    const leaveCall = () => { }

    return (
        <SocketContext.Provider value={{
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
            setYourInfo,
            callEnded,
            mySocketId,
            yourSocketId,
            callUser,
            leaveCall,
            answerCall,
            myCanvasRef,
            userCanvasRef,
            socket,
            traineeEntered,
        }}
        >
            {children}
        </SocketContext.Provider>
    );
}
export { ContextProvider, SocketContext };

