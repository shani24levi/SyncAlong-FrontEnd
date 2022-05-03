import React, { useContext, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import TraineesCard from '../../../home/trainer/TraineesCard';
import SearchAnimation from '../../../search/SearchAnimation';
import CardContiner from '../../../card/CardContiner'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';;
import StartCard from '../../../card/StartCard';
import isEmpty from '../../../../validation/isEmpty';


function Activities(props) {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user)
    const meetings = useSelector(state => state.meetings.meetings_complited)
    const [mytMeetings, setMyTrainees] = React.useState(meetings);
    const [search, setSearch] = React.useState('');

    const onSearch = (search) => {
        console.log(search);
        setSearch(search.toLowerCase());
    };

    let mytMeetings_filtered = mytMeetings;
    if (!isEmpty(mytMeetings))
        mytMeetings_filtered = mytMeetings.filter(i => i.trainee.user.toString().toLowerCase().includes(search));

    return (
        <>
            {
                user.role === 'trainer' &&
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
                    </Grid>
                </Box>
            }
            <Grid container justifyContent='center'>
                {
                    <>
                        {
                            mytMeetings_filtered?.length === 0 || isEmpty(mytMeetings_filtered)
                                ?
                                <Box m="auto"
                                    alignItems="center"
                                    justifyContent="center"
                                    textAlign="center"
                                    minHeight="80px"
                                    marginTop="100px"
                                    marginBottom="100px"
                                >
                                    <OndemandVideoIcon style={{ height: '80px', width: '80px', color: '#fff' }} />
                                    <Typography variant='h5'>{"No Activities Found"}</Typography>
                                </Box>
                                :
                                <>
                                    <Grid container justifyContent='center' spacing={3}>
                                        {
                                            mytMeetings_filtered && mytMeetings_filtered.map(i => {
                                                return (
                                                    <Grid item xs={12} md={6} key={i._id}>
                                                        <StartCard title={i.title} subtitle={i.trainee.user} avatar={i.trainee.avatar} m={i} />
                                                    </Grid>
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

export default Activities;