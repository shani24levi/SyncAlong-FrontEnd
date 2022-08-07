import React, { useContext, useState, useEffect, useRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import commponents
import VideoContext from '../Context/videoChat/VideoContext';
import ScrollTop from '../scrollToTop/ScrollTop';
import ErrorAlert from '../alrets/ErrorAlert';

function VideoRoom({ socket }) {
  const {
    erorrWithPeerConection,
    setMyRole,
    setRoomId,
    setMySocketId,
    setYourSocketId,
    setYourInfo,
    setMyName,
    setYourName
  } = useContext(SocketContext);
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  /* Definition of the users (who is who) by the data of the meeting that is passing */
  const [me, setMe] = useState(
    user.role === 'trainer'
      ? location.state.meeting.tariner
      : location.state.meeting.tariner
  );
  const [you, setYou] = useState(
    user.role === 'trainee'
      ? location.state.meeting.trainee
      : location.state.meeting.tariner
  );

  useEffect(() => {
    if (!user) return;
    setRoomId(location.state.meeting._id);
    if (user?._id === location.state.meeting.tariner._id) {
      setMe(location.state.meeting.tariner);
      setYou(location.state.meeting.trainee);
      // console.log('me trainer');
    } else {
      setMe(location.state.meeting.trainee);
      setYou(location.state.meeting.tariner);
      // console.log('me traineee');
    }
  }, []);

  useEffect(() => {
    if (!me && !you && !socket) return;
    //set elemets to pather of context
    me && setMyName(me?.user);
    you && setYourName(you?.user);
    you && setYourInfo(you);
    me && setMyRole(me?.role);

    //get my socket id
    if (me?._id === you?._id) return;
    socket?.emit('getSocketId', me?._id, (user) => { setMySocketId(user?.socketId); });
    //get your socket id
    socket?.emit('getSocketId', you?._id, (user) => { setYourSocketId(user?.socketId); });
  }, [me, you]);

  return (
    <>
      {erorrWithPeerConection && <ErrorAlert title={'Error connecting Peer'} />}
      <div id="back-to-top-anchor" />
      <VideoContext meeting={location.state.meeting} />
      <ScrollTop />
    </>
  );
}

export default VideoRoom;
