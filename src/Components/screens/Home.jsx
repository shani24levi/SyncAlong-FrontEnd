// for login users
import React from 'react';
import { useSelector } from 'react-redux';
import TrainerHome from '../home/TrainerHome';
import TraineeHome from '../home/TraineeHome';

const Home = () => {
    const user = useSelector(state => state.auth.user)
    return (
        <>
            {
                user.role === 'trainer'
                    ?
                    <TrainerHome />
                    :
                    <TraineeHome />
            }
        </>
    )
}

export default Home
