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

const Home = ({ socket }) => {
    const { scheduleMeetingPopUpCall, upcamingMeeting } = useContext(SocketContext);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.profile);
    const meetings = useSelector(state => state.meetings);

    const [meeting, setMeeting] = useState(false);
    const [date, setDate] = useState(0);

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

    useEffect(() => {
        if (upcamingMeeting) {
            const t = new Date(meetings.upcoming_meeting?.date?.slice(0, -1));
            setDate(t.getTime() / 1000)
            setMeeting(true)
        }
        else setMeeting(false)
    }, [upcamingMeeting])

    return (
        <>
            <PopUpCall />
            {!user?.profile_id && <ErrorAlert title="Please set up profile details" />}
            {!upcamingMeeting && <WorningAlert title="No futuer meetings found" />}
            {
                user.role === 'trainer'
                    ?
                    <TrainerHome meeting={meeting} date={date} />
                    :
                    <TraineeHome meeting={meeting} date={date} />
            }
        </>
    )
}

export default Home
