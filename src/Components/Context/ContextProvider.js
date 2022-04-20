import React, { createContext, useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeActiveMeeting } from '../../Store/actions/meetingActions';
import Peer from 'simple-peer/simplepeer.min.js';
import { Holistic } from '@mediapipe/holistic';
import * as holistic from '@mediapipe/holistic';
import * as cam from '@mediapipe/camera_utils';
import isEmpty from '../../validation/isEmpty';
import mediaPipeLandmarks from './mediaPipeLandmarks';
import draw from './DrawAnimation/draw';

{
  /* 
    ContextProvider Component is responsible for holding the calls required to support 
    when connecting with users such as: 
    connection, disconnection, information transfer between users.
    set pose lib ....
*/
}

const SocketContext = createContext();

function ContextProvider({ children, socket, profile }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [myName, setMyName] = useState('');
  const [yourName, setYourName] = useState('');
  const [call, setCall] = useState({});
  const [mySocketId, setMySocketId] = useState(null);
  const [yourSocketId, setYourSocketId] = useState(null);
  // const [isConnectedFriend, setIsConnectedFriend] = useState(true);
  const [yourInfo, setYourInfo] = useState({});
  const [traineeEntered, setMyTraineeEntered] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [allUsersInRoom, setAllUsersInRoom] = useState(false);
  const [startMeeting, setStartMeeting] = useState(false);
  const [posesArry, setPosesArry] = useState([]);
  const [myRole, setMyRole] = useState(null);
  const [yourDataResived, setYourDataResived] = useState(null);
  const [syncScore, setSyncScore] = useState(null);
  const [activity_now, setActivityNow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [mediaPipeInitilaize, setMediaPipeInitilaize] = useState('');
  const [peer, setMeAsPeer] = useState(null);
  const [recognition, setRecognition] = useState(null);

  const syncScoreRef = useRef(syncScore);
  syncScoreRef.current = syncScore;
  const activity_now_ref = useRef(activity_now);
  activity_now_ref.current = activity_now;

  //for first step - user enters the roonm - need to stap away for the camaea.
  const [peer1inFrame, setSettingUserInFrame] = useState(false);
  const [peer2inFrame, setPeer2inFrame] = useState(false);
  const [firstTimeInFram, setfirstTimeInFram] = useState(true);

  //stats to handel conection from pop up coming meeting is now 
  const [userEnteredNow, setUserEnteredNow] = useState({});
  const [accseptScheduleMeetingCall, setAccseptScheduleMeetingCall] = useState(false);
  const [accseptPeer2ScheduleMeetingCall, setAccseptPeer2ScheduleMeetingCall] = useState(false);
  const [conectReq, setConectReq] = useState(false);
  const [oneTime, setOneTime] = useState(true);
  const [mediapipeOfTrainee, setMediapipeOfTrainee] = useState(false);
  const [upcomingMeetingToNow, setUpcomingMeetingToNow] = useState(false);
  const [callTrainee, setCallTrainee] = useState(false);
  const [activeMeetingPopUp, setActiveMeetingPopUp] = useState(false);

  const [emoji, setEmoji] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const connect = window.drawConnectors;
  let camera = null;
  const myCanvasRef = useRef();
  const userCanvasRef = useRef();
  let userPoseAngle = null;
  let repsCounter = 0;
  const Audio = useRef();

  let location = useLocation();

  const poseLandmarks_ref = useRef(null);

  //===================mediaPipe function inital==========================
  //mediaPipe function inital :onResults,setHolistic
  // *** z index from mediaPipe is not usebal becous the model is'nt fully trained to predict depth
  // its described in the docs on: ->outpue -> POSE_LANDMARKS -> z index.
  //mediaPipe docs-link: https://google.github.io/mediapipe/solutions/holistic.html
  //mediaPipe Working on a Graph-based framework, MP is tremendously faster than TensorFlow, especially so on the browser.
  //data for webGL with midiapipe(see GPU!!!!): https://google.github.io/mediapipe/framework_concepts/framework_concepts.html
  let arryof1sec = [];
  let timeObject;
  let flagTime = true;
  let flagFeatch = true;
  const [timeOfColectionPose, setTimeOfColectionPose] = useState(new Date());
  const [myDelayOnConection, setMyDelayOnConection] = useState(null);
  const [array_poses, setPosesArray] = useState([]);
  const [pose_results, setPose_Results] = useState([]);
  const [poseFarFrame, setPoseFarFrame] = useState([]);

  const collectionUserPose = (results) => {
    //calls inside of the midiapipe loop thets runs fer frams
    //colect 1 sec and set it in the start array of posess
    let currTime = new Date().getTime();
    if (flagTime) {
      timeObject = new Date();
      timeObject = new Date(timeObject.getTime() + 1000 * 1).getTime(); //1 sec
      flagTime = false;
    }

    if (currTime < timeObject && flagFeatch) {
      arryof1sec.push(results);
      setPose_Results(results);
    } else if (currTime > timeObject && flagFeatch) {
      let array_of_poses = arryof1sec.map((p) => {
        const width = 640;
        const height = 480;
        // console.log("p.poseLandmarks", p.poseLandmarks, width, height);

        for (var i = 0; p.poseLandmarks && i < p.poseLandmarks.length; i++) {
          p.poseLandmarks[i].x = p.poseLandmarks[i].x * width;
          p.poseLandmarks[i].y = p.poseLandmarks[i].y * height;
        }
        // console.log("new poseLandmarks", p.poseLandmarks);
        return p.poseLandmarks;
      });
      let add = {
        time: new Date().toLocaleString('en-GB'),
        poses: array_of_poses
      };
      // console.log("add", add);
      setPosesArray((array_poses) => [...array_poses, add]);

      setTimeOfColectionPose(new Date().toLocaleString('en-GB'));
      setPosesArry(array_of_poses); //now......

      arryof1sec = [];
      flagTime = true;
      flagFeatch = true;
    }
  };

  const calculatingUserInFrame = (results) => {
    let inframe = true;
    if (peer1inFrame) return inframe;
    if (!results.poseLandmarks || results.poseLandmarks?.length == 0)
      return inframe;

    results.poseLandmarks.map((i, body_index) => {
      if (
        i.visibility < 0.6 &&
        // mediaPipeLandmarks('RIGHR_WRIST') === body_index ||
        // mediaPipeLandmarks('LEFT_WRIST') === body_index ||
        // mediaPipeLandmarks('RIGHR_ELBOW') === body_index ||
        // mediaPipeLandmarks('LEFT_ELBOW') === body_index ||
        (mediaPipeLandmarks('RIGHR_SHOULDER') === body_index ||
          mediaPipeLandmarks('LEFT_SHOULDER') === body_index ||
          mediaPipeLandmarks('RIGHR_HIP') === body_index ||
          mediaPipeLandmarks('LEFT_HIP') === body_index ||
          mediaPipeLandmarks('RIGHR_KNEE') === body_index ||
          mediaPipeLandmarks('LEFT_KNEE') === body_index ||
          mediaPipeLandmarks('RIGHR_ANKLE') === body_index ||
          mediaPipeLandmarks('LEFT_ANKLE') === body_index)
      ) {
        inframe = false;
      }
    });

    if (inframe) {
      setSettingUserInFrame(inframe);
    }
    return inframe;
  };

  const is_sync = () => {
    if (syncScoreRef?.current >= 0.75) return true;
    return false;
  };

  const now_activity = () => {
    return activity_now_ref.current;
  };

  useEffect(() => {
    if (pose_results) {
      //  console.log("Pose_Results ", pose_results)
      if (peer) {
        poseLandmarks_ref.current = pose_results.poseLandmarks;
        //  console.log("peer is connect");
        peer?.emit('connect');
      } //else console.log('peer is not connect');
    }
  }, [pose_results]);

  const onResults2 = async (results) => {
    const videoWidth = 640;
    const videoHeight = 480;

    // setMediaPipeInitilaize('none');

    if (userCanvasRef.current === undefined || userCanvasRef.current == null) return;
    // Set canvas width
    userCanvasRef.current.width = videoWidth;
    userCanvasRef.current.height = videoHeight;
    const canvasElement = userCanvasRef.current;

    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(userVideo.current, 0, 0, canvasElement.width, canvasElement.height);
    // collectionUserPose(results);
    let inframe = calculatingUserInFrame(results);
    let syncing = is_sync();
    let activity = now_activity();
    if (syncScoreRef?.current < 0.75) {
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = 'rgba(255,0,0,0.1)';
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(userVideo.current, 0, 0, canvasElement.width, canvasElement.height);
      //drow only when seting modal is initilize and when not user in fram
      canvasCtx.globalCompositeOperation = 'source-over';
    }

    if (syncScoreRef?.current >= 0.75) {
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = 'rgba(0,255,0,0.1)';
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(userVideo.current, 0, 0, canvasElement.width, canvasElement.height);
      //drow only when seting modal is initilize and when not user in fram
      canvasCtx.globalCompositeOperation = 'source-over';
    }

    // Only overwrite existing pixels when user is out of the frame
    if (!inframe) {
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = 'rgba(255, 0, 0, 0.6)';
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(userVideo.current, 0, 0, canvasElement.width, canvasElement.height);
      //drow only when seting modal is initilize and when not user in fram
      canvasCtx.globalCompositeOperation = 'source-over';
    }

    if (results) {
      if (syncing)
        results.poseLandmarks && draw(canvasCtx, canvasElement, results, activity, "you");
    }
    canvasCtx.restore();
  };

  const onResults = async (results) => {
    const videoWidth = 640;
    const videoHeight = 480;

    setMediaPipeInitilaize('none');

    // Set canvas width
    myCanvasRef.current.width = videoWidth;
    myCanvasRef.current.height = videoHeight;
    const canvasElement = myCanvasRef.current;

    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    setTimeOfColectionPose(new Date().toLocaleString('en-GB'));
    setPoseFarFrame(results.poseLandmarks);

    collectionUserPose(results);
    let inframe = calculatingUserInFrame(results);
    let syncing = is_sync();
    let activity = now_activity();
    if (syncScoreRef?.current < 0.75) {
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = 'rgba(255,0,0,0.1)';
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
      //drow only when seting modal is initilize and when not user in fram
      canvasCtx.globalCompositeOperation = 'source-over';
    }

    if (syncScoreRef?.current >= 0.75) {
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = 'rgba(0,255,0,0.1)';
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
      //drow only when seting modal is initilize and when not user in fram
      canvasCtx.globalCompositeOperation = 'source-over';
    }

    // Only overwrite existing pixels when user is out of the frame
    if (!inframe) {
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = 'rgba(255, 0, 0, 0.6)';
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
      //drow only when seting modal is initilize and when not user in fram
      canvasCtx.globalCompositeOperation = 'source-over';
    }

    if (results) {
      if (syncing)
        results.poseLandmarks && draw(canvasCtx, canvasElement, results, activity);

      if (!inframe) {
        connect(canvasCtx, results.poseLandmarks, holistic.POSE_CONNECTIONS, {
          color: '#00FF00',
          lineWidth: 4
        });
        connect(canvasCtx, results.poseLandmarks, {
          color: '#FF0000',
          lineWidth: 2
        });
        connect(
          canvasCtx,
          results.faceLandmarks,
          holistic.FACEMESH_TESSELATION,
          { color: '#C0C0C070', lineWidth: 1 }
        );
        connect(
          canvasCtx,
          results.leftHandLandmarks,
          holistic.HAND_CONNECTIONS,
          { color: '#CC0000', lineWidth: 5 }
        );
        connect(canvasCtx, results.leftHandLandmarks, {
          color: '#00FF00',
          lineWidth: 2
        });
        connect(
          canvasCtx,
          results.rightHandLandmarks,
          holistic.HAND_CONNECTIONS,
          { color: '#00CC00', lineWidth: 5 }
        );
        connect(canvasCtx, results.rightHandLandmarks, {
          color: '#FF0000',
          lineWidth: 2
        });
      }
    }
    canvasCtx.restore();
  };

  const setHolistic = (video) => {
    console.log('video', video);
    const userPose = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      }
    });
    userPose.setOptions({
      modelComplexity: 1, //accuracy is 1
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    userPose.onResults(onResults);

    if (
      typeof video.current !== 'undefined' &&
      video.current !== null &&
      location.pathname === '/video-room'
    ) {
      camera = new cam.Camera(video.current.video, {
        onFrame: async () => {
          await userPose.send({ image: video?.current?.video });
        },
        width: 640,
        height: 480
      });
      camera.start();
    }
  };

  //===================useEffects of states==========================
  useEffect(() => {
    lisiningForNewUsers();
    lisiningForCamingCalls();
    lisiningResivingPoses();
    lisiningResivingSyncScore();
    lisiningMassagesInMyRoom();
    lisiningNotifications();
    !peer2inFrame && lisiningPeer2InFrame();
    lisiningMediaPipe();
    lisiningTraineeCall();
    lisiningAccseptScheduleMeetingCall();
    lisiningForDisconectPeerInRoom();
    lisiningRoomClosed();
    //lisiningForConnected();
    lisiningReConected();
  }, [socket]);

  useEffect(() => {
    if (!stream) return;
    if (location.pathname !== '/video-room') {
      console.log('stream return');
      return;
    }
    myVideo.current.srcObject = stream;
    myVideo.current?.srcObject && setHolistic(myVideo);
  }, [stream]);

  // useEffect(() => {
  //   if (!yourSocketId) setIsConnectedFriend(false);
  //   else setIsConnectedFriend(true);
  // }, [yourSocketId]);

  useEffect(() => {
    //The one who receives the points of the other and is responsible for sending to the server the request for synchronization
    if (yourDataResived) {
      let found_el = null;
      console.log(
        'yourDataResived.end_time_of_colection',
        yourDataResived.end_time_of_colection,
        typeof yourDataResived.end_time_of_colection
      );

      //get the same time of poses as you
      console.log('my_array_poses', array_poses);

      found_el = array_poses.find(
        (el) => el.time === yourDataResived.end_time_of_colection
      );
      //if its not colected at the same time
      //get the next after
      if (!found_el || found_el === undefined) {
        for (const el of array_poses) {
          if (el.time > yourDataResived.end_time_of_colection) {
            found_el = el;
            break;
          }
        }
      }

      if (!found_el || found_el === undefined) {
        ///whan you computer is faster then me
        //you send time of: 00:00:02 , i get it in 00:00:01
        //and my last colection is in 00:00:00
        //then get my last one in the array .
        found_el = array_poses[array_poses.length - 1]; //set it to the last
      }

      console.log('posesArry now...found_el...', found_el);
      //send me & you data to socket for sync calculation
      found_el &&
        socket.emit('sendOurPoses', {
          me: found_el,
          you: yourDataResived,
          activity: yourDataResived.activity,
          time: yourDataResived.end_time_of_colection,
          roomId
        });
      setYourDataResived(null);
    }
  }, [array_poses, yourDataResived]);

  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

  useEffect(() => {
    //set notificatiion to peer2 that peer1(me speeking...) said somethong....
    if (recognition) {
      console.log('recognition', recognition);
      let data = {
        from: mySocketId,
        to: yourSocketId,
        notification: recognition,
        time: new Date().toLocaleString(),
        roomId
      };
      if (recognition === 'leave') {
        console.log('leave clear', roomId);
       // leaveCall();
      }
      socket?.emit('sendNotification', data);
    }
  }, [recognition]);

  useEffect(() => {
    if (peer1inFrame && yourSocketId && firstTimeInFram) {
      setfirstTimeInFram(false);
      console.log('im in the frame ......');
      socket?.emit('peer1inFrame', yourSocketId);
    }
  }, [peer1inFrame]);

  useEffect(() => {
    console.log('t', mediaPipeInitilaize, oneTime);
    if (mediaPipeInitilaize === 'none' && oneTime && myRole === 'trainee') {
      setOneTime(false);
      socket?.emit('t', { yourSocketId, roomId });
    }
  }, [mediaPipeInitilaize, oneTime, yourSocketId]);


  useEffect(() => {
    if (!isEmpty(userEnteredNow)) {
      //for notify trainer when his trainee entered
      if (
        !isEmpty(profile.profile) &&
        user.role === 'trainer' &&
        profile.profile?.trainerOf
      ) {
        profile.profile?.trainerOf.map((trainee) => {
          if (trainee === userEnteredNow.userId) {
            console.log(trainee, userEnteredNow.userId);
            setMyTraineeEntered(trainee);
            return;
          }
        });
      }
      // for pop up when you have an active meeting
      if (!isEmpty(meetings?.active_meeting)) {
        if ((user.role === 'trainer' && userEnteredNow.userId === meetings.active_meeting.trainee._id) ||
          (user.role === 'trainee' && userEnteredNow.userId === meetings.active_meeting.tariner._id)) {
          setActiveMeetingPopUp(true);
        }
      }
    }
  }, [userEnteredNow]);

  useEffect(() => {
    if (upcomingMeetingToNow && !isEmpty(upcamingMeeting) && yourSocketId) {
      socket?.emit('calltoTrainee', yourSocketId);
      setUpcomingMeetingToNow(false);
    }
  }, [upcomingMeetingToNow]);

  useEffect(() => {
    console.log('accseptScheduleMeetingCall', accseptScheduleMeetingCall, yourSocketId);
    if (accseptScheduleMeetingCall && yourSocketId) {
      console.log('i accsept Schedule MeetingCall to', yourSocketId);
      socket?.emit('accseptScheduleMeetingCall', yourSocketId);
    }
  }, [accseptScheduleMeetingCall, yourSocketId]);


  //======================helpers func==============================//
  //===============FOR POP UP MEETING IS NOW=========================//
  //===== It's here because it wraps the interface and all the pages ...
  //==== although in fact it can be on a home page and move it from redux====//
  //==========================================================================================//
  // I need it here because a yes or no click should go through the socket and start a session//
  //==========================================================================================//
  const meetings = useSelector((state) => state.meetings);
  const [upcamingMeeting, setUpcamingMeeting] = useState({});
  const [scheduleMeetingPopUpCall, setScheduleMeetingPopUpCall] = useState({});
  const [MeetingIsNOW, setMeetingIsNOW] = useState(false);

  useEffect(() => {
    setUpcamingMeeting(meetings.upcoming_meeting);
    meetingsListener();
  }, [meetings?.meetings, meetings?.upcoming_meeting]);

  function meetingsListener() {
    // loop function
    setTimeout(function () {
      //  call a 30s setTimeout when the loop is called
      let currentTime = new Date().getTime();  //.setSeconds(0, 0);
      const date = new Date(meetings.upcoming_meeting?.date) //?.slice(0, -1)); // delte z from date
      //date.setHours(date.getHours() + 3);
      let upcomingMeeting = date.getTime();

      //console.log('aj', new Date(), 'date+3', date);
      //console.log('a', currentTime, upcomingMeeting, currentTime < upcomingMeeting);
      if (!upcomingMeeting) {
        return;
      }
      if (currentTime < upcomingMeeting - 5000) {
        meetingsListener();
      } else if (currentTime >= upcomingMeeting - 5000) {
        console.log('meeting is NOW!!!!', meetings.upcoming_meeting);
        setScheduleMeetingPopUpCall(meetings.upcoming_meeting);
        setMeetingIsNOW(true);
        //set up next meeting timing....
        return;
      }
    }, 5000);
  }

  //===============lisiners=========================//

  const lisiningForNewUsers = () => {
    //lisinig for changes in the array of users caming in to the app
    socket?.on('getNewUserAddToApp', (user) => {
      // console.log('new user enter to app', user);
      // console.log('yourInfo', yourInfo);
      // console.log('yourSocketId', yourSocketId); //yor socket id camming form meeting conect page / else its undidiend
      setUserEnteredNow(user);

      if (MeetingIsNOW && !yourSocketId && yourInfo) {
        if (user.userId === yourInfo._id) setYourSocketId(user.socketId);
      }
    });
    //close lisining to event when your socket exists
    yourSocketId && socket.off('getNewUserAddToApp');
  };

  // const lisiningForConnected = () => {
  //   //lisinig for changes in the array of users caming in to the app
  //   socket?.on('connected', (socketId, users) => {
  //     console.log("i am connected");
  //     console.log('user?._id', user, roomId, meetings);
  //     if (user?._id) {
  //       //addUser(socket, userId,roomID)
  //       let not_conected = users.find(el => el.userId === user?._id)
  //       if (!not_conected)
  //         console.log("i am connected - you disConect");
  //       else {
  //         let userId = user?._id;
  //         socket?.emit("reconect", userId, meetings.active_meeting?._id);
  //       }
  //     }

  //   });
  //   //close lisining to event when your socket exists
  //   yourSocketId && socket.off('getNewUserAddToApp');
  // };

  const lisiningForCamingCalls = () => {
    socket?.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  };

  const lisiningResivingPoses = () => {
    //peer2 lisining to caming poses from peer1
    socket?.on('resivingPoses', (data) => {
      console.log(
        data,
        'resiving time of your data:',
        new Date().toLocaleString('en-GB')
      );
      setYourDataResived(data);
    });
  };

  const lisiningMassagesInMyRoom = () => {
    socket?.on('responsRoomId', (res) => {
      console.log('user entered to this room you are allrady in!!!', res);
    });
  };

  const lisiningResivingSyncScore = () => {
    socket?.on('syncScore', (sync_score) => {
      console.log('///...score.../// ', sync_score);
      setSyncScore(sync_score);
    });
    //for eyal
    socket?.on('resivingSyncScoure', (sync_score) => {
      console.log('///...score.../// ', sync_score, new Date().toLocaleString('en-GB'));
      setSyncScore(sync_score);
    });
  };

  const lisiningNotifications = () => {
    socket?.on('notification', (notification) => {
      //console.log('notification..notification..notification ', notification);
      setRecognition(notification);
    });
  };

  const lisiningPeer2InFrame = () => {
    socket?.on('peer1inFrame', (yourSocketId) => {
      console.log('you are in the frame ......');
      setPeer2inFrame(true);
    });
  };

  const lisiningMediaPipe = () => {
    socket?.on('t', (id) => {
      console.log(id);
      setMediapipeOfTrainee(id);
    });
  };

  const lisiningTraineeCall = () => {
    socket?.on('calltoTrainee', (data) => {
      console.log(data);
      setCallTrainee(data);
    });
  };

  const lisiningAccseptScheduleMeetingCall = () => {
    socket?.on('accseptScheduleMeetingCall', (id) => {
      console.log('accseptScheduleMeetingCall of you');
      setAccseptPeer2ScheduleMeetingCall(id);
    });
  };

  const lisiningForDisconectPeerInRoom = () => {
    //whan im left the socket and im in a sstion then reconect me and continue
    socket?.on("disconnected", (reason) => {
      console.log("disconnect", reason);
      if (reason === "ping timeout" || reason === "transport error") {
        if (callAccepted) {
          socket?.connect();
          let userId = user._id
          let roomId = meetings.active_meeting._id
          socket?.emit('reconect', (userId, roomId));
        }
      }
    });

    socket?.on('userLeft', (userId, reason) => {
      if (callAccepted && reason === "transport close") {
        connectionRef.current.destroy();
        console.log('userLeft ,im in active meeting,i need to waite for his reConect ', userId);
        //setPeerDisConected(true);
      }
      else {
        console.log('userLeft ', userId);
      }
      //Clear the state of yourSocketId
      //im waiting in the room... 
      //waiting for notify that you are back!
      //whan you are back to the room - im setting your new socketID
      //sand to you that im accept the call
      //if i left the room also then room is closed for good and no recording has saved.
      //reconect when your midiapipe is up 
      //userLeft(userId);
    });

    socket?.on("reconect", (user) => {
      if (user.userId === user._id)
        setMySocketId(user.socketId);
      else setYourSocketId(user.socketId);
    });

  };

  const lisiningRoomClosed = () => {
    //TO DO - case im not in the room then im not getting this 
    // and i can be on my way to the room .... and not be notifyied by this .
    socket?.on('closeRoom', (roomId) => {
      console.log('closeRoom ', roomId);
      if (location.pathname !== '/video-room') {
        //Clear the state of all and return to home page
        dispatch(closeActiveMeeting()); //no need to update db becose peer2 alrady done that
        leaveCall();
        navigate('/home');
        return;
      }
      else {
        leaveCall();
        navigate('/home', { state: { meeting_id: roomId, me: myName, you: yourName } });
      }
    });
  };

  const lisiningReConected = () => {
    let id=user?._id
    socket?.on('reconect', (users) => {
      console.log('reconect ', users, id);
      if (location.pathname !== '/video-room') {
        users.forEach(user => {
          console.log('reconect foreach ', user.userId, id);
          if (user.userId === id) setMySocketId(user.socketId);
          else setYourSocketId(user.socketId);
        })
        setOneTime(true);
      }
      else {
        leaveCall();
        navigate('/home', { state: { meeting_id: roomId, me: myName, you: yourName } });
      }
    });
  };

  //===================socket calls when user in room and whant to call============================//
  function answerCall() {
    console.log('answerCall');
    setCallAccepted(true);
    //set me as a peer and difiend my data
    const peer = new Peer({ initiator: false, trickle: false, stream });
    setMeAsPeer(peer);
    // peer._debug = console.log;

    peer.on('error', (err) => {
      // console.log('error with peer', err);
      // console.log('peer', peer);
      answerCall();
    });

    peer.on('data', (data) => {
      data = JSON.parse(data);
      // console.log('data', data);
      onResults2({ poseLandmarks: data });
    });
    peer.on('connect', () => {
      //console.log("poseLandmarks: ", poseLandmarks_ref.current);
      let state = peer._pc?.connectionState;
      // console.log("datachannel", state, "peer", peer);
      if (
        poseLandmarks_ref.current !== null &&
        poseLandmarks_ref.current !== undefined &&
        state != undefined && state != null && state == 'connected'
      )
        peer?.send(JSON.stringify(poseLandmarks_ref.current));
    });

    //when i get a signel that call is answered - i get data about the single
    // console.time('timer1-answerCall');
    peer.on('signal', (data) => {
      console.log(yourSocketId);
      socket.emit('answerCall', { signal: data, to: yourSocketId });
      setConectReq(false);
      // console.timeEnd('timer1-answerCall');
      //  socket.emit('startMeeting', { signal: data, to: yourSocketId });
    });
    //i get the user stream and i set it in my web veiw
    //  console.time("timer1-stream");
    peer.on('stream', (currentStream) => {
      //outer person stream
      // console.timeEnd("timer1-stream");
      userVideo.current.srcObject = currentStream;
      // console.log(currentStream);
      // console.log('userVideo', userVideo);
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  }

  const callUser = () => {
    console.log('callUser');
    // console.log('isConnectedFriend', isConnectedFriend);
    // if (!isConnectedFriend) {
    //   //sec user has no socketId - cant do connection
    //   return;
    // }
    const peer = new Peer({ initiator: true, trickle: false, stream });
    setMeAsPeer(peer);
    //peer._debug = console.log;

    peer.on('error', (err) => {
      //console.log('error with peer', err);
      // console.log('peer', peer);
      callUser();
    });

    peer.on('data', (data) => {
      data = JSON.parse(data);
      //console.log('data', data);
      onResults2({ poseLandmarks: data });
    });
    peer.on('connect', () => {
      // console.log("poseLandmarks: ", poseLandmarks_ref.current);
      let state = peer._pc?.connectionState;
      // console.log("datachannel", state, "peer", peer);
      if (
        poseLandmarks_ref.current !== null &&
        poseLandmarks_ref.current !== undefined &&
        state != undefined && state != null && state == 'connected'
      )
        peer?.send(JSON.stringify(poseLandmarks_ref.current));
    });

    // console.time('timer2-callUser');
    peer.on('signal', (data) => {
      // console.log('signal', data);
      setConectReq(false);
      socket.emit('callUser', {
        userToCall: yourSocketId,
        signalData: data,
        from: mySocketId,
        name: myName
      });
    });

    console.time('timer2-stream');
    let start = new Date();
    peer.on('stream', (currentStream) => {
      //console.timeEnd('timer2-stream');
      // console.log('Request took:', (new Date() - start) / 1000, 'sec');
      userVideo.current.srcObject = currentStream;
      // console.log(currentStream);
      // console.log('userVideo', userVideo);
    });

    let start1 = new Date().getTime();
    socket.on('callAccepted', (signal, start_delay) => {
      setConectReq(false);
      let start1 = start_delay;
      let end = new Date().toString();
      let delay = new Date(end).getSeconds() - new Date(start1).getSeconds();
      // console.log('my delay', delay, 'sec');
      let data = {
        to: yourSocketId,
        delay
      };
      setMyDelayOnConection(delay);
      setCallAccepted(true);
      //console.log('traineee coneccted with ok from prre2');
      // setStartMeeting(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    console.log('leve func');
    setCallEnded(true);
    connectionRef.current.destroy();
    // stop both video and audio
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    //clearRoomStates();
    // window.location.reload();
  };
  //===================socket calls when meeting in now============================//
  //===================pop up to bouth===========================//
  //===================socket for sync func============================//
  const sendMyPoses = async (time, poses, activity) => {
    let start = new Date().toLocaleString('en-GB');
    let data = {
      from: mySocketId,
      to: yourSocketId,
      end_time_of_colection: time, //-2 sec to peer2
      time_of_sending: start,
      poses: poses,
      activity
    };
    console.log('data im sending ..', data);
    socket.emit('sendPoses', data); //peer1 send his poses to peer2
  };

  const sendPosesByPeers = async (dataTo, activity) => {
    let data = {
      poses: dataTo.poses,
      time: dataTo.time
    };
    let trainer = myRole === 'trainer' ? true : false;
    console.log('sendPosesByPeers im sending ..', data, new Date().toLocaleString('en-GB'), 'milisec : ', new Date().getMilliseconds());
    socket.emit('sendPosesByPeers', data, mySocketId, yourSocketId, trainer, activity, roomId);
  }

  const clearRoomStates = () => {
    setSettingUserInFrame(false);
    setPeer2inFrame(false);
    setfirstTimeInFram(true);

    setAccseptScheduleMeetingCall(false);
    setAccseptPeer2ScheduleMeetingCall(false);
    setConectReq(false);
    setOneTime(true);
    setMediapipeOfTrainee(false);
    setUpcomingMeetingToNow(false);
    setCallTrainee(false);

    setCallAccepted(false);
    setCallEnded(false);
    setStream(null);
    setMyName('');
    setYourName('');
    setCall({});
    setMySocketId(null);
    setYourSocketId(null);
    setYourInfo({});
    setRoomId(null);
    setStartMeeting(false);
    setPosesArry([]);
    setMyRole(null);
    setYourDataResived(null);
    setSyncScore(null);
    setActivityNow(null);
    setIsModalVisible(true);
    setMediaPipeInitilaize('');
    setMeAsPeer(null);
    setRecognition(null);
  }

  return (
    <SocketContext.Provider
      value={{
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
        setMyTraineeEntered,
        setRoomId,
        allUsersInRoom,
        startMeeting,
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
        mediaPipeInitilaize,
        peer2inFrame,
        peer1inFrame,
        recognition,
        setRecognition,
        setSettingUserInFrame,
        setPeer2inFrame,
        scheduleMeetingPopUpCall,
        setScheduleMeetingPopUpCall,
        upcamingMeeting,
        setAccseptScheduleMeetingCall,
        accseptScheduleMeetingCall,
        setConectReq,
        conectReq,
        activity_now,
        setActivityNow,
        setSyncScore,
        mediapipeOfTrainee,
        upcomingMeetingToNow, setUpcomingMeetingToNow,
        callTrainee, setCallTrainee,

        sendPosesByPeers,
        poseFarFrame,
        accseptPeer2ScheduleMeetingCall, setAccseptPeer2ScheduleMeetingCall,

        activeMeetingPopUp, setActiveMeetingPopUp,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
export { ContextProvider, SocketContext };
