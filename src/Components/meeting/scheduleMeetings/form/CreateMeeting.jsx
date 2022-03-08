import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Typography,
    Button,
    makeStyles,
    Avatar, Box,
    Grid,
    InputLabel,
    MenuItem, FormControl
} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'

import buttonsStyles from "../../../../assets/theme/buttons";
import { getTraineesProfiles } from '../../../../Store/actions/profileAction';
import { getActivities } from '../../../../Store/actions/meetingActions';
const buttonStyle = makeStyles(buttonsStyles);

function CreateMeeting({ modalData, modalCreate }) {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);
    const trainees = useSelector(state => state.profile.trainees_profiles);
    const activities = useSelector(state => state.meetings.activities?.data?.data);
    useEffect(()=>{
        dispatch(getTraineesProfiles([profile?.trainerOf]));
    },[]);
    
    const btnClasses = buttonStyle();

    const [trainee, setTrainee] = useState(0);
    const [array_activities, setActivities] = useState([]);
    const [value, setValue] = React.useState(modalData?.start);
    
    const fromObectToArray = async(object) => {
        object.abdomen.map(objStr => {
            setActivities([objStr]);
        });
        console.log(array_activities);
        object.arms.map(objStr => {
            setActivities([objStr]);
        });
        console.log(array_activities);
        //object.legs_knees
        //object.lower_back
        //object.upper_back
    }
    useEffect(()=>{
        activities && fromObectToArray(activities);
    },[]);
    useEffect(()=>{
        console.log("id trainee", trainee);
        dispatch(getActivities(trainee));
    },[trainee]);

    useEffect(() => {
        setValue(modalData?.start)
    }, [modalData])

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    
    return (
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
                            value={modalData?.title}
                            color="secondary"
                            id="MeetingName"
                            label="MeetingName"
                            name="MeetingName"
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
                            onChange={e => setTrainee(e.target.value)}
                        >
                            {trainees && trainees.map((trainee) =>{
                                console.log(trainee.id[0],trainee.profile.data.name);
                                return <MenuItem value={trainee.id[0]}>{trainee.profile.data.name}</MenuItem>
                            })
                            }
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                        <InputLabel id="activities-select-label">Trainee</InputLabel>
                        <Select
                            labelId="activites-select-label"
                            id="trainee-simple-select"
                            value={trainee}
                            label="Trainee"
                            onChange={e => setTrainee(e.target.value)}
                        >
                            {trainees && trainees.map((trainee) =>{
                                console.log(trainee.id[0],trainee.profile.data.name);
                                return <MenuItem value={trainee.id[0]}>{trainee.profile.data.name}</MenuItem>
                            })
                            }
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>

                    {/* <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel>Member</InputLabel>
                            <Select
                                color="secondary"
                                labelId="Activity for meeting"
                                id="Activity"
                                value={member}
                                label="Activity for meeting"
                                onChange={(e) => setMember(e.target.value)}
                            >
                                <MenuItem value={10}>activ1</MenuItem>
                                <MenuItem value={20}>activ2</MenuItem>
                                <MenuItem value={30}>activ3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> */}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {
                        !modalCreate &&
                        <Button startIcon={<DeleteOutlineIcon />}
                            className={btnClasses.purpleRoundEmpty}
                            variant="contained"
                        // sx={{ mt: 3, ml: 1 }}
                        //modalData.id
                        >
                            Delete
                        </Button>
                    }

                    <Button startIcon={<CheckIcon />}
                        className={btnClasses.purpleRound}
                        variant="contained"
                    // sx={{ mt: 3, ml: 1 }}
                    >
                        Confirm
                    </Button>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}

export default CreateMeeting;