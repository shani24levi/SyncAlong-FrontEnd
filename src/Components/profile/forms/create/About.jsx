import React, { useState } from 'react';
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

function About({
    address, setAddress,
    phone, setPhone,
    city, setCity,
    contry, setContry,
    age, setAge,
    gender, setGender,
    hobbies, setHobbies,
    about, setAbout,
    setChaged
}) {
    return (
        <Box sx={{ mx: 'auto', textAlign: 'center', fontSize: '0.875rem', fontWeight: '700' }}>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>Please tell us more about yourself</Typography>
            <Box
                sx={{ mt: 3, m: 1 }}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={onsubmit}
            >
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

export default About;