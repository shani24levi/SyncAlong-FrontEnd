import React, { useState } from 'react';
import { Container, Box, Grid, Button, Typography } from '@mui/material';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { alpha, styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TextField } from '@mui/material';
import VideoGrid from './styles.meeting.sorce/VideoGrid';
import VideoCard from './VideoCard';
import componentStyles from "../../../assets/theme/buttons";
import Search from '../../search/SearchBar';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import isEmpty from '../../../validation/isEmpty';
const useStyles = makeStyles(componentStyles);


function MeetingsScours({ meetings }) {
    const classesBtn = useStyles();
    const theme = useTheme();
    const [search, setSearch] = React.useState('');
    const [value, setValue] = useState(null);

    const onSearch = (search) => {
        console.log(search);
        setSearch(search.toLowerCase());
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    let meetings_filtered = meetings;
    if (!isEmpty(meetings_filtered))
        meetings_filtered = meetings.filter(i => i?.title?.toString().toLowerCase().includes(search) || i.trainee.user.toString().toLowerCase().includes(search));
    console.log('meetings', meetings_filtered);

    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}>
                <Grid container alignItems='center' justifyContent='center' spacing={3} >
                    <Grid item xs={12} md={6}>
                        <Search onSearch={onSearch} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={6}>
                                    <DesktopDatePicker
                                        color="secondary"
                                        label="Date desktop"
                                        inputFormat="dd/MM/yyyy"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) =>
                                            <TextField color="secondary" focused {...params} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <DesktopDatePicker
                                        color={theme.palette.grey[600]}
                                        label="Date desktop"
                                        inputFormat="dd/MM/yyyy"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField color="secondary" focused {...params} />}
                                    />
                                </Grid>
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Box>
            {!isEmpty(meetings_filtered) && meetings_filtered?.length !== 0
                ?
                <Grid container spacing={3}>
                    {meetings_filtered.map((m) => {
                        return (
                            <Grid item xs={6} md={4} lg={4} key={m._id}>
                                <VideoCard key={m._id} video={m} />
                            </Grid>
                        )
                    })}
                </Grid>
                :
                <Box m="auto"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    minHeight="100px"
                    marginTop="160px"
                    marginBottom="160px"
                >
                    <OndemandVideoIcon style={{ height: '80px', width: '80px' }} />
                    <Typography variant='h5'>{"No Meeting Found"}</Typography>
                </Box>

            }
        </Container>
    );
}

export default MeetingsScours;