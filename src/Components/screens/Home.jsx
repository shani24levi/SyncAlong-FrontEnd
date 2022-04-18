// for login users
import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMeetings, setActiveMeeting } from '../../Store/actions/meetingActions';
import { setCurrentProfile, getTraineesProfiles, getAllTraineesProfiles } from '../../Store/actions/profileAction';
import { futureMeetings } from '../../Store/actions/meetingActions';
import PopUpCall from '../popupCall/PopUpCall';
import ErrorAlert from '../alrets/ErrorAlert';
import TrainerHome from '../home/TrainerHome';
import TraineeHome from '../home/TraineeHome';
import WorningAlert from '../alrets/WorningAlert';
import isEmpty from '../../validation/isEmpty';
import SeccsesAlert from '../alrets/SeccsesAlert';
import { delay } from '../../helpers';
import ScrollTop from '../scrollToTop/ScrollTop';
import ReConectCall from '../popupCall/ReConectCall';

const Home = ({ socket }) => {
    const { setYourSocketId, yourSocketId, upcamingMeeting, traineeEntered, setMyTraineeEntered, scheduleMeetingPopUpCall } = useContext(SocketContext);
    // const scheduleMeetingPopUpCall = { id: 'ddd', trainee: { user: 'nam2', avatar: '22' }, trainer: { user: 'name1', avatar: '233' } }
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.profile);
    const meetings = useSelector(state => state.meetings);

    const [meeting, setMeeting] = useState(false);
    const [date, setDate] = useState(0);
    const [dateToMeeting, setDateToMeeting] = useState(0);

    const [trineeOnline, setTrineeOnline] = useState({});

    ///call to set state of user and profile 
    useEffect(() => {
        user?._id && socket?.emit("addUser", user?._id);
        user?._id && user?.profile_id && profile?.profile === null && dispatch(setCurrentProfile());
    }, [user]);

    useEffect(() => {
        if (profile.profile) {
            //get trinees
            user?.role === 'trainer' && profile?.profile?.trainerOf.length !== 0 && !profile?.trainee_profile_called && dispatch(getAllTraineesProfiles());
            //get future Meetings
            dispatch(futureMeetings());

            if (!meetings.all_meetings || isEmpty(meetings.all_meetings)) {
                dispatch(getAllMeetings());
            }
        }
    }, [profile.profile]);

    useEffect(async () => {
        if (traineeEntered) {
            let user_entered = profile.trainees_profiles.find(trinee => {
                if (trinee.user._id === traineeEntered) return trinee.user;
            })
            if (user_entered) {
                setTrineeOnline(user_entered);
                await delay(10000);
                setMyTraineeEntered(null)
                setTrineeOnline({});
            }
        }
    }, [traineeEntered]);

    useEffect(() => {
        if (!isEmpty(meetings.upcoming_meeting)) {
            console.log(meetings.upcoming_meeting);
            console.log(meetings.upcoming_meeting?.date);
            const t = new Date(meetings.upcoming_meeting?.date)//?.slice(0, -1));
            // t.setHours(t.getHours() + 3);
            setDateToMeeting(t);

            // const t2 = new Date(meetings.upcoming_meeting?.date)
            // t2.setHours(t2.getHours() - 3);
            // setDate(t2.getTime() / 1000)
            setDate(t.getTime() / 1000)
            setMeeting(true)
        }
        else setMeeting(false)
    }, [meetings.upcoming_meeting])

    useEffect(() => {
        if (!isEmpty(meetings.active_meeting)) {
            //chack the this meeting is valid - today only
            let today = new Date();
            console.log(today.getDate(), new Date(meetings.active_meeting.date).getDate());
            // if (today.getDate() !== new Date(meetings.active_meeting.date).getDate()) {
            //     //NOT TODAY and Not closed meeting - then close this meeting,,,,
            //     dispatch(setActiveMeeting(meetings.active_meeting, false));
            //     return;
            // }
            // else {
            let you = user?._id === meetings.active_meeting.trainee._id ? meetings.active_meeting.tariner._id : meetings.active_meeting.trainee._id
            console.log('you', you);
            you && socket?.emit("getSocketId", you, user => {
                console.log('getSocketId', you, user);
                if (user?.socketId)
                    setYourSocketId(user?.socketId)
                else {
                    //or lising for yoursocket id and when its updates then pop up 
                    //or close the meeting...
                    //dispach(setActiveMeeting(meeing, fals)) //close meeting
                }
            });
            //  }
        }
    }, [meetings.active_meeting])

    return (
        <>
            <div id="back-to-top-anchor" />
            {!isEmpty(scheduleMeetingPopUpCall) && <PopUpCall />}
            {!isEmpty(meetings.active_meeting) && !isEmpty(yourSocketId) && <ReConectCall />}
            {user?._id && !user?.profile_id && <ErrorAlert title="Please set up profile details" />}
            {!meetings.meetings && (isEmpty(upcamingMeeting) || !upcamingMeeting) && <WorningAlert title="No futuer meetings found" />}
            {!isEmpty(trineeOnline.user) && <SeccsesAlert name={trineeOnline.user.user} title=' is online' />}
            {
                user.role === 'trainer'
                    ?
                    <TrainerHome meeting={meeting} date={date} dateToMeeting={dateToMeeting} />
                    :
                    <TraineeHome meeting={meeting} date={date} />
            }
            <ScrollTop />
        </>
    )
}

export default Home
