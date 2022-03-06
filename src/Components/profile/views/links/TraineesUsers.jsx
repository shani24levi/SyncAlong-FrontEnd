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
const useStyles = makeStyles(componentStyles);

function TraineesUsers({ profile }) {
    const classesBtn = useStyles();
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    return (
        <Grid container>
            {
                profile?.trainerOf?.length == 0
                    ?
                    <CardContiner title="No Trainees listed...">
                        {/* <Typography>No Trainees listed...</Typography> */}
                        <Button onClick={() => { navigate('/profile/adduser') }} className={classesBtn.blueRound}> Add User</Button>
                    </CardContiner>
                    :
                    <>
                        <Button onClick={() => { navigate('/profile/adduser') }} className={classesBtn.blueRound}> Add User</Button>
                        {
                            profile?.trainerOf.map(trainee => {
                                return (
                                    <UserCard key={trainee} trainee={trainee} />
                                )
                            })
                        }
                    </>
            }
        </Grid>
    );
}

export default TraineesUsers;