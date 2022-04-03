import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import Loader from '../loder/Loder';
import TraineeView from '../traineeViewInfo/TraineeView';



function TraineePage(props) {
    const [trainee, setTrainee] = useState(null);
    const [errorPage, setErrorPage] = useState(false);

    const location = useLocation();
    const { id } = useParams();
    const trainees_profiles = useSelector(state => state.profile.trainees_profiles);

    useEffect(() => {
        if (id && !isEmpty(trainees_profiles)) {
            let user = trainees_profiles.find(el => el.user._id === id);
            if (user) setTrainee(user)
            else setErrorPage(true);
        }
        else setErrorPage(true);
    }, [])

    console.log('trainee', trainee);

    return (
        <>
            {errorPage && '<ErrorPage /> '}
            {
                !trainee && !errorPage ?
                    <Loader />
                    :
                    <TraineeView trainee={trainee} />
            }
        </>
    );
}

export default TraineePage;