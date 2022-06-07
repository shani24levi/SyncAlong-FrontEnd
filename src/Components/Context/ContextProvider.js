import React, { createContext, useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeActiveMeeting, setComplitedWithUrl, setMeetingComplited, upateUpComingMeeting } from '../../Store/actions/meetingActions';
import { clearLogoutREC } from '../../Store/actions/recordingActions';
import Peer from 'simple-peer/simplepeer.min.js';
import { Holistic } from '@mediapipe/holistic';
import * as holistic from '@mediapipe/holistic';
import * as cam from '@mediapipe/camera_utils';
import isEmpty from '../../validation/isEmpty';
import mediaPipeLandmarks from './mediaPipeLandmarks';
import draw from './DrawAnimation/draw';
import { delay } from '../../helpers';
const SYNC = 0.8;
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
  const activeMeeting = useSelector((state) => state.meetings.active_meeting);
  const [yourId, setYourId] = useState('');
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [myName, setMyName] = useState('');
  const [yourName, setYourName] = useState('');
  const [call, setCall] = useState({});
  const [mySocketId, setMySocketId] = useState(null);
  const [yourSocketId, setYourSocketId] = useState(null);
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
  const [meetingClosedByPeer, setMeetingClosedByPeer] = useState(false);


  const [prossingEndMeeting, setProssingEndMeeting] = useState(false);
  const [errorUserLeft, setErrorUserLeft] = useState(false);
  const [callQuickMeeting, setCallQuickMeeting] = useState(null);
  const [peerInDelay, setPeerInDelay] = useState(false);
  const [updateMeetingAlrt, setUpdateMeetingAlrt] = useState(false);

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
  const [mediapipeOfTrainer, setMediapipeOfTrainer] = useState(false);
  const [upcomingMeetingToNow, setUpcomingMeetingToNow] = useState(false);
  const [callTrainee, setCallTrainee] = useState(false);
  const [activeMeetingPopUp, setActiveMeetingPopUp] = useState(false);
  const [peerStateConected, setPeerStateConected] = useState(null);
  const [erorrWithPeerConection, setErorrWithPeerConection] = useState(false);
  const [myState, setMyState] = useState(null);
  const [startingDelay, setStartingDelay] = useState(false);
  const [currActivity, setCurrActivity] = useState(0);
  const [OneTimeCall, setOneTimeCall] = useState(true);

  const [ARdisplay, setARdisplay] = useState(false);
  const ARdisplayRef = useRef(ARdisplay);
  ARdisplayRef.current = ARdisplay;

  const [frameN, setFrameNum] = useState(0);
  const frameNum = useRef(frameN);
  frameNum.current = frameN;

  const [frame, setFrame] = useState(0);
  const myStateRef = useRef(myState);
  myStateRef.current = myState;

  const frameeRef = useRef(frame);
  frameeRef.current = frame;

  const peerStateConectedRef = useRef(peerStateConected);
  peerStateConectedRef.current = peerStateConected;

  const [emoji, setEmoji] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const connect = window.drawConnectors;
  let camera = null;
  const myCanvasRef = useRef();
  const userCanvasRef = useRef();
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
    setPose_Results(results);
  };

  const calculatingUserInFrame = (results) => {
    let inframe = true;
    if (peer1inFrame) return inframe;
    if (!results.poseLandmarks || results.poseLandmarks?.length == 0)
      return inframe;

    results.poseLandmarks.map((i, body_index) => {
      if (
        i.visibility < 0.6 &&
        (mediaPipeLandmarks('RIGHR_SHOULDER') === body_index ||
          mediaPipeLandmarks('LEFT_SHOULDER') === body_index ||
          mediaPipeLandmarks('RIGHR_HIP') === body_index ||
          mediaPipeLandmarks('LEFT_HIP') === body_index ||
          mediaPipeLandmarks('RIGHR_KNEE') === body_index ||
          mediaPipeLandmarks('LEFT_KNEE') === body_index)
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
    if (syncScoreRef?.current >= SYNC) return true;
    return false;
  };

  const now_activity = () => {
    return activity_now_ref.current;
  };

  useEffect(() => {
    if (pose_results) {
      if (peer) {
        poseLandmarks_ref.current = pose_results.poseLandmarks;
        peer?.emit('connect');
      }
    }
  }, [pose_results]);

  const onResults2 = async (results) => {
    const videoWidth = 640;
    const videoHeight = 480;

    if (userCanvasRef.current === undefined || userCanvasRef.current == null) return;
    // Set canvas width
    userCanvasRef.current.width = videoWidth;
    userCanvasRef.current.height = videoHeight;
    const canvasElement = userCanvasRef.current;

    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(userVideo.current, 0, 0, canvasElement.width, canvasElement.height);

    let inframe = calculatingUserInFrame(results);
    let syncing = is_sync();
    let activity = now_activity();
    if (syncScoreRef?.current < SYNC) {
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = 'rgba(255,0,0,0.1)';
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(userVideo.current, 0, 0, canvasElement.width, canvasElement.height);
      //drow only when seting modal is initilize and when not user in fram
      canvasCtx.globalCompositeOperation = 'source-over';
    }

    if (syncScoreRef?.current >= SYNC) {
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
      canvasCtx.fillStyle = 'rgba(255, 0, 0, 0.3)';
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(userVideo.current, 0, 0, canvasElement.width, canvasElement.height);
      //drow only when seting modal is initilize and when not user in fram
      canvasCtx.globalCompositeOperation = 'source-over';
    }

    if (results) {
      if (syncScoreRef?.current >= SYNC)
        results.poseLandmarks && draw(canvasCtx, canvasElement, results, activity, "you");
    }
    canvasCtx.restore();
  };

  const onResults = async (results) => {
    const videoWidth = 640;
    const videoHeight = 480;

    setMediaPipeInitilaize('none');

    // if (results && results.faceLandmarks) {
    //   results.poseLandmarks.push(results.faceLandmarks[10]); //results.poseLandmarks[33]
    //   results.poseLandmarks.push(results.faceLandmarks[152]); //results.poseLandmarks[34]
    //   results.poseLandmarks.push(results.faceLandmarks[454]); //results.poseLandmarks[35]
    //   results.poseLandmarks.push(results.faceLandmarks[234]); //results.poseLandmarks[36]
    //   results.poseLandmarks.push(results.faceLandmarks[0]); //results.poseLandmarks[37]
    //   results.poseLandmarks.push(results.faceLandmarks[18]); //results.poseLandmarks[38]
    //   results.poseLandmarks.push(results.faceLandmarks[8]); //results.poseLandmarks[39]
    //   results.poseLandmarks.push(results.faceLandmarks[6]); //results.poseLandmarks[40]
    //   results.poseLandmarks.push(results.faceLandmarks[51]); //results.poseLandmarks[41]
    //   results.poseLandmarks.push(results.faceLandmarks[57]); //results.poseLandmarks[42]
    //   results.poseLandmarks.push(results.faceLandmarks[60]); //results.poseLandmarks[43]
    //   results.poseLandmarks.push(results.faceLandmarks[64]); //results.poseLandmarks[44] 
    // }
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
    if (syncScoreRef?.current < SYNC) {
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = 'rgba(255,0,0,0.1)';
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
      //drow only when seting modal is initilize and when not user in fram
      canvasCtx.globalCompositeOperation = 'source-over';
    }

    if (syncScoreRef?.current >= SYNC) {
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
      canvasCtx.fillStyle = 'rgba(255, 0, 0, 0.3)';
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
      //drow only when seting modal is initilize and when not user in fram
      canvasCtx.globalCompositeOperation = 'source-over';
    }

    // console.log('results', results);

    if (results) {
      if (syncScoreRef?.current >= SYNC)
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
    console.log('create mediapipe');
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
      console.log('start camera for mediapipe', video.current.video)
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
    socket?.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    lisiningForNewUsers();
    lisiningForCamingCalls();
    lisiningResivingPoses();
    lisiningResivingSyncScore();
    lisiningResponsUsersInRoom();
    lisiningNotifications();
    !peer2inFrame && lisiningPeer2InFrame();
    lisiningMediaPipe();
    lisiningTraineeCall();
    lisiningAccseptScheduleMeetingCall();
    lisiningForDisconectPeerInRoom();
    lisiningRoomClosedDeclining();
    //lisiningForConnected();
    //lisiningReConected();
    lisiningStatePeer();
    lisiningMeetingComplited();
    calltoTraineeQuickMeeting();
    lisiningUpdateUpcomingMeeting();
  }, [socket]);

  useEffect(() => {
    console.log('stream', stream);
    if (!stream) {
      // camera && camera.stop();
      return;
    }
    if (location.pathname !== '/video-room') {
      console.log('stream return');
      // camera && camera.stop();
      return;
    }
    myVideo.current.srcObject = stream;
    myVideo.current?.srcObject && setHolistic(myVideo);
  }, [stream]);

  useEffect(() => {
    console.log('FyourId', yourId, yourInfo);
  }, [yourId]);


  useEffect(() => {
    //The one who receives the points of the other and is responsible for sending to the server the request for synchronization
    if (yourDataResived) {
      let found_el = null;
      console.log(
        'yourDataResived.end_time_of_colection',
        yourDataResived.end_time_of_colection,
        typeof yourDataResived.end_time_of_colection
      );
      let time = new Date().toLocaleString('en-GB');
      console.log('yourDataResived', new Date().toLocaleString('en-GB'), new Date(time).getMilliseconds());


      //get the same time of poses as you
      console.log('my_array_poses', array_poses);

      if (array_poses.length >= 2) {
        if (array_poses[array_poses.length - 2].time === yourDataResived.end_time_of_colection) {
          found_el = array_poses[array_poses.length - 2];
        }
        else {
          found_el = array_poses[array_poses.length - 1];
        }
      }
      else found_el = array_poses[array_poses.length - 1];


      console.log('posesArry now...found_el...', found_el);
      //send me & you data to socket for sync calculation
      console.log('start sendOurPoses', new Date().toLocaleString('en-GB'), new Date().getMilliseconds());
      found_el &&
        socket.emit('sendOurPoses', {
          me: found_el,
          you: yourDataResived,
          activity: yourDataResived.activity,
          time: yourDataResived.end_time_of_colection,
          roomId
        });
      console.log('end sendOurPoses', new Date().toLocaleString('en-GB'), new Date().getMilliseconds());

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
      if (recognition === 'start') {
        setStartingDelay(true);
      }
      console.log('recognition', recognition);
      let data = {
        from: mySocketId,
        to: yourSocketId,
        notification: recognition,
        time: new Date().toLocaleString(),
        roomId
      };
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

    if (mediaPipeInitilaize === 'none' && oneTime && myRole === 'trainer') {
      setOneTime(false);
      socket?.emit('t-trainer', { yourSocketId, roomId });
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
            // return;
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

  //for moving from pages and whanting to update when the recirding of meeting has been comploted.....
  //it is here becouse i wants it to appen any page.
  const recording = useSelector((state) => state.recording);
  useEffect(async () => {
    if (recording?.meeting && recording?.recording) {
      //find this meeting in the complited_list
      console.log('recording?.meeting', recording?.meeting, meetings.meetings_complited.length);
      if (meetings.meetings_complited.length !== 0 && user.role === 'trainer') {
        let meeting = meetings.meetings_complited.find(el => el._id === recording?.meeting)
        //update the start of meetings 
        console.log('meeting', meeting);

        //updats the peer if his here
        socket?.emit("getSocketId", meeting.trainee._id, user => {
          console.log('getSocketId', meeting.trainee._id, user);
          let data = {
            to: user.socketId,
            meeting: meeting,
            recording: recording?.recording,
            dateEnd: recording.dateEnd
          }
          console.log('datameetingComplited', data);
          socket?.emit("meetingComplited", data);
        });

        dispatch(setComplitedWithUrl(meeting, { status: false, urlRoom: recording.recording, dateEnd: recording.dateEnd }));
        dispatch(clearLogoutREC());
      }
    }
  }, [recording])


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
    console.log("upcamingMeeting1111", upcamingMeeting, 'meetings', meetings);
    if (!isEmpty(meetings.meeeting_created) && !isEmpty(meetings.upcoming_meeting) && meetings.upcoming_meeting?._id === meetings.meeeting_created._id) {
      //this is a neww upcaming meeting that the user taninee set now???
      console.log("upcamingMeetingupcamingMeeting", upcamingMeeting, "user.role", user.role);
      //get the user socket and send to you the changes....
      user.role === 'trainer' && socket?.emit("getSocketId", meetings.upcoming_meeting.trainee._id, user => {
        console.log("getSocketIduser", user);
        if (!isEmpty(user.socketId)) {
          let data = {
            to: user.socketId,
            meeting: meetings.upcoming_meeting,
          }
          console.log('data', data, "user.role", user.role);
          socket?.emit("updateUpcomingMeeting", data);
        }
      });
    }
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
  const calltoTraineeQuickMeeting = () => {
    socket?.on('calltoTraineeQuickMeeting', (quickMeeting) => {
      console.log('quickMeeting', quickMeeting);
      //need to update tarinee meeting starte befor set up the calll.....
      setCallQuickMeeting(quickMeeting)
      //setCallTrainee(true);
    });
  }

  const lisiningUpdateUpcomingMeeting = () => {
    socket?.on('updateUpcomingMeeting', (data) => {
      console.log('updateUpcomingMeeting', data);
      dispatch(upateUpComingMeeting(data.meeting));
      setUpdateMeetingAlrt(true);
    });
  }

  const lisiningForNewUsers = () => {
    //lisinig for changes in the array of users caming in to the app
    socket?.on('getNewUserAddToApp', (user) => {
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
        'resiving time of your data at:',
        new Date().toLocaleString('en-GB')
      );
      console.log(new Date().toLocaleString('en-GB'), new Date().getMilliseconds());
      setYourDataResived(data);
    });
  };

  const lisiningResivingSyncScore = () => {
    socket?.on('syncScore', (sync_score) => {
      console.log('///...score.../// now:', syncScoreRef.current, "new : ", sync_score);
      if (!ARdisplayRef.current && syncScoreRef.current !== 0) {
        setSyncScore(0);
        return;
      }
      if (!ARdisplayRef.current) return;
      if (syncScoreRef.current >= SYNC && sync_score <= SYNC ||
        syncScoreRef.current <= SYNC && sync_score >= SYNC
      ) {
        // console.log(syncScoreRef.current, ">= SYNC &&", sync_score, "<= SYNC ||",
        //   syncScoreRef.current, "<= SYNC &&", sync_score, ">= SYNC");
        // console.log("frame::::", frameeRef.current, frame);
        if (frameeRef.current === 2) {
          //  console.log("frameeRef.current", frameeRef.current);
          setSyncScore(sync_score);
          setFrame(0);
        }
        setFrame(frameeRef.current + 1);
      }
      else setSyncScore(sync_score);
      // console.log(new Date().toLocaleString('en-GB'), new Date().getMilliseconds());
    });
    //for eyal
    socket?.on('resivingSyncScoure', (sync_score) => {
      console.log('///...score.../// now:', syncScoreRef.current, "new : ", sync_score);
      console.log('////resivingSyncScoure ..', new Date().toLocaleString('en-GB'), new Date().getMilliseconds());

      if (syncScoreRef.current === 0) { //first init
        setSyncScore(sync_score);
        return;
      }
      if (syncScoreRef.current >= SYNC && sync_score <= SYNC ||
        syncScoreRef.current <= SYNC && sync_score >= SYNC
      ) {
        console.log(syncScoreRef.current, ">= SYNC &&", sync_score, "<= SYNC ||",
          syncScoreRef.current, "<= SYNC &&", sync_score, ">= SYNC",
          "frameeRef.current", frameeRef.current);
        console.log("frameeRef.current", frameeRef.current);

        if (frameeRef.current === 5) {
          console.log("frameeRef.current", frameeRef.current);
          setSyncScore(sync_score);
          setFrame(0);
        }
        setFrame(frameeRef.current + 1);
      }
      else {
        setSyncScore(sync_score);
        frameeRef.current !== 0 && setFrame(0);
      }
    });
  };

  const lisiningNotifications = () => {
    socket?.on('notification', (notification) => {
      //console.log('notification..notification..notification ', notification);
      setRecognition(notification);
      if (notification === 'start') {
        setPeerInDelay(true);
      }
      if (notification === 'leave') {
        setProssingEndMeeting(true);
      }
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

    socket?.on('t-trainer', (id) => {
      console.log(id);
      setMediapipeOfTrainer(id);
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
      console.log('accseptScheduleMeetingCall of you', id);
      setAccseptPeer2ScheduleMeetingCall(id);
    });
  };

  const lisiningResponsUsersInRoom = () => {
    socket?.on('responsRoomId', (res) => {
      console.log('responsRoomId ', res);
    });
  };
  let indexReconnect = 0;
  const lisiningForDisconectPeerInRoom = () => {
    let mypeer = null;
    if (!isEmpty(meetings.active_meeting)) mypeer = user.role === 'trainer' ? meetings.active_meeting.trainee._id : meetings.active_meeting.tariner._id
    //whan im left the socket and im in a sstion then reconect me and continue
    socket?.on("disconnected", (reason) => {
      console.log("disconnect", reason);
      if (reason === "ping timeout" || reason === "transport error") {
        if (callAccepted) {
          socket?.connect();
          let userId = user._id
          let roomId = meetings.active_meeting._id
          console.log('reconnect now');
          socket?.emit('reconect', (userId, roomId));
        }
      }
    });

    socket?.on("reconect", (users) => {
      let id = user?._id
      indexReconnect++;
      console.log("indexReconnect", indexReconnect)
      if (users.length === 1 && indexReconnect < 2) {
        socket?.emit('reconect', (users[0].userId, roomId));
      }
      else if (users.length === 1 && indexReconnect === 2) {
        indexReconnect = 0;
        leaveCall();
        navigate('/home', { state: { meeting_id: roomId, me: myName, you: yourName } });
      }
      else {
        indexReconnect = 0;
        users.forEach(user => {
          if (user.userId === id) setMySocketId(user.socketId);
          else setYourSocketId(user.socketId);
        })
        setOneTime(true);

        //when im in the room waiting 
        //you come in - you dont have my accsept
        //i tall you agin 
        console.log("c", location.pathname, user.role);
        //if (location.pathname === '/video-room') {
        if (user.role === 'trainee') {
          //all states are cleard when you left the meeting
          console.log('i accsept Schedule MeetingCall to', yourSocketId);
          socket?.emit('accseptScheduleMeetingCall', yourSocketId);
          socket?.emit('t', { yourSocketId, roomId });
        }
        if (user.role === 'trainer') {
          //all states are cleard when you left the meeting
          socket?.emit('accseptScheduleMeetingCall', yourSocketId);
        }
        // }
        // else {
        //   console.log("auto leave");
        //   leaveCall();
        //   navigate('/home', { state: { meeting_id: roomId, me: myName, you: yourName } });
        // }
      }
    });
  };

  const lisiningRoomClosedDeclining = () => {
    //TO DO - case im not in the room then im not getting this 
    // and i can be on my way to the room .... and not be notifyied by this .
    socket?.on('closeRoomByDeclining', (data) => {
      console.log('closeRoomByDeclining ', location.pathname, data.roomId);
      setMeetingClosedByPeer(true);
      //  if (meetings.active_meeting._id === data.roomId) {
      setYourSocketId(null);
      dispatch(closeActiveMeeting());
      navigate(`/home`);

      // if (location.pathname === '/video-room') {
      //   console.log('sslsllsls');
      //   leaveCall();
      //   navigate(`/home`);
      // }
      //}
      return;
    });
  };

  // const lisiningReConected = () => {
  //   let id = user?._id
  //   socket?.on('reconect', (users) => {
  //     console.log('reconect ', users, user, id);
  //     if (location.pathname !== '/video-room') {
  //       users.forEach(user => {
  //         console.log('reconect foreach ', user.userId, id);
  //         if (user.userId === id) setMySocketId(user.socketId);
  //         else setYourSocketId(user.socketId);
  //       })
  //       setOneTime(true);
  //     }
  //     else {
  //       leaveCall();
  //       navigate('/home', { state: { meeting_id: roomId, me: myName, you: yourName } });
  //     }
  //   });
  // };

  const lisiningStatePeer = () => {
    socket?.on('statePeer', (state) => {
      console.log('state of you is: ', state);
      setPeerStateConected(state)
    });
  };

  const lisiningMeetingComplited = () => {
    socket?.on('meetingComplited', (data) => {
      console.log('meetingComplited', data);
      dispatch(setComplitedWithUrl(data.meeting, { status: false, urlRoom: data.recording, dateEnd: data.dateEnd }));
    });
  };

  //===================socket calls when user in room and whant to call============================//
  const answerCall = () => {
    let flagChannel = false;
    let time = new Date();
    let timeEnd = time.setMinutes(time.getMinutes() + 2);
    console.log('answerCall');
    setCallAccepted(true);

    //set me as a peer and difiend my data
    const peer = new Peer({ initiator: false, trickle: false, stream });
    setMeAsPeer(peer);
    //peer._debug = console.log;
    // 
    peer.on('error', (err) => {
      console.log('error with peer', err);
      console.log('peer', peer);
      answerCall();
    });

    peer.on('data', (data) => {
      data = JSON.parse(data);
      onResults2({ poseLandmarks: data });
    });
    peer.on('connect', () => {
      let state = peer._pc?.iceConnectionState;

      let data = { state, yourSocketId }
      if (myStateRef?.current !== state) {
        setMyState(state);
        socket?.emit("statePeer", data);
      }
      
      if ( 
        peerStateConectedRef?.current === 'connected' && state == 'connected' && 
        peer && peer?._channel && peer?._channel?.readyState === "open"
      ) {//i want see what perspectiveOrigin: i
        //console.log("you", peerStateConectedRef.current);
        //console.log("me", state);
        flagChannel = true;
        // console.log(`peer send`)
        peer && peer?.send(JSON.stringify(poseLandmarks_ref.current));
      }
      else if (
        (state === 'connected' && peerStateConectedRef.current !== 'connected') ||
        (state !== 'connected' && peerStateConectedRef.current === 'connected')) {
        console.log("peerStateConected state p", peerStateConected, state, peer);
        let waitingTime = true;
        while (waitingTime && (state !== 'connected' || peerStateConectedRef.current !== 'connected')) {
          let currTime = new Date().getTime();
          let date = new Date();
          date.getMinutes(date.getMinutes() + 2);
          let timeIn10sec = date.getTime();

          if (currTime >= timeIn10sec) waitingTime = false;
        }

        if (!waitingTime && (state !== 'connected' && peerStateConectedRef.current !== 'connected')) {
          setErorrWithPeerConection(true);
          //set the meeting back to futer meeting and not as active meeting...
          //dispach(setActiveMeeting(meeting,false))
          //leaveCall();
          //navigate('/home')
        }
      }
      else{
        // console.log(`peer error:`, JSON.stringify(peer), peer?._channel?.label,peer?._channel?.readyState, JSON.stringify(peer?.config))
        //console.log("peer error");
        if(new Date().getTime() >= new Date(timeEnd).getTime() && !flagChannel){
          // console.log("go home")
          setErorrWithPeerConection(true);
        } else {
          // console.log("waiting")
        }
      }
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
    let flagChannel = false;
    let time = new Date();
    let timeEnd = time.setMinutes(time.getMinutes() + 2);
    let tryingConect = 0;
    const peer = new Peer({ initiator: true, trickle: false, stream });
    setMeAsPeer(peer);

    peer.on('error', (err) => {
      console.log('error with peer', err);
      console.log('peer', peer);
      callUser();
    });

    peer.on('data', (data) => {
      data = JSON.parse(data);
      onResults2({ poseLandmarks: data });
    });
    peer.on('connect', () => {
      let state = peer._pc?.iceConnectionState;
      //im tal you my state of peer 
      let data = { state, yourSocketId }

      if (myStateRef?.current !== state) {
        setMyState(state);
        socket?.emit("statePeer", data);
      }
      if (
        peerStateConectedRef?.current === 'connected' && state == 'connected' && 
        peer && peer?._channel && peer?._channel?.readyState === "open"
      ){
        // console.log(`peer send`)
        flagChannel = true
        peer && peer?.send(JSON.stringify(poseLandmarks_ref.current));
      }
      else if (
        (state === 'connected' && peerStateConectedRef.current !== 'connected') ||
        (state !== 'connected' && peerStateConectedRef.current === 'connected')) {
        // console.log('peerStateConected state p', peerStateConectedRef.current, state, peer);
        tryingConect = tryingConect + 1;

        // let waitingTime = true;
        // while (waitingTime && (state !== 'connected' || peerStateConectedRef.current !== 'connected')) {
        //   let currTime = new Date().getTime();
        //   let date = new Date();
        //   date.getMinutes(date.getMinutes() + 2);
        //   let timeIn10sec = date.getTime();

        //   if (currTime >= timeIn10sec) waitingTime = false;
        // }

        if (tryingConect === 60) {
          tryingConect = 0;
          setErorrWithPeerConection(true);
          //set the meeting back to futer meeting and not as active meeting...
          //dispach(setActiveMeeting(meeting,false))
          //leaveCall();
          // navigate('/home')
        }
      }
      else{
        // console.log(`peer error:`, JSON.stringify(peer), peer?._channel?.label,peer?._channel?.readyState, JSON.stringify(peer?.config))
        // console.log("peer error");
        if(new Date().getTime() >= new Date(timeEnd).getTime() && !flagChannel){
          // console.log("go home")
          setErorrWithPeerConection(true);
        } else {
          // console.log("waiting")
        }
      }
    }
    );

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
    connectionRef.current && connectionRef.current.destroy();
    // stop both video and audio
    // stream.getTracks().forEach(function (track) {
    //   track.stop();
    // });
    clearRoomStates();
    // window.location.reload();
  };

  const peerClose = () => {
    console.log('peer close');
    //setPeerStateConected(null);
    // connectionRef.current.destroy();
    // connectionRef.current = null;
    //connectionRef.current.close();
  }
  //===================socket calls when meeting in now============================//
  //===================pop up to bouth===========================//
  //===================socket for sync func============================//
  const sendMyPoses = async (time, poses, activity) => {
    let start = new Date().toLocaleString('en-GB');
    console.log(new Date().toLocaleString('en-GB'), new Date().getMilliseconds());
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
    console.log(new Date().toLocaleString('en-GB'), new Date().getMilliseconds());
  };

  const sendPosesByPeers = async (dataTo, activity) => {
    setFrameNum(frameN + 1);
    // console.log("frameNum.current", frameNum.current);
    let data = {
      poses: dataTo.poses,
      time: dataTo.time,
      frameNum: frameNum.current
    };
    //let frameNum = frameNum.current;
    //console.log(new Date().toLocaleString('en-GB'), new Date().getMilliseconds());
    //  let trainer = peerInDelay; 
    let trainer = myRole === 'trainer' ? true : false;

    console.log('////sending ..', data, new Date().toLocaleString('en-GB'), new Date().getMilliseconds());
    socket.emit('sendPosesByPeers', data, mySocketId, yourSocketId, trainer, activity, roomId, { frameNum: frameNum.current });
    //console.log(new Date().toLocaleString('en-GB'), new Date().getMilliseconds());
  }

  const clearRoomStates = () => {
    setSettingUserInFrame(false);
    setPeer2inFrame(false);
    setfirstTimeInFram(true);

    setAccseptScheduleMeetingCall(false);
    setAccseptPeer2ScheduleMeetingCall(false);
    //setConectReq(false);
    //setOneTime(true);
    //setMediapipeOfTrainee(false);
    //setUpcomingMeetingToNow(false);
    //setCallTrainee(false);

    setCallAccepted(false);
    setCallEnded(false);
    //setStream(null);
    //setMyName('');
    //setYourName('');
    setCall({});
    setMySocketId(null);
    setYourSocketId(null);
    //setYourInfo({});
    //setRoomId(null);
    //setStartMeeting(false);
    //setPosesArry([]);
    //setMyRole(null);
    //setYourDataResived(null);
    //setSyncScore(null);
    //setActivityNow(null);
    //setIsModalVisible(true);
    //setMediaPipeInitilaize('');
    //setMeAsPeer(null);
    setRecognition(null);
    setProssingEndMeeting(false);
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
        erorrWithPeerConection, setErorrWithPeerConection,
        prossingEndMeeting, setProssingEndMeeting,

        syncScoreRef,

        errorUserLeft, setErrorUserLeft,
        setYourId,
        startingDelay, setStartingDelay,
        currActivity, setCurrActivity,
        OneTimeCall, setOneTimeCall,
        peerClose,
        mediapipeOfTrainer, setMediapipeOfTrainer,
        setMediapipeOfTrainee, setCallAccepted, setCall,
        callQuickMeeting, setCallQuickMeeting,
        peerInDelay,
        updateMeetingAlrt, setUpdateMeetingAlrt,

        setARdisplay,
        meetingClosedByPeer, setMeetingClosedByPeer,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
export { ContextProvider, SocketContext };
