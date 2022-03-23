import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { craeteMeetings, deleteMeeting } from '../../../../Store/actions/meetingActions';
import {
    Typography,
    Button,
    makeStyles,
    Avatar, Box,
    Grid,
    InputLabel,
    MenuItem, FormControl,
} from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'

import buttonsStyles from "../../../../assets/theme/buttons";
import isEmpty from '../../../../validation/isEmpty';
const buttonStyle = makeStyles(buttonsStyles);

function CreateMeeting({ modalData, modalCreate, handelClose }) {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const err = useSelector(state => state.errors);
    const loading = useSelector(state => state.meetings.loading);
    const all_meetings = useSelector(state => state.meetings.all_meetings);
    const trainees = useSelector(state => state.profile.trainees_profiles);

    const btnClasses = buttonStyle();

    const [trainee, setTrainee] = useState(0);
    const [title, setTitle] = useState(modalData?.title ? modalData?.title : '');
    const [value, setValue] = useState(modalData?.start ? modalData?.start : new Date());
    const [time, setTime] = useState(modalData?.start ? modalData?.start : new Date());
    const [activities, setActivities] = useState([]);
    const [errors, setErorrs] = useState({});
    const [close, setClose] = useState(false);
    const [traineeId, setTraineeId] = useState(null);
    const [loadingType, setLoadingType] = useState('create');


    useEffect(() => {
        if (profile?.trainees_profiles && profile?.trainees_profiles?.length == 0) {
            console.log('NO trainees here');
        }
    }, []);

    useEffect(() => {
        let errors = {};
        if (err === 'title not found') {
            errors["title"] = "*title not found";
        }
        if (!isEmpty(errors)) {
            setClose(false)
            setErorrs(errors);
        }
        else if (close && isEmpty(err)) {
            console.log('//close model ');
            //setClose(true)
            handelClose(); //close model 
        }
        return;
    }, [err, all_meetings]);

    const onConfirm = (e) => {
        e.preventDefault();
        setLoadingType('create');
        setClose(true)
        let errors = {}
        if (!title) errors["title"] = "*Title for the meeting is required"
        if (!value) errors["value"] = "*Time & Date is required"
        if (!traineeId) errors["traineeId"] = "*Please selecte user for the activitiy";

        console.log('dddddd', title, value, traineeId);
        if (!isEmpty(errors)) {
            setErorrs(errors);
            return;
        }

        //add new ....
        if (modalCreate) {
            let data = {
                title,
                trainee: traineeId,
                date: value,
            }
            console.log('data', data);
            if (activities.length != 0) data.activities = activities;
            dispatch(craeteMeetings(data));
        }
        //edit
        else {

        }
    }

    const onDelet = (e) => {
        e.preventDefault();
        setLoadingType('delete');
        setClose(true)
        dispatch(deleteMeeting(modalData._id));
    }

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box
                    sx={{ mt: 3, m: 1 }}
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={onsubmit}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                value={title}
                                onChange={(event) => { setTitle(event.target.value); }}
                                color="secondary"
                                id="MeetingName"
                                label="MeetingName"
                                name="MeetingName"
                                error={errors.title}
                                helperText={errors["title"] && <Typography component="div" color="error" variant="body2"> {errors["title"]}</Typography>}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <DesktopDatePicker
                                color="secondary"
                                label="Date desktop"
                                inputFormat="dd/MM/yyyy"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} >
                            <TimePicker
                                color="secondary"
                                label="Time"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel id="trainee-select-label">Trainee</InputLabel>
                                <Select
                                    labelId="trainee-select-label"
                                    id="trainee-simple-select"
                                    value={trainee}
                                    label="Trainee"
                                    onChange={e => {
                                        console.log(e.target.value)
                                        setTrainee(e.target.value)
                                    }}
                                    error={errors.traineeId}
                                >
                                    {
                                        profile.trainees_profiles && profile.trainees_profiles?.map((trainee, i) => {
                                            return <MenuItem value={i} key={i} onClick={() => setTraineeId(trainee.user._id)}>
                                                <Avatar
                                                    alt="avatar"
                                                    src={trainee.user.avatar}
                                                    sx={{ width: 56, height: 56 }}
                                                />
                                                {trainee.user.username}</MenuItem>
                                        })
                                    }
                                </Select>
                                {errors["traineeId"] && <Typography component="div" color="error" variant="body2"> {errors["traineeId"]}</Typography>}
                            </FormControl>
                        </Grid>
                        {
                            traineeId ?
                                <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="activities-select-label">Activities</InputLabel>
                                        <Select
                                            labelId="activites-select-label"
                                            id="trainee-simple-select"
                                            value={trainee}
                                            label="Trainee"
                                            onChange={e => setTrainee(e.target.value)}
                                        >
                                            <MenuItem value={1}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                :
                                <></>
                        }

                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {
                            !modalCreate &&
                            <Button startIcon={<DeleteOutlineIcon />}
                                className={btnClasses.purpleRoundEmpty}
                                variant="contained"
                                onClick={onDelet}
                            // sx={{ mt: 3, ml: 1 }}
                            //modalData.id
                            >
                                {
                                    loading && loadingType === 'delete' ?
                                        <CircularProgress color="secondary" size="20px" />
                                        :
                                        'Delete'
                                }
                            </Button>
                        }

                        <Button startIcon={<CheckIcon />}
                            className={btnClasses.purpleRound}
                            variant="contained"
                            onClick={onConfirm}
                            disabled={loading}
                        // sx={{ mt: 3, ml: 1 }}
                        >
                            {
                                loading && loadingType === 'create' ?
                                    <CircularProgress color="secondary" size="20px" />
                                    :
                                    'Confirm'
                            }

                        </Button>
                    </Box>
                </Box>
            </LocalizationProvider>
        </>
    );
}

export default CreateMeeting;