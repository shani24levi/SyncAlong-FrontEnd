import React, { createContext, useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import { Holistic } from "@mediapipe/holistic";
import * as holistic from "@mediapipe/holistic";
import * as cam from "@mediapipe/camera_utils";
import { useSelector } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
///////// NEW STUFF IMPORTS
import * as fp from "fingerpose";
import victory from "../../assets/signs/victory.png"
import thumbs_up from "../../assets/signs/thumbs_up.png"
import stop from "../../assets/signs/stop.png"
///////// NEW STUFF IMPORTS


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
    const [roomId, setRoomId] = useState(null);
    const [allUsersInRoom, setAllUsersInRoom] = useState(false);
    const [startMeeting, setStartMeeting] = useState(false);
    const [posesArry, setPosesArry] = useState([]);
    const [myRole, setMyRole] = useState(null);

    const [emoji, setEmoji] = useState(null);
    const images = { thumbs_up: thumbs_up, victory: victory, stop: stop };

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const connect = window.drawConnectors;
    var camera = null;
    const myCanvasRef = useRef();
    const userCanvasRef = useRef();


    //mediaPipe function inital :onResults,setHolistic
    let arryof1sec = [];
    let i = 0;
    let timeObject;
    let flagTime = true;
    let flagFeatch = true;
    const [flagTime1, setFlagTime] = useState(true);
    const [flagFeatch1, setFlagFeatch] = useState(true);
    const [timeOfColectionPose, setTimeOfColectionPose] = useState();
    const [delayBetweenUsers, setDelayBetweenUsers] = useState(false);

    const onResults = async (results) => {
        const videoWidth = 550;
        const videoHeight = 550;

        // Set canvas width	
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
        // //hand mark ....
        // if (results?.leftHandLandmarks) {
        //     console.log('.........left hend ......');
        //     const GE = new fp.GestureEstimator([
        //         fp.Gestures.VictoryGesture,
        //         fp.Gestures.ThumbsUpGesture,
        //         fp.Gestures.StopGesrure,
        //     ]);
        //     const gesture = await GE.estimate(results.leftHandLandmarks, 5);
        //     if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
        //         console.log(gesture.gestures);
        //         setEmoji(gesture.gestures[0].name);
        //         console.log('@@@@@@@@@ ', emoji);
        //     }
        // }
        // else setEmoji(null);

        //handel pose colection
        //when ther is a conection then start maser time and send data to server
        // console.log(flagTime);
        let currTime = new Date().getTime()

        if (flagTime) {
            timeObject = new Date();
            timeObject = new Date(timeObject.getTime() + 1000 * 2).getTime(); //2 sec
            flagTime = false;
            //setFlagTime(false);
            //[4][4][4][[4]
        }

        if (currTime < timeObject && flagFeatch) {
            arryof1sec.push(results);
        }
        else if (currTime > timeObject && flagFeatch) {
            setTimeOfColectionPose(new Date().toLocaleString())
            setPosesArry(arryof1sec); //now......
            // arr2.push(arryof1sec) ...[2,2,2,2,2,2,2,2,]20;
            arryof1sec = [];
            flagTime = true;
            flagFeatch = true;
        }

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
        lisiningForNewUsers();
        lisiningForCamingCalls();
        lisiningResivingPoses();
        lisiningResivingSyncScore();
    }, [socket]);

    useEffect(() => {
        if (myVideo.current) myVideo.current.srcObject = stream;
        setHolistic(myVideo);
    }, [stream]);

    useEffect(() => {
        if (!yourSocketId) setIsConnectedFriend(false);
        else setIsConnectedFriend(true);
    }, [yourSocketId]);


    let timeOfColectionPose2;
    useEffect(() => {
        console.log(timeOfColectionPose);
        if (timeOfColectionPose) timeOfColectionPose2 = timeOfColectionPose;
    }, [timeOfColectionPose]);

    const lisiningForNewUsers = () => {
        //lisinig for changes in the array of users caming in to the app
        socket?.on("getNewUserAddToApp", user => {
            console.log('new user enter to app', user);
            console.log('yourInfo._id', yourInfo.userId);
            console.log('yourSocketId', yourSocketId); //yor socket id camming form meeting conect page / else its undidiend

            console.log(profile);
            //when i'm in home page and i have list of trainee i what  to lisin to them
            if (!isEmpty(profile) && profile?.traineeOf) {
                console.log('lisinig whos is enterd ....');
                profile?.traineeOf.map(trainee => {
                    if (trainee === user.userId) setMyTraineeEntered(trainee);
                })
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
    }

    const lisiningForCamingCalls = () => {
        console.time("timer2-answerCall-lising");
        socket?.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
        console.timeEnd("timer2-answerCall-lising");
    }

    const lisiningResivingPoses = () => {
        socket?.on("resivingPoses", (data) => {
            var start = data.time;
            console.log(data);
        })
    }

    const lisiningResivingSyncScore = () => { }

    function answerCall() {
        setCallAccepted(true);
        setStartMeeting(true);

        //set me as a peer and difiend my data 
        const peer = new Peer({ initiator: false, trickle: false, stream });

        //when i get a signel that call is answered - i get data about the single 
        console.time("timer1-answerCall");
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: yourSocketId });
            console.timeEnd("timer1-answerCall");
            socket.emit('startMeeting', { signal: data, to: yourSocketId });
        });

        //i get the user stream and i set it in my web veiw
        console.time("timer1-stream");
        peer.on('stream', (currentStream) => {
            //outer person stream
            console.timeEnd("timer1-stream");
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    }

    const callUser = () => {
        console.log('isConnectedFriend', isConnectedFriend);
        if (!isConnectedFriend) { //sec user has no socketId - cant do connection
            return;
        }
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

        let start1 = new Date().getTime();
        socket.on('callAccepted', (signal) => {
            console.log('signal eeee', signal);
            setCallAccepted(true);
            setStartMeeting(true);
            console.log('my delay', new Date().getTime() - start1);
            setDelayBetweenUsers(true); ///who is sending singel poses

            peer.signal(signal);
        });

        connectionRef.current = peer;
    }
    const leaveCall = () => { }

    const sendMyPoses = async () => {
        var start = new Date().toLocaleString();
        console.log('timeOfColectionPose', timeOfColectionPose2, ":: -2 sec");
        let data = {
            from: mySocketId,
            to: yourSocketId,
            time_of_colection: timeOfColectionPose2,
            time_of_sending: start,
            poses: posesArry
        }
        console.log('sending my data to trainee', new Date().toLocaleString());
        socket.emit("sendPoses", data);
        console.log('Request took for sending my-pose:', (new Date() - start) / 1000, 'sec');
    }

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
            setRoomId,
            allUsersInRoom, startMeeting,
            emoji,
            posesArry,
            myRole,
            setMyRole,
            setFlagTime,
            setFlagFeatch,
            sendMyPoses,
            delayBetweenUsers,
            timeOfColectionPose,

        }}
        >
            {children}
        </SocketContext.Provider>
    );
}
export { ContextProvider, SocketContext };

