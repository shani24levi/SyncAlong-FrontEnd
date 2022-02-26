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
    const [yourDataResived, setYourDataResived] = useState(null);
    const [syncScore, setSyncScore] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [mediaPipeInitilaize, setMediaPipeInitilaize] = useState(false);


    const [emoji, setEmoji] = useState(null);
    const images = { thumbs_up: thumbs_up, victory: victory, stop: stop };

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const connect = window.drawConnectors;
    var camera = null;
    const myCanvasRef = useRef();
    const userCanvasRef = useRef();
    const Audio = useRef();

    //===================mediaPipe function inital==========================
    //mediaPipe function inital :onResults,setHolistic
    let arryof1sec = [];
    let timeObject;
    let flagTime = true;
    let flagFeatch = true;
    const [timeOfColectionPose, setTimeOfColectionPose] = useState();
    const [myDelayOnConection, setMyDelayOnConection] = useState(null);
    const [array_poses, setPosesArray] = useState([]);

    const onResults = async (results) => {
        const videoWidth = 640;
        const videoHeight = 480;

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
            timeObject = new Date(timeObject.getTime() + 1000 * 1).getTime(); //2 sec
            flagTime = false;
        }

        if (currTime < timeObject && flagFeatch) {
            arryof1sec.push(results);
        }
        else if (currTime > timeObject && flagFeatch) {
            let array_of_poses = arryof1sec.map(p => p.poseLandmarks);
            let add = { time: new Date().toLocaleString(), poses: array_of_poses }
            setPosesArray(array_poses => [...array_poses, add])

            setTimeOfColectionPose(new Date().toLocaleString())
            setPosesArry(array_of_poses); //now......

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
            camera.start();
            setMediaPipeInitilaize(true)
        }
    }

    //===================useEffects of states==========================
    useEffect(() => {
        lisiningForNewUsers();
        lisiningForCamingCalls();
        lisiningResivingPoses();
        lisiningResivingSyncScore();
        lisiningMassagesInMyRoom();
    }, [socket]);

    useEffect(() => {
        if (myVideo.current) myVideo.current.srcObject = stream;
        setHolistic(myVideo);
    }, [stream]);

    useEffect(() => {
        if (!yourSocketId) setIsConnectedFriend(false);
        else setIsConnectedFriend(true);
    }, [yourSocketId]);

    useEffect(() => {
        if (yourDataResived) {
            let found_el = null;
            console.log('yourDataResived.end_time_of_colection', yourDataResived.end_time_of_colection);
            //get the same time of poses as you
            found_el = array_poses.find(el => el.time === yourDataResived.end_time_of_colection);
            //if its not colected at the same time
            //get the next after  
            if (!found_el || found_el === undefined) {
                for (const el of array_poses) {
                    if (el.time > yourDataResived.end_time_of_colection) {
                        found_el = el;
                        console.log('found_el undifiendddddd', found_el);
                        break;
                    }
                }
            }

            console.log('posesArry now...found_el...', found_el);
            //send me & you data to socket for sync calculation
            found_el && socket.emit("sendOurPoses", { me: found_el, you: yourDataResived, activity: yourDataResived.activity, time: yourDataResived.end_time_of_colection, roomId });
            setYourDataResived(null);
        }
    }, [array_poses]);

    useEffect(() => {
        if (isModalVisible) {
            Audio?.current?.play();
        } else Audio?.current?.pause();
    }, [isModalVisible]);

    //===============helpers func=========================//

    //===============lisiners=========================//
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
        socket?.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }

    const lisiningResivingPoses = () => {
        //peer2 lisining to caming poses from peer1
        socket?.on("resivingPoses", (data) => {
            console.log(data, 'resiving time of your data:', new Date().toLocaleString());
            setYourDataResived(data);
            //send to sync calculation in useEffect[array_poses]
            //call back to all in roomId after sync-alg response
            //get number between 0 to 1.
            //1 high sync
            //0 no sync
        })
    }

    const lisiningMassagesInMyRoom = () => {
        socket?.on('responsRoomId', (res) => {
            console.log('user entered to this room you are allrady in!!!', res);
        });
    }

    const lisiningResivingSyncScore = () => {
        socket?.on('syncScore', sync_score => {
            console.log('///...score.../// ', sync_score);
            setSyncScore(sync_score);
        });
    }

    const lisiningOurDelay = () => {
        socket?.on("ourDelay", (data) => {
            console.log(data, '..............my delay time ..........');
            data && setMyDelayOnConection(data);
            data && setStartMeeting(true);
        })
    }

    //===================socket calls when user in room and whant to call============================//
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
        socket.on('callAccepted', (signal, start_delay) => {
            let start1 = start_delay;
            var end = new Date().toString();
            let delay = new Date(end).getSeconds() - new Date(start1).getSeconds();
            console.log('my delay', delay, 'sec');
            let data = {
                to: yourSocketId,
                delay
            }
            setMyDelayOnConection(delay);
            setCallAccepted(true);
            setStartMeeting(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    }

    const leaveCall = () => { }
    //===================socket calls when meeting in now============================//
    //===================pop up to bouth===========================//


    //===================socket for sync func============================//
    const sendMyPoses = async (time, poses, activity) => {
        var start = new Date().toLocaleString();
        let data = {
            from: mySocketId,
            to: yourSocketId,
            end_time_of_colection: time, //-2 sec to peer2 
            time_of_sending: start,
            poses: poses,
            activity
        }
        socket.emit("sendPoses", data); //peer1 send his poses to peer2 
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
            sendMyPoses,
            myDelayOnConection,
            timeOfColectionPose,
            array_poses,
            setPosesArray,
            syncScore,
            setIsModalVisible,
            isModalVisible,
            Audio,
            mediaPipeInitilaize
        }}
        >
            {children}
        </SocketContext.Provider>
    );
}
export { ContextProvider, SocketContext };

