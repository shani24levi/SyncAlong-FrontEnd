// for login users
import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux';
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

const Home = ({ socket }) => {
    const { upcamingMeeting, traineeEntered, setMyTraineeEntered, scheduleMeetingPopUpCall } = useContext(SocketContext);
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
            const t = new Date(meetings.upcoming_meeting?.date?.slice(0, -1));
            t.setHours(t.getHours() + 3);
            setDateToMeeting(t);
            setDate(t.getTime() / 1000)
            setMeeting(true)
        }
        else setMeeting(false)
    }, [meetings.upcoming_meeting])

    return (
        <>
            <div id="back-to-top-anchor" />
            {!isEmpty(scheduleMeetingPopUpCall) && <PopUpCall />}
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
