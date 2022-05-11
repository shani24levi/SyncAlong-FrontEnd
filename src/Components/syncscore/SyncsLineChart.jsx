import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { capitalize } from '../../helpers';
import id from 'date-fns/esm/locale/id/index.js';
import Loader from '../loder/Loder';

function SyncsLineChart({ syncs, syncAvgs }) {
    console.log('syncssyncs', syncs, !isEmpty(syncs), syncs[0]);

    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [activityDisplay, setActivityDisplay] = useState({});
    const [avgDisplay, setAvgDisplay] = useState({});


    useEffect(() => {
        if (!isEmpty(syncs) && !isEmpty(syncs[0]))
            setActivityDisplay(syncs[0]);
        if (!isEmpty(syncAvgs) && !isEmpty(syncAvgs[0]))
            setAvgDisplay(syncAvgs[0]);
    }, [syncs, syncAvgs])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSetActivity = (el, i) => {
        console.log(i);
        if (!isEmpty(i)) {
            setActivityDisplay(el);
            setAvgDisplay(syncAvgs[i]);
        }
        handleClose();
    }
    console.log("activityDisplay", activityDisplay);
    return (
        <>
            <TraineeSideCard content={false}>
                {
                    !isEmpty(activityDisplay) ?
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid container alignContent="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="h6">{!isEmpty(activityDisplay) ? capitalize(activityDisplay.activity) : ''} Synces</Typography>
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
                                                {syncs.map((el, i) => {
                                                    return (<MenuItem value={i} key={el.activity} onClick={() => onSetActivity(el, i)}>{el.activity}</MenuItem>
                                                    )
                                                })}
                                            </Menu>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                    {
                                        !isEmpty(syncs) &&
                                        <PurpleChartCard time={activityDisplay.activity} totalSync={Math.trunc(avgDisplay.avg * 100)} syncs={activityDisplay.result} />
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        Highst Sync
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="subtitle1" color="inherit">
                                                                {Math.trunc(Math.max(...activityDisplay.result) * 100)}
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
                                                at {activityDisplay.time[activityDisplay.result.indexOf(Math.max(...activityDisplay.result))]} time
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        Lowest sync
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="subtitle1" color="inherit">
                                                                {Math.trunc(Math.min(...activityDisplay.result) * 100)}
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
                                                at {activityDisplay.time[activityDisplay.result.indexOf(Math.min(...activityDisplay.result))]} time
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                </Grid>
                            </Grid>
                        </CardContent>
                        :
                        <Loader />

                }
            </TraineeSideCard>
        </>
    );
}

export default SyncsLineChart;