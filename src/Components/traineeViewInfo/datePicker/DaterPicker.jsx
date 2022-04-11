import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { craeteMeetings } from '../../../Store/actions/meetingActions';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Calendar from './Calendar';
import TimeSelector from './TimeSelector';
import Confirmation from './Confirmation';
import { Box, TextField } from '@material-ui/core';
import {
    Typography,
    styled,
    TextareaAutosize,
    Button,
    InputBase,
} from '@mui/material';
import Loader from '../../loder/Loder';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import Email from '@mui/icons-material/Email';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { capitalize } from '../../../helpers';
import CheckboxActivities from '../../activieties-checkbox/CheckboxActivities';
import DuoIcon from '@mui/icons-material/Duo';
import isEmpty from '../../../validation/isEmpty';
import { CircularProgress } from "@material-ui/core";


const TextAreaWrapper = styled('div')({
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid white',
    borderRadius: '4px',
    marginTop: '6px',
    '.Search_Input': {
        padding: '0px 6px',
        width: '100%',
    },
});

const StyledButton = styled(Button)`
    background-size: 200%;
    width: 100%;
    font-weight: 700;
    color: #f5f5f5;
    font-size: 1rem;
    background-image: linear-gradient(90deg, #3512b2, #d18873);
    box-shadow: 0 2px 1px transparent, 0 4px 2px transparent,
      0 8px 4px transparent, 0 16px 8px transparent, 0 32px 16px transparent;
    transition: all 0.8s cubic-bezier(0.32, 1.32, 0.42, 0.68);
  `;

function DaterPicker({ trainee, setOpen, open }) {
    const dispatch = useDispatch();
    const [timeslot, setTimeslot] = useState([]);
    const [date, setDate] = useState(null);
    const [hour, setHour] = useState(-1);
    const [title, setTitle] = useState(null);
    const [activities, setActivities] = useState([]);
    const [errors, setErorrs] = useState({});
    const [craete, setCraete] = useState(false);
    const loading = useSelector(state => state.meetings.loading);
    const all_meetings = useSelector(state => state.meetings.all_meetings);

    useEffect(() => {
        if (open && craete) {
            console.log('//close model ');
            setOpen(false); //close model 
            setCraete(false);
        }
        return;
    }, [all_meetings]);

    const onConfirm = (e) => {
        e.preventDefault();
        let errors = {}
        if (!title) errors["title"] = "*Title for the meeting is required"

        if (!isEmpty(errors)) {
            setErorrs(errors);
            return;
        }

        let data = {
            title,
            trainee: trainee.user._id,
            date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour.getHours()),
        }
        if (activities.length != 0) data.activities = activities;
        console.log('data', data);
        setCraete(true);
        dispatch(craeteMeetings(data));
    }

    return (
        <>
            {hour === -1 && (
                <>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        sx={{ flexWrap: 'inherit' }}
                    //maxHeight="400px"
                    >
                        <Calendar date={date} setDate={setDate} setTimeslot={setTimeslot} />
                        <Divider orientation="vertical" flexItem />
                        <TimeSelector
                            date={date}
                            hour={hour}
                            setHour={setHour}
                            timeslot={timeslot}
                        />
                    </Grid>
                </>
            )}
            {hour !== -1 && (
                <>
                    <Box sx={{ padding: '1rem' }}>
                        {
                            trainee ?
                                <>
                                    <div>
                                        <Typography variant="h6" sx={{ fontWeight: 800, p: '8px 0px' }}>
                                            Confirm your Meeting
                                        </Typography>
                                        <Typography variant="body1" style={{ opacity: 0.8, fontWeight: 700 }}>
                                            Meeting session with{' '} {capitalize(trainee.user.user)}
                                        </Typography>
                                        <div style={{ display: 'flex', fontWeight: 600, padding: '1rem 0rem' }}>
                                            <EventAvailableTwoToneIcon color="action" />
                                            <span style={{ padding: '0px 1rem' }}>{date ? date.toLocaleDateString('en-gb') : ''}</span>
                                            <ScheduleRoundedIcon color="action" />
                                            <span style={{ padding: '0px 1rem' }}>{hour ? `${hour.getHours()}:00 - ${hour.getHours() + 1}:00` : ''}</span>
                                        </div>
                                        <Divider style={{ margin: '1rem 0rem' }} />
                                        <label style={{ fontWeight: 500 }}>Set Title To Meeting</label>
                                        <TextAreaWrapper>
                                            <DuoIcon sx={{ color: 'darkgrey' }} />
                                            <TextField
                                                fullWidth
                                                value={title}
                                                onChange={(event) => { setTitle(event.target.value); }}
                                                color="secondary"
                                                id="MeetingName"
                                                label="Enter Meeting Name "
                                                name="MeetingName"
                                                error={errors.title}
                                                helperText={errors[title] && <Typography component="div" color="error" variant="body2"> *Meeting name is requored</Typography>}
                                            />
                                        </TextAreaWrapper>

                                        <label style={{ fontWeight: 500 }}>Select Activities or Continue</label>
                                        <div style={{ padding: '1rem 0rem' }}>
                                            <CheckboxActivities activities={activities} setActivities={setActivities} traineeId={trainee.user._id} />
                                        </div>

                                        <StyledButton sx={{ cursor: 'pointer' }}
                                            onClick={onConfirm}>
                                            {
                                                loading ?
                                                    <CircularProgress color="secondary" size="20px" />
                                                    :
                                                    'Confirm your Meeting'
                                            }

                                        </StyledButton>
                                        <div style={{ marginTop: '1rem' }}>
                                            <Button
                                                onClick={() => setHour(-1)}
                                                startIcon={<KeyboardBackspaceIcon />}
                                                sx={{
                                                    margin: 'auto',
                                                    width: '100%',
                                                    color: '#ddd',
                                                    fontWeight: 700,
                                                }}>
                                                Change Date or Time
                                            </Button>
                                        </div>
                                    </div>
                                </>
                                :
                                <Loader />
                        }
                        {/* <Confirmation date={date} hour={hour} setHour={setHour} trainee={trainee} /> */}
                    </Box>
                </>
            )}
        </>
    );
}

export default DaterPicker;