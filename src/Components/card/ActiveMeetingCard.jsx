import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Card, Typography, Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import { Button, IconButton } from '@material-ui/core';
import buttonsStyles from "../../assets/theme/buttons";
const buttonStyle = makeStyles(buttonsStyles);


const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: '16px',
    borderRadius: '16px',
    color: 'rgb(4, 41, 122) !important',
    backgroundColor: 'rgb(208, 242, 255) !important'
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
        theme.palette.primary.dark,
        0.24
    )} 100%)`
}));


function ActiveMeetingCard({ meeting }) {
    const navigate = useNavigate();
    const btnClasses = buttonStyle();
    const user = useSelector(state => state.auth.user);

    return (
        <RootStyle>
            <IconWrapperStyle>
                <Avatar
                    src={user.avatar}
                    sx={{
                        bgcolor: "#8c3db9",
                        padding: '0px !important',
                        border: '5px solid #8c3db9',
                    }}>
                </Avatar>
            </IconWrapperStyle>
            {
                meeting ?
                    <>
                        <Typography variant="h6">{`With ${user.role === 'trainer' ? meeting.trainee.user : meeting.trainer.user}`}</Typography>
                        <Button className={btnClasses.blueRound} onClick={() => navigate(`/meeting`)}>Reconect</Button>

                    </>
                    :
                    <Typography variant="h6">No Meeting</Typography>
            }
        </RootStyle>
    );
}

export default ActiveMeetingCard;