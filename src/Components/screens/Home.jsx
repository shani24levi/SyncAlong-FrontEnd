// for login users
import React from 'react';
import { useSelector } from 'react-redux';
import TrainerHome from '../home/TrainerHome';
import TraineeHome from '../home/TraineeHome';

const Home = ({ upcamingMeeting }) => {
    const user = useSelector(state => state.auth.user)
    return (
        <>
            {
                user.role === 'trainer'
                    ?
                    <TrainerHome upcamingMeeting={upcamingMeeting} />
                    :
                    <TraineeHome upcamingMeeting={upcamingMeeting} />
            }
        </>
    )
}

export default Home
