// for login users
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProfile, getTraineesProfiles, getAllTraineesProfiles } from '../../Store/actions/profileAction';
import { futureMeetings } from '../../Store/actions/meetingActions';
import TrainerHome from '../home/TrainerHome';
import TraineeHome from '../home/TraineeHome';

const Home = ({ socket }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.profile);
    const meetings = useSelector(state => state.meetings);
    const [upcamingMeeting, setUpcamingMeeting] = useState({});
    const [scheduleMeetingPopUpCall, setScheduleMeetingPopUpCall] = useState({});

    ///call to set state of user and profile 
    useEffect(() => {
        user?._id && socket?.emit("addUser", user?._id);
        user?._id && profile?.profile === null && dispatch(setCurrentProfile());
    }, [user]);

    useEffect(() => {
        if (profile.profile) {
            //get trinees
            user?.role === 'trainer' && profile?.profile?.trainerOf.length !== 0 && !profile?.trainee_profile_called && dispatch(getAllTraineesProfiles());
            //get future Meetings
            dispatch(futureMeetings());
        }
    }, [profile.profile]);

    return (
        <>
            {
                user.role === 'trainer'
                    ?
                    <TrainerHome upcamingMeeting={upcamingMeeting} scheduleMeetingPopUpCall={scheduleMeetingPopUpCall} />
                    :
                    <TraineeHome upcamingMeeting={upcamingMeeting} scheduleMeetingPopUpCall={scheduleMeetingPopUpCall} />
            }
        </>
    )
}

export default Home
