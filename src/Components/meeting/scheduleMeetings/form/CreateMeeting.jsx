import React, { useState, useEffect } from 'react';
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
const buttonStyle = makeStyles(buttonsStyles);

function CreateMeeting({ modalData, modalCreate }) {
    const btnClasses = buttonStyle();

    const [member, setMember] = useState('');
    const [value, setValue] = React.useState(modalData?.start);

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
                    <Grid item xs={8} sm={8}>
                        <TextField
                            fullWidth
                            value={modalData?.title ? modalData?.title : ''}
                            color="secondary"
                            id="MeetingName"
                            label="MeetingName"
                            name="MeetingName"
                        />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Member</InputLabel>
                            <Select
                                color="secondary"
                                labelId="Member"
                                id="Member"
                                value={member}
                                label="Member"
                                onChange={(e) => setMember(e.target.value)}
                            >
                                <MenuItem value={10}>gram1</MenuItem>
                                <MenuItem value={20}>gram2</MenuItem>
                                <MenuItem value={30}>gram3</MenuItem>
                            </Select>
                        </FormControl>
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
                    </Grid>
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