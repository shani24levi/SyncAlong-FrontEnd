import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
// core components
import componentStyles from "../../../../assets/theme/buttons";
import UserCard from '../../UserCard';
import CardContiner from '../../../card/CardContiner';
import { Link } from 'react-router-dom';

import { getTraineesProfiles } from '../../../../Store/actions/profileAction';
import { useEffect } from 'react';
import SearchAnimation from '../../../search/SearchAnimation';

const useStyles = makeStyles(componentStyles);

function TraineesUsers({ profile }) {
    const dispatch = useDispatch();
    const classesBtn = useStyles();
    const user = useSelector(state => state.auth.user);
    const trainees = useSelector(state => state.profile.trainees_profiles);
    // useEffect(()=>{ 
    //     dispatch(getTraineesProfiles([profile?.trainerOf]));
    // },[])
    console.log("profile", trainees);
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}>
                <SearchAnimation />
                <Button onClick={() => { navigate('/profile/adduser') }} className={classesBtn.blueRound}> Add New User</Button>
            </Box>
            <Grid container>
                {
                    <>
                        {
                            trainees?.length == 0
                                ?
                                <CardContiner title="No Trainees listed...">
                                    <Typography>No Trainees listed...</Typography>
                                </CardContiner>
                                :
                                <>
                                    <Grid container spacing={3}>
                                        {
                                            trainees && trainees.map(trainee => {
                                                console.log("trainee", trainee);
                                                return (
                                                    <UserCard key={trainee.user._id} trainee={trainee.user} />
                                                )

                                            })
                                        }
                                    </Grid>

                                </>
                        }
                    </>
                }
            </Grid>
        </>

    );
}

export default TraineesUsers;