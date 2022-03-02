import React, { useState, useEffect, useRef } from 'react';
import {
    Typography,
    Button,
    makeStyles,
    Avatar, Box,
    Grid,
} from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';

import buttonsStyles from "../../../assets/theme/buttons";
const buttonStyle = makeStyles(buttonsStyles);

function ScheduleHeader({ month, newMeeting }) {
    const btnClasses = buttonStyle();

    // const AddIconCss = () => {
    //     return (
    //         <Box sx={{ margin: 0 }} >
    //             <AddIcon />
    //         </Box>
    //     )
    // }

    return (
        <Grid container spacing={1} >
            <Grid item xl={2} xs={2} sm={2} md={2} alignItems='center'>
                <Box sx={{ mx: 'auto', textAlign: 'center', fontSize: '0.875rem' }}>
                    <Button startIcon={<AddIcon />}
                        className={btnClasses.purpleRound}
                        variant="contained"
                        onClick={() => newMeeting()}
                    >
                        <Box component="span" sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}>
                            New Meeting
                        </Box>
                    </Button>
                </Box>
            </Grid>

            <Grid item xl={10} xs={10} sm={10} md={10} alignItems='center' justifyContent='center'>
                <Typography align='center' component="h5" variant='h5' className="hidden lg:inline">{month}</Typography>
            </Grid>

        </Grid>
    );
}

export default ScheduleHeader;