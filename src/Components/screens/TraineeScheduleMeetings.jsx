import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import Loader from '../loder/Loder';


function TraineeScheduleMeetings(props) {
    const { id } = useParams();
    const trainees_profiles = useSelector(state => state.profile.trainees_profiles);

    return (
        <div>
            {id}
        </div>
    );
}

export default TraineeScheduleMeetings;