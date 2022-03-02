import React from 'react';
import {
    Typography,
    Button,
    makeStyles,
    Avatar, Box,
    Grid,
} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


import { useSelector } from 'react-redux';
// core components style
import componentStyles from "../../../../assets/material-ui-style/componenets/profile";
const useStyles = makeStyles(componentStyles);

function UserProfile(props) {
    const user = useSelector(state => state.auth.user);
    const classes = useStyles();

    const Input = styled('input')({
        display: 'none',
    });

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
                    <Grid item xs={12} sm={4} md={4} alignItems='center'>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button component="span">
                                <Avatar
                                    alt="avatar"
                                    src={user.avatar}
                                    className={classes.large}
                                />
                            </Button>
                        </label>
                        <Typography component="h6" variant="h6">Choose Picture</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} >

                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    color="secondary"
                                    id="firstName"
                                    label="firstName"
                                    name="firstName"
                                    defaultValue={user.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    fullWidth
                                    color="secondary"
                                    id="UserName"
                                    label="UserName"
                                    name="UserName"
                                    defaultValue={user.user}
                                />
                            </Grid>
                        </Grid>
                        {/* </Box> */}
                    </Grid>
                </Grid>
                <Box sx={{ flexGrow: 1, my: 2 }}>
                    <Grid xs={12} sm={12} >
                        <TextField
                            required
                            fullWidth
                            color="secondary"
                            id="email"
                            label="email"
                            name="email"
                            defaultValue={user.email}
                        />
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default UserProfile;