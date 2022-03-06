import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Grid, Paper, Avatar, TextField, Typography, Link,
    Card, CardContent, CardHeader, FormControlLabel, Checkbox, Container,
} from '@material-ui/core'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

function NavigatProfileLInks({ setLink }) {
    const user = useSelector(state => state.auth.user);

    const buttonsTrainer = [
        <Button key="usersTrainees" onClick={() => setLink("usersTrainees")} >Users</Button>,
        <Button key="about" onClick={() => setLink('about')}>About</Button>,
        <Button key="limits" onClick={() => setLink('limits')}>Limits</Button>,
        <Button key="activity" onClick={() => setLink('activity')}>Activities</Button>,
        <Button key="video" onClick={() => setLink('video')}>Videos</Button>,
    ];

    const buttonsTrainee = [
        <Button key="about" onClick={() => setLink('about')}>About</Button>,
        <Button key="limits" onClick={() => setLink('limits')}>Limits</Button>,
        <Button key="activity" onClick={() => setLink('activity')}>Activities</Button>,
        <Button key="video" onClick={() => setLink('video')}>Videos</Button>,
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <ButtonGroup color="secondary" size="small" aria-label="small button group">
                {
                    user.role === 'trainer' ?
                        buttonsTrainer
                        : buttonsTrainee
                }
            </ButtonGroup>
        </Box>
    );
}

export default NavigatProfileLInks;