import React, { useState } from 'react';
import {
    Typography,
    Button,
    makeStyles,
    Avatar, Box,
    Grid,
    InputLabel,
    MenuItem
} from "@material-ui/core";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import LimitationItem from './LimitationItem';


function Limitations({ limitations, setLimitations }) {
    const limits_areas = ['arms', 'abdomen', 'legs_knees', 'lower_back', 'upper_back', 'none'];

    return (
        <Box sx={{ mx: 'auto', textAlign: 'center', fontSize: '0.875rem', fontWeight: '700' }}>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>What your body parts limitations? (checkboxes)</Typography>
            <Box
                sx={{ mt: 3, m: 1 }}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={onsubmit}
            >
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
            </Box>
        </Box>
    );
}

export default Limitations;