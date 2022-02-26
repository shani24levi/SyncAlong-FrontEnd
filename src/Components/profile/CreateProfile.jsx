import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UserCard from './UserCard';
import ProfileForm from './ProfileForm';


const CreateProfile = (props) => {
    return (
        <>
            <Grid container spacing={1}>
                <UserCard />
                <ProfileForm />
            </Grid>
        </>
    );
}

export default CreateProfile;