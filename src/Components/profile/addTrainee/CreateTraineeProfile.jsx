import React from 'react';
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
import LimitationItem from '../../profile/forms/create/LimitationItem';
import { capitalize } from '../../../helpers';

function CreateTraineeProfile({
    relation, setRelation,
    address, setAddress,
    phone, setPhone,
    city, setCity,
    contry, setContry,
    age, setAge,
    gender, setGender,
    hobbies, setHobbies,
    about, setAbout,
    setChaged,
    limitations, setLimitations,
    errors
}) {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const limits_areas = ['arms', 'abdomen', 'legs_knees', 'lower_back', 'upper_back', 'none'];

    return (
        <Box sx={{ mx: 'auto', textAlign: 'center', fontSize: '0.875rem', fontWeight: '700' }}>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>{profile.trinee_added?.username} has been created seccsfuly, Please set profile for futcher sport activitied with {profile.trinee_added?.username} </Typography>
            <Box
                sx={{ mt: 3, m: 1 }}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={onsubmit}
            >
                <Typography variant="subtitle1" sx={{ mt: 2 }}>What is you relation with {capitalize(profile.trinee_added?.username)} ? </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            fullWidth
                            color="secondary"
                            multiline={true}
                            rows={2}
                            id="relation"
                            label="relation"
                            name="relations"
                            defaultValue={relation}
                            onChange={(event) => { setRelation(event.target.value); }}
                            error={errors.relation}
                            helperText={errors["relation"] && <Typography color="error" variant="body2"> {errors["relation"]}</Typography>}
                        />
                    </Grid>
                </Grid>


                <Typography variant="subtitle1" sx={{ mt: 2 }}>What are {capitalize(profile.trinee_added?.username)}'s limitations for sports activities? </Typography>
                <FormControl component="fieldset">
                    <Grid container spacing={2}>
                        {
                            limits_areas.map(area => (
                                <Grid item xs={6} sm={4} key={area}>
                                    <LimitationItem key={area} area={area} limitations={limitations} setLimitations={setLimitations} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </FormControl>

                <Typography variant="subtitle1" sx={{ mt: 2 }}>Tell us more abote {capitalize(profile.trinee_added?.username)}</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            fullWidth
                            color="secondary"
                            name="Address"
                            label="Address"
                            id="Address"
                            defaultValue={address}
                            onChange={(event) => { setAddress(event.target.value); setChaged(true); }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            fullWidth
                            color="secondary"
                            name="Phone"
                            label="Phone"
                            id="Phone"
                            defaultValue={phone}
                            onChange={(event) => { setPhone(event.target.value); setChaged(true); }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <TextField
                            color="secondary"
                            id="City"
                            label="City"
                            name="City"
                            autoComplete="family-name"
                            defaultValue={city}
                            onChange={(event) => { setCity(event.target.value); setChaged(true); }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} >
                        <TextField
                            fullWidth
                            color="secondary"
                            id="lastName"
                            label="Contry"
                            name="Contry"
                            autoComplete="family-name"
                            defaultValue={contry}
                            onChange={(event) => { setContry(event.target.value); setChaged(true); }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            color="secondary"
                            id="Age"
                            label="Age"
                            type="Age"
                            name="Age"
                            defaultValue={age}
                            onChange={(event) => { setAge(event.target.value); setChaged(true); }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                color="secondary"
                                labelId="Gender"
                                id="Gender"
                                value={gender}
                                label="Gender"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value={10}>Male</MenuItem>
                                <MenuItem value={20}>Woman</MenuItem>
                                <MenuItem value={30}>Mixed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            fullWidth
                            multiline={true}
                            rows={4}
                            color="secondary"
                            id="about"
                            label="About Me"
                            name="about"
                            defaultValue={about}
                            onChange={(event) => { setAbout(event.target.value); setChaged(true); }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            fullWidth
                            multiline={true}
                            rows={4}
                            color="secondary"
                            id="Hobbies"
                            label="Hobbies"
                            name="Hobbies"
                            defaultValue={hobbies}
                            onChange={(event) => { setHobbies(event.target.value); setChaged(true); }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default CreateTraineeProfile;