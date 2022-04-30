import React, { useState, useEffect } from 'react';
// import { Grid, Container, Button, Box, Card, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getSync } from '../../Store/actions/syncActions'
import TraineeSideCard from '../card/TraineeSideCard';
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import PurpleChartCard from '../charts/PurpleChartCard';
import { dateFormat } from '../../Utils/dateFormat';
import isEmpty from '../../validation/isEmpty';

function SideTrainee({ lastMeeting }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    let syncs = useSelector((state) => state.syncs?.all_syncs);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        console.log('lastMeeting', lastMeeting);
        if (!isEmpty(lastMeeting)) {
            dispatch(getSync(lastMeeting._id));
        }
        else return <>error</>;
    }, [lastMeeting])

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <TraineeSideCard content={false}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container alignContent="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h6">Synced</Typography>
                                </Grid>
                                <Grid item>
                                    <MoreHorizOutlinedIcon
                                        fontSize="small"
                                        sx={{
                                            color: theme.palette.primary[200],
                                            cursor: 'pointer'
                                        }}
                                        aria-controls="menu-popular-card"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    />
                                    <Menu
                                        id="menu-popular-card"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        variant="selectedMenu"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}> Today</MenuItem>
                                        <MenuItem onClick={handleClose}> This Month</MenuItem>
                                        <MenuItem onClick={handleClose}> This Year </MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ pt: '16px !important' }}>
                            {
                                !isEmpty(syncs) &&
                                <PurpleChartCard time={lastMeeting ? dateFormat(lastMeeting?.date) : ''} totalSync={'37'} syncs={syncs} />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                Bajaj Finery
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $1839.00
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: 'rgb(185, 246, 202)',
                                                            color: 'rgb(0, 200, 83)',
                                                            ml: 2
                                                        }}
                                                    >
                                                        <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                        10% Profit
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                TTML
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $100.00
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: 'rgb(251, 233, 231)',
                                                            color: 'rgb(216, 67, 21)',
                                                            marginLeft: 1.875
                                                        }}
                                                    >
                                                        <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: 'rgb(216, 67, 21)' }}>
                                        10% loss
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                Reliance
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $200.00
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: 'rgb(185, 246, 202)',
                                                            color: 'rgb(0, 200, 83)',
                                                            ml: 2
                                                        }}
                                                    >
                                                        <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: 'rgb(0, 200, 83)' }}>
                                        10% Profit
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                TTML
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $189.00
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: 'rgb(251, 233, 231)',
                                                            color: 'rgb(216, 67, 21)',
                                                            ml: 2
                                                        }}
                                                    >
                                                        <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: 'rgb(216, 67, 21)' }}>
                                        10% loss
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                Stolon
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $189.00
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: 'rgb(251, 233, 231)',
                                                            color: 'rgb(216, 67, 21)',
                                                            ml: 2
                                                        }}
                                                    >
                                                        <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: 'rgb(216, 67, 21)' }}>
                                        10% loss
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </TraineeSideCard>
        </>
    );
}

export default SideTrainee;