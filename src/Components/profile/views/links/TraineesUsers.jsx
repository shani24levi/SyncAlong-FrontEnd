import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
// core components
import componentStyles from "../../../../assets/theme/buttons";
// import UserCard from '../../UserCard';
import UserCardProfile from '../../../card/UserCardProfile';
import CardContiner from '../../../card/CardContiner';
import ElderlyWomanIcon from '@mui/icons-material/ElderlyWoman';
import { Link } from 'react-router-dom';

import { getTraineesProfiles } from '../../../../Store/actions/profileAction';
import { useEffect } from 'react';
import SearchAnimation from '../../../search/SearchAnimation';
import isEmpty from '../../../../validation/isEmpty';

const useStyles = makeStyles(componentStyles);

function TraineesUsers({ profile }) {
    const dispatch = useDispatch();
    const classesBtn = useStyles();
    const user = useSelector(state => state.auth.user);
    const trainees = useSelector(state => state.profile.trainees_profiles);
    const [mytrainees, setMyTrainees] = React.useState(trainees);
    const [search, setSearch] = React.useState('');

    console.log("profile", trainees);
    const navigate = useNavigate();

    const onSearch = (search) => {
        console.log(search);
        setSearch(search.toLowerCase());
    };

    let mytrainees_filtered = mytrainees;
    if (!isEmpty(mytrainees))
        mytrainees_filtered = mytrainees.filter(i => i.trainee.user.toString().toLowerCase().includes(search));

    //const mytrainees_filtered = mytrainees.filter(i => i.user.user.toString().toLowerCase().includes(search));

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
                <Grid container justifyContent='space-between'>
                    <SearchAnimation onSearch={onSearch} />
                    <Button onClick={() => { navigate('/profile/adduser') }} className={classesBtn.blueRound}> Add New User</Button>
                </Grid>
            </Box>
            <Grid container justifyContent='center'>
                {
                    <>
                        {
                            trainees?.length == 0 || isEmpty(trainees)
                                ?
                                <Box m="auto"
                                    alignItems="center"
                                    justifyContent="center"
                                    textAlign="center"
                                    minHeight="80px"
                                    marginTop="100px"
                                    marginBottom="100px"
                                >
                                    <ElderlyWomanIcon style={{ height: '80px', width: '80px', color: '#fff' }} />
                                    <Typography variant='h5'>{"No Users Found"}</Typography>
                                </Box>
                                :
                                <>
                                    <Grid container justifyContent='center' >
                                        {
                                            mytrainees_filtered && mytrainees_filtered.map(trainee => {
                                                return (
                                                    <UserCardProfile key={trainee.user._id} trainee={trainee.user} />
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