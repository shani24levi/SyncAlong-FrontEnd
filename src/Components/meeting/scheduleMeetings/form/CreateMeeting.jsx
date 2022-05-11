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
import { styled } from '@mui/material/styles';
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
import CheckboxActivities from '../../../activieties-checkbox/CheckboxActivities';
import inFutuer from '../../../../validation/inFutuer';
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


    console.log('modalData', modalData);
    useEffect(() => {
        if (profile?.trainees_profiles && profile?.trainees_profiles?.length == 0) {
            console.log('NO trainees here');
        }
    }, []);

    useEffect(() => {
        //when clicked to edite modal 
        if (modalData._id) {
            setActivities(modalData.activities);
            setTrainee(modalData.trainee._id)
            setTraineeId(modalData.trainee._id)
        }
    }, [modalData]);

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

        if (!isEmpty(errors)) {
            setErorrs(errors);
            return;
        }

        if (!inFutuer(value, new Date())) {
            errors["inFutuer"] = "*Can not set meeting in past tense";
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
            if (activities.length != 0) data.activities = activities;
            console.log('data', data);
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
        dispatch(deleteMeeting(modalData));
    }

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const checkValidDate = (todaysDate, date) => {
        if (todaysDate.getMonth() < date.getMonth()) return true;
        if (todaysDate.getDate() > date.getDate()) return false;
        return true;
    };

    const todaysDate = new Date();
    const minDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1);
    const maxDate = new Date(
        todaysDate.getFullYear(),
        todaysDate.getMonth() + 2,
        0,
    );

    // function disableDays() {
    //     const todaysDate = new Date();
    //     return value.getDay() > todaysDate.getDay();
    // }

    console.log('value', value, inFutuer(value, new Date()));
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
                                date={todaysDate}
                                minDate={minDate}
                                maxDate={maxDate}
                                //shouldDisableDate={disableDays}
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
                            {/* <FormControl fullWidth> */}
                            <InputLabel id="trainee-select-label">Trainee</InputLabel>
                            <Select
                                fullWidth
                                // defaultValue={profile.trainees_profiles[0].user._id}
                                color="secondary"
                                labelId="trainee-select-label"
                                id="trainee-simple-select"
                                value={trainee}
                                label="Trainee"
                                name="Trainee"
                                onChange={e => {
                                    console.log(e.target.value)
                                    setTrainee(e.target.value)
                                }}
                                error={errors.traineeId}
                            >
                                {
                                    profile.trainees_profiles && profile.trainees_profiles?.map((trainee, i) => {
                                        return <MenuItem value={trainee.user._id} key={i} onClick={() => setTraineeId(trainee.user._id)}>
                                            <Avatar
                                                alt="avatar"
                                                src={trainee.user.avatar}
                                                sx={{ width: 56, height: 56 }}
                                            />
                                            <Typography>{trainee.user.username}</Typography>
                                        </MenuItem>
                                    })
                                }
                            </Select>
                            {errors["traineeId"] && <Typography component="div" color="error" variant="body2"> {errors["traineeId"]}</Typography>}
                            {/* </FormControl> */}
                        </Grid>
                        {
                            traineeId ?
                                <Grid item xs={12} sm={12}>
                                    <CheckboxActivities activities={activities} setActivities={setActivities} traineeId={traineeId} />
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
                        {errors["inFutuer"] && <Typography component="div" color="error" variant="body2" style={{ alignSelf: 'center', fontSize: 'x-large' }}> {errors["inFutuer"]}</Typography>}
                    </Box>
                </Box>
            </LocalizationProvider>
        </>
    );
}

export default CreateMeeting;