import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container, Button, Typography, Box, Grid, Avatar,
    Tooltip
} from "@material-ui/core";
import { styled } from '@mui/material/styles';
import "./style.css";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AvatarGroup from '@mui/material/AvatarGroup';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import Footer from './footer/Footer';
import { makeStyles } from "@material-ui/core/styles";
import componentStyles from "../../../assets/material-ui-style/componenets/profile";
import RoundButton from './RoundButton/RoundButton';
import { capitalize } from '../../../helpers';
const useStyles = makeStyles(componentStyles);


function ViewProfileHeader(props) {
    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.profile);

    const classes = useStyles();

    console.log(profile.trainees_profiles);

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
        console.log(imgData.img);
        //if (imgData) dispatch(updateAvatarPic(imgData))
    }

    return (
        <Box sx={{ width: '100%' }} className={classes.haederView}>
            <Container>
                <Grid container spacing={3} alignItems='center' className="home">
                    <Grid item xs={12} sm={6} md={6} >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                                m: 1,
                            },
                        }}
                        >
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={setImgShow} />
                                {/* <IconButton aria-label="fingerprint" color="secondary"> */}
                                <Button component="span">
                                    <Avatar
                                        alt="avatar"
                                        src={user.avatar}
                                        className={classes.largelarge}
                                    />
                                </Button>
                                {/* </IconButton> */}
                            </label>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                                m: 1,
                            },
                        }}
                        >
                            <section className="hello">
                                <p>{user.user},</p>
                                <p>Full Name: {user.name}</p>
                            </section>

                            {
                                user.role === 'trainer' &&
                                <>
                                    <Tooltip title="New User" placement="bottom">
                                        <IconButton onClick={() => console.log('ssss')} aria-label="add" size="large" color="secondary">
                                            <AddIcon fontSize="large" />
                                        </IconButton>
                                    </Tooltip>

                                    <Stack direction="row" spacing={0}>
                                        <Grid container>
                                            {
                                                profile.trainees_profiles && profile.trainees_profiles.map(trainee => {
                                                    return (
                                                        <Grid item>
                                                            <Tooltip title={capitalize(trainee.user.username)} placement="top">
                                                                <IconButton aria-label="fingerprint" color="secondary">
                                                                    <Avatar alt={trainee.user.name} src={trainee.user.avatar} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    </Stack>
                                </>
                            }


                        </Box>
                    </Grid>
                </Grid>
            </Container >
            <Footer />
        </Box >
    );
}

export default ViewProfileHeader;