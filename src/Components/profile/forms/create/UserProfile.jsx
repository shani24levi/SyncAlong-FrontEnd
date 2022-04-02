import React, { useState, useEffect } from 'react';
import {
    Typography,
    Button,
    makeStyles,
    Avatar, Box,
    Grid,
} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { updateAvatarPic } from '../../../../Store/actions/authAction';
import { CircularProgress } from "@material-ui/core";
// core components style
import componentStyles from "../../../../assets/material-ui-style/componenets/profile";
const useStyles = makeStyles(componentStyles);

function UserProfile({ fullname, setFullName, setUserName, username, setEmail, email, setAvatar, avatar, setChaged, changed, errors, submitted, setPass, pass }) {
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);
    const dispatch = useDispatch();
    const classes = useStyles();

    const Input = styled('input')({
        display: 'none',
    });

    const setImgShow = (event) => {
        const imgData = {
            "name": "new img",
            "img": event.target.files[0],
        }
        const formData = new FormData();
        for (const key of Object.keys(imgData)) {
            formData.append(key, imgData[key])
        }
        if (imgData) dispatch(updateAvatarPic(formData))
    }

    console.log(fullname);
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
                <Grid container spacing={1} alignItems='center'>
                    <Grid item xs={12} sm={4} md={4} >
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={setImgShow} />
                            <Button component="span">
                                {
                                    loading ?
                                        <CircularProgress color="secondary" size="20px" /> :
                                        <Avatar
                                            alt="avatar"
                                            src={user.avatar}
                                            className={classes.large}
                                        />
                                }
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
                                    defaultValue={fullname}
                                    onChange={(event) => { setFullName(event.target.value); setChaged(true); }}
                                    autoComplete="current-password"
                                    label='firstName'
                                    name="firstName"
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
                                    disabled
                                    onChange={(event) => { setUserName(event.target.value); setChaged(true); }}
                                    defaultValue={username}
                                    error={errors?.username || (submitted && !username)}
                                    helperText={
                                        (submitted && !username)
                                            ? <Typography color="error" variant="body2"> *username is required</Typography>
                                            : errors && errors["username"] && !changed && <Typography color="error" variant="body2"> {errors["username"]}</Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {/* </Box> */}
                    </Grid>
                </Grid>
                <Box sx={{ flexGrow: 1, my: 2 }}>
                    <Grid >
                        <TextField
                            required
                            disabled
                            fullWidth
                            color="secondary"
                            id="email"
                            label="email"
                            name="email"
                            onChange={(event) => { setEmail(event.target.value); setChaged(true); }}
                            defaultValue={email}
                            error={errors?.email || (submitted && !email)}
                            helperText={
                                (submitted && !email)
                                    ? <Typography color="error" variant="body2"> *email is required</Typography>
                                    : errors && errors["email"] && !changed && <Typography color="error" variant="body2"> {errors["email"]}</Typography>
                            }
                        />
                    </Grid>
                    <Grid >
                        <TextField
                            required
                            fullWidth
                            disabled
                            color="secondary"
                            id="pass"
                            label="pass"
                            name="pass"
                            onChange={(event) => { setPass(event.target.value); setChaged(true); }}
                            defaultValue={pass}
                            error={errors?.pass || (submitted && !pass)}
                            helperText={
                                (submitted && !pass)
                                    ? <Typography color="error" variant="body2"> *pass is required</Typography>
                                    : errors && errors["pass"] && !changed && <Typography color="error" variant="body2"> {errors["pass"]}</Typography>
                            }
                        />
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default UserProfile;