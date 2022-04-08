import React, { useState } from 'react';
import { Container, Box, Grid, Button } from '@mui/material';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { alpha, styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TextField } from '@mui/material';
import VideoGrid from './styles.meeting.sorce/VideoGrid';
import VideoCard from './VideoCard';
import componentStyles from "../../../assets/theme/buttons";
import Search from '../../search/Search';
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

    console.log(meetings);
    const meetings_filtered = meetings.filter(i => i?.title?.toString().toLowerCase().includes(search) || i.trainee.user.toString().toLowerCase().includes(search));
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
                        <Search />
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

            <VideoGrid>
                {meetings
                    ? meetings_filtered.map((m) => <VideoCard key={m._id} video={m} />)
                    : null}
            </VideoGrid>
        </Container>
    );
}

export default MeetingsScours;