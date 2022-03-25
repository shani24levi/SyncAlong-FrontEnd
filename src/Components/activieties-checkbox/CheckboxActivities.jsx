import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Typography,
    Button,
    makeStyles,
    Avatar, Box,
    Grid,
    InputLabel,
    MenuItem, FormControl,
    FilledInput,
} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { capitalize } from '../../helpers';
import isEmpty from '../../validation/isEmpty';
import activitiesFilter from '../../Utils/activitiesFilter';
import Activities from './Activities';
import { CircularProgress } from "@material-ui/core";


function CheckboxActivities({ activities, setActivities, traineeId }) {
    const dispatch = useDispatch();
    const [trainee, setTrainee] = useState(null);
    const [limitations, setOutLimitations] = useState([]);
    const [ourActivities, setOurActivities] = useState({});

    const [Arms, setArms] = useState([]);
    const [Abdomen, setAbdomen] = useState([]);
    const [Legs_knees, setLegs_knees] = useState([]);
    const [Lower_back, setLower_back] = useState([]);
    const [Upper_back, setUpper_back] = useState([]);
    const [AllBody, setAllBody] = useState([]);
    const [allSet, setAllSet] = useState(false);


    const profile = useSelector(state => state.profile.profile);
    const trainees_profiles = useSelector(state => state.profile.trainees_profiles);
    const limits_areas = ['arms', 'abdomen', 'legs_knees', 'lower_back', 'upper_back', 'none'];

    useEffect(() => {
        if (traineeId && trainees_profiles.length !== 0) {
            let trainee = trainees_profiles.filter(trainee => trainee._id === traineeId);
            if (trainee) setTrainee(trainee)
        }
    }, [traineeId])

    useEffect(() => {
        let unique = profile.limitations;
        if (!isEmpty(trainee)) {
            let limits = trainee.profile.limitations.concat(trainee.profile.limitations);
            unique = [...new Set(limits)];
        }
        setOutLimitations(unique);
    }, [trainee])


    useEffect(() => {
        if (limitations.length !== 0) {
            let activities_obj = activitiesFilter(limitations);
            setOurActivities(activities_obj);
        }
    }, [limitations])

    useEffect(() => {
        if (!isEmpty(ourActivities)) {
            setArms(ourActivities.arms);
            setAbdomen(ourActivities.abdomen)
            setLegs_knees(ourActivities.legs_knees)
            setLower_back(ourActivities.lower_back)
            setUpper_back(ourActivities.upper_back)
            setAllBody(ourActivities.allbody);
            setAllSet(true);
        }
    }, [ourActivities])


    return (
        <Box sx={{ mx: 'auto', textAlign: 'center', fontSize: '0.875rem', fontWeight: '700' }}>
            <Typography variant="subtitle1" sx={{ mt: 2 }}> The list of activities is according to the limitations</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>Select the meeting action list or continue...</Typography>
            <Box
                sx={{ mt: 3, m: 1 }}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={onsubmit}
            >
                {
                    !allSet ?
                        <CircularProgress color="secondary" size="20px" />
                        :
                        <>
                            <FormControl component="fieldset">
                                <Activities activities={activities} setActivities={setActivities} arms={Arms} abdomen={Abdomen} legs_knees={Legs_knees} lower_back={Lower_back} upper_back={Upper_back} allBody={AllBody} />
                            </FormControl>
                        </>
                }
            </Box>
        </Box>
    );
}

export default CheckboxActivities;